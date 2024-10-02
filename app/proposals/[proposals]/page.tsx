"use client";

import { usePublicClient, useAccount, useContractWrite } from "wagmi";
import { useState, useContext, useEffect } from "react";
import { Address } from "viem";
import { Proposal } from "../../../utils/types";
import { useProposal } from "@/hooks/useProposal";
import { useProposalVotes } from "@/hooks/useProposalVotes";
import { AlertCard, Button } from "@aragon/ods";
import ProposalDescription from "@/app/containers/proposalDescription";
import VotesSection from "@/app/containers/votesSection";
import ProposalHeader from "@/app/containers/proposalHeader";
// import Blockies from "react-blockies";
import { formatUnits } from "viem";
import { formatAddress } from "@/utils/addressHelper";
import { useUserCanVote } from "@/hooks/useUserCanVote";
import * as dayjs from "dayjs";
import { TokenVotingAbi } from "@/artifacts/TokenVoting.sol";
import VoteTally from "@/app/containers/voteTally";
import VotingModal from "@/app/containers/votingModal";
import ProposalDetails from "@/app/containers/proposalDetails";
import {
  useAlertContext,
  AlertContextProps,
} from "@/app/context/AlertContext";
import { Else, If, Then, When } from "react-if";

const pluginAddress = (process.env.NEXT_PUBLIC_PLUGIN_ADDRESS || "") as Address;

export default function Proposal({
  params,
}: {
  params: { proposals: string };
}) {
  const publicClient = usePublicClient();
  const proposal = useProposal(
    publicClient,
    pluginAddress,
    params.proposals
  ) as Proposal;
  const votes = useProposalVotes(
    publicClient,
    pluginAddress,
    params.proposals,
    proposal
  );
  const userCanVote = useUserCanVote(BigInt(params.proposals));
  const [votingPercentages, setVotingPercentages] = useState({
    yes: 0,
    no: 0,
    abstain: 0,
  });
  const [showDescriptionView, toggleDetailsView] = useState<boolean>(true);
  const [showVotingModal, setShowVotingModal] = useState(false);
  const [userVotedOption, setUserVotedOption] = useState<number>();
  const { addAlert } = useAlertContext() as AlertContextProps;
  const { address, isConnected, isDisconnected } = useAccount();
  const { write: voteWrite } = useContractWrite({
    abi: TokenVotingAbi,
    address: pluginAddress,
    functionName: "vote",
    args: [params.proposals, userVotedOption, 1],
    onSuccess(data) {
      // console.log("Success creating the proposal", data);
      addAlert("We got your vote!", data.hash);
    },
  });

  useEffect(() => {
    if (!proposal.tally) return;

    let yesVotes = Number(formatUnits(proposal.tally.yes || BigInt(0), 18));
    let noVotes = Number(formatUnits(proposal.tally.no || BigInt(0), 18));
    let abstainVotes = Number(
      formatUnits(proposal.tally.abstain || BigInt(0), 18)
    );
    let totalVotes = yesVotes + noVotes + abstainVotes;

    setVotingPercentages({
      yes: (yesVotes / totalVotes) * 100,
      no: (noVotes / totalVotes) * 100,
      abstain: (abstainVotes / totalVotes) * 100,
    });
  }, [proposal.tally]);

  const userVote = () =>
    votes.find((vote) => vote.voter === address)?.voteOption;

  const voteFor = (option: number) => {
    setUserVotedOption(option);
    setShowVotingModal(false);
  };

  useEffect(() => {
    if (userVotedOption && !showVotingModal) voteWrite?.();
  }, [userVotedOption, showVotingModal]);

  if (proposal.title && proposal?.parameters?.supportThreshold)
    return (
      <section className="flex flex-col items-center  w-screen max-w-full min-w-full">
        <div className="flex justify-between px-4 py-5 w-full">
          <ProposalHeader
            proposalNumber={Number(params.proposals)}
            proposal={proposal}
            userVote={userVote()}
            userCanVote={userCanVote as boolean}
            setShowVotingModal={setShowVotingModal}
          />
        </div>

        <div className="grid grid-cols-3 my-10 gap-10 w-full">
          <VoteTally
            voteType="Yes"
            voteCount={proposal?.tally?.yes}
            votePercentage={votingPercentages.yes}
            votes={votes}
            color="success"
            option={2}
          />
          <VoteTally
            voteType="No"
            voteCount={proposal?.tally?.no}
            votePercentage={votingPercentages.no}
            votes={votes}
            color="critical"
            option={3}
          />
          <VoteTally
            voteType="Abstain"
            voteCount={proposal?.tally?.abstain}
            votePercentage={votingPercentages.abstain}
            votes={votes}
            color="neutral"
            option={1}
          />

          <ProposalDetails
            supportThreshold={proposal.parameters.supportThreshold}
            endDate={proposal.parameters.endDate}
            snapshotBlock={proposal.parameters.snapshotBlock}
          />
        </div>
        <div className="py-12 w-full">
          <div className="flex flex-row space-between">
            <h2 className="flex-grow text-3xl text-neutral-900 font-semibold">
              {showDescriptionView ? "Description" : "Votes"}
            </h2>
            <div className="flex flex-row gap-4">
              <Button
                onClick={() => toggleDetailsView(true)}
                size="lg"
                variant={showDescriptionView ? "primary" : "secondary"}
              >
                Description
              </Button>
              <Button
                onClick={() => toggleDetailsView(false)}
                size="lg"
                variant={showDescriptionView ? "secondary" : "primary"}
              >
                Votes
              </Button>
            </div>
          </div>

          <If condition={showDescriptionView}>
            <Then>
              <ProposalDescription {...proposal} />
            </Then>
            <Else>
              <VotesSection votes={votes} />
            </Else>
          </If>
        </div>

        <When condition={showVotingModal}>
          <VotingModal
            show={showVotingModal}
            setShow={setShowVotingModal}
            voteFor={voteFor}
          />
        </When>
      </section>
    );
}
