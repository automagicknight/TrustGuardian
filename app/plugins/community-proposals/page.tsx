'use client';

import { useAccount, useBlockNumber, useReadContract } from "wagmi";
import { ReactNode, useEffect, useState } from "react";
import ProposalCard from "@/app/plugins/community-proposals/components/proposal";
import { TokenVotingAbi } from "@/app/plugins/community-proposals/artifacts/TokenVoting.sol";
import { Button, CardEmptyState, IconType } from "@aragon/ods";
import { useCanCreateProposal } from "@/app/plugins/community-proposals/hooks/useCanCreateProposal";
import Link from "next/link";
import { Else, ElseIf, If, Then } from "@/components/if";
import { PleaseWaitSpinner } from "@/components/please-wait";
import { PUB_TOKEN_VOTING_PLUGIN_ADDRESS } from "@/constants";
import { digestPagination } from "@/utils/pagination";
import { useVotingToken } from "@/app/plugins/community-proposals/hooks/useVotingToken";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useRouter } from "next/navigation";

export default function Proposals() {
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { push } = useRouter();

  const { data: blockNumber } = useBlockNumber({ watch: true });
  const canCreate = useCanCreateProposal();
  const { tokenSupply } = useVotingToken();
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: proposalCountResponse,
    isLoading,
    refetch,
  } = useReadContract({
    address: PUB_TOKEN_VOTING_PLUGIN_ADDRESS,
    abi: TokenVotingAbi,
    functionName: "proposalCount",
  });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  const proposalCount = Number(proposalCountResponse);
  const { visibleProposalIds, showNext, showPrev } = digestPagination(
    proposalCount,
    currentPage
  );

  return (
    <MainSection>
      <SectionView>
        <h1 className="justify-self-start text-3xl font-semibold align-middle">
          Proposals
        </h1>
        <div className="justify-self-end">
          <If condition={canCreate && proposalCount}>
            <Link href="#/new">
              <Button iconLeft={IconType.PLUS} size="md" variant="primary">
                Submit Proposal
              </Button>
            </Link>
          </If>
        </div>
      </SectionView>
      <If condition={proposalCount}>
        <Then>
          {visibleProposalIds.map((id) => (
            <ProposalCard
              key={id}
              proposalId={BigInt(id)}
              tokenSupply={tokenSupply || BigInt("0")}
            />
          ))}
          <div className="w-full flex flex-row justify-end gap-2 mt-4 mb-10">
            <Button
              variant="tertiary"
              size="sm"
              disabled={!showPrev}
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 0))}
              iconLeft={IconType.CHEVRON_LEFT}
            >
              Previous
            </Button>
            <Button
              variant="tertiary"
              size="sm"
              disabled={!showNext}
              onClick={() => setCurrentPage((page) => page + 1)}
              iconRight={IconType.CHEVRON_RIGHT}
            >
              Next
            </Button>
          </div>
        </Then>
        <ElseIf condition={isLoading}>
          <SectionView>
            <PleaseWaitSpinner />
          </SectionView>
        </ElseIf>
        <ElseIf condition={isConnected}>
          <SectionView>
            <CardEmptyState
              className="w-full"
              heading="There are no proposals yet"
              humanIllustration={{
                body: "VOTING",
                expression: "SMILE",
                hairs: "CURLY",
              }}
              primaryButton={{
                label: "Submit the first one",
                iconLeft: IconType.PLUS,
                onClick: () => push("#/new"),
              }}
            />
          </SectionView>
        </ElseIf>
        <Else>
          <SectionView>
            <CardEmptyState
              className="w-full"
              heading="There are no proposals yet"
              humanIllustration={{
                body: "VOTING",
                expression: "SMILE",
                hairs: "CURLY",
              }}
              primaryButton={{
                label: "Connect your wallet",
                onClick: () => open(),
              }}
            />
          </SectionView>
        </Else>
      </If>
    </MainSection>
  );
}

function MainSection({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col items-center mt-6 w-screen max-w-full">
      {children}
    </main>
  );
}

function SectionView({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row justify-between content-center w-full mb-6">
      {children}
    </div>
  );
}
