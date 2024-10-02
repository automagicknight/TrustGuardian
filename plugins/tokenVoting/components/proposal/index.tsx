import Link from "next/link";
import { usePublicClient } from "wagmi";
import { Proposal } from "@/plugins/tokenVoting/utils/types";
import { useProposal } from "@/plugins/tokenVoting/hooks/useProposal";
import { ITagProps } from "@aragon/ods";
import { Card, Tag } from "@aragon/ods";
import * as DOMPurify from 'dompurify';
import { PleaseWaitSpinner } from "@/components/please-wait";
import { If } from "@/components/if";
import { PUB_TOKEN_VOTING_PLUGIN_ADDRESS } from "@/constants";

const DEFAULT_PROPOSAL_METADATA_TITLE = "(No proposal title)";
const DEFAULT_PROPOSAL_METADATA_SUMMARY =
  "(The metadata of the proposal is not available)";

type TagVariant = ITagProps["variant"];
type ProposalInputs = {
  proposalId: bigint;
};

const getProposalVariantStatus = (proposal: Proposal) => {
  return {
    variant: (proposal?.active
      ? "primary"
      : proposal?.executed
        ? "success"
        : proposal?.tally?.no >= proposal?.tally?.yes
          ? "critical"
          : "success") as TagVariant,
    label: proposal?.active
      ? "Active"
      : proposal?.executed
        ? "Executed"
        : proposal?.tally?.no >= proposal?.tally?.yes
          ? "Defeated"
          : "Executable",
  };
};

export default function ProposalCard(props: ProposalInputs) {
  const publicClient = usePublicClient();
  const { proposal, status } = useProposal(
    publicClient,
    PUB_TOKEN_VOTING_PLUGIN_ADDRESS,
    props.proposalId.toString()
  );

  const showLoading = getShowProposalLoading(proposal, status);

  if (!proposal || showLoading) {
    return (
      <section className="w-full mb-4">
        <Card className="p-4">
          <span className="px-4 py-5 xs:px-10 md:px-6 lg:px-7">
            <PleaseWaitSpinner fullMessage="Loading proposal..." />
          </span>
        </Card>
      </section>
    );
  } else if (status.metadataReady && !proposal?.title) {
    return (
      <Link
        href={`#/proposals/${props.proposalId}`}
        className="w-full mb-4"
      >
        <Card className="p-4">
          <div className="md:w-7/12 lg:w-3/4 xl:4/5 pr-4 text-nowrap text-ellipsis overflow-hidden">
            <h4 className="mb-1 text-lg text-neutral-300 line-clamp-1">
              {Number(props.proposalId) + 1} -{" "}
              {DEFAULT_PROPOSAL_METADATA_TITLE}
            </h4>
            <p className="text-base text-neutral-300 line-clamp-3">
              {DEFAULT_PROPOSAL_METADATA_SUMMARY}
            </p>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`#/proposals/${props.proposalId}`}>
      <Card className="w-full mb-4 p-5">
        <div className="">
          <If condition={proposal.tally}>
            <div className="flex mb-2">
              <Tag
                variant={getProposalVariantStatus(proposal as Proposal).variant}
                label={getProposalVariantStatus(proposal as Proposal).label}
              />
            </div>
          </If>

          <div className="text-ellipsis overflow-hidden">
            <h4 className=" mb-1 text-lg font-semibold text-dark line-clamp-1">
              {Number(props.proposalId) + 1} - {proposal.title}
            </h4>
            <div className="text-ellipsis overflow-hidden box line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: proposal.summary
                  ? DOMPurify.sanitize(proposal.summary)
                  : DEFAULT_PROPOSAL_METADATA_SUMMARY
              }} />
          </div>
        </div>
      </Card>
    </Link>
  );
}

function getShowProposalLoading(
  proposal: ReturnType<typeof useProposal>["proposal"],
  status: ReturnType<typeof useProposal>["status"]
) {
  if (!proposal || status.proposalLoading) return true;
  else if (status.metadataLoading && !status.metadataError) return true;
  else if (!proposal?.title && !status.metadataError) return true;

  return false;
}
