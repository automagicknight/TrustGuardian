export const TokenVotingAbi = [
  {
    inputs: [
      { internalType: "address", name: "dao", type: "address" },
      { internalType: "address", name: "where", type: "address" },
      { internalType: "address", name: "who", type: "address" },
      { internalType: "bytes32", name: "permissionId", type: "bytes32" },
    ],
    name: "DaoUnauthorized",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint64", name: "limit", type: "uint64" },
      { internalType: "uint64", name: "actual", type: "uint64" },
    ],
    name: "DateOutOfBounds",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint64", name: "limit", type: "uint64" },
      { internalType: "uint64", name: "actual", type: "uint64" },
    ],
    name: "MinDurationOutOfBounds",
    type: "error",
  },
  { inputs: [], name: "NoVotingPower", type: "error" },
  {
    inputs: [{ internalType: "address", name: "sender", type: "address" }],
    name: "ProposalCreationForbidden",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "proposalId", type: "uint256" }],
    name: "ProposalExecutionForbidden",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "limit", type: "uint256" },
      { internalType: "uint256", name: "actual", type: "uint256" },
    ],
    name: "RatioOutOfBounds",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "proposalId", type: "uint256" },
      { internalType: "address", name: "account", type: "address" },
      {
        components: [
          { internalType: "uint256", name: "abstain", type: "uint256" },
          { internalType: "uint256", name: "yes", type: "uint256" },
          { internalType: "uint256", name: "no", type: "uint256" },
        ],
        internalType: "struct IVoteContainer.Tally",
        name: "votes",
        type: "tuple",
      },
    ],
    name: "VoteCastForbidden",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "previousAdmin", type: "address" },
      { indexed: false, internalType: "address", name: "newAdmin", type: "address" },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: "address", name: "beacon", type: "address" }],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint8", name: "version", type: "uint8" }],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address[]", name: "members", type: "address[]" }],
    name: "MembersAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address[]", name: "members", type: "address[]" }],
    name: "MembersRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: "address", name: "definingContract", type: "address" }],
    name: "MembershipContractAnnounced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "proposalId", type: "uint256" },
      { indexed: true, internalType: "address", name: "creator", type: "address" },
      { indexed: false, internalType: "uint64", name: "startDate", type: "uint64" },
      { indexed: false, internalType: "uint64", name: "endDate", type: "uint64" },
      { indexed: false, internalType: "bytes", name: "metadata", type: "bytes" },
      {
        components: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "value", type: "uint256" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        indexed: false,
        internalType: "struct IDAO.Action[]",
        name: "actions",
        type: "tuple[]",
      },
      { indexed: false, internalType: "uint256", name: "allowFailureMap", type: "uint256" },
    ],
    name: "ProposalCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: "uint256", name: "proposalId", type: "uint256" }],
    name: "ProposalExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: "address", name: "implementation", type: "address" }],
    name: "Upgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "proposalId", type: "uint256" },
      { indexed: true, internalType: "address", name: "voter", type: "address" },
      {
        components: [
          { internalType: "uint256", name: "abstain", type: "uint256" },
          { internalType: "uint256", name: "yes", type: "uint256" },
          { internalType: "uint256", name: "no", type: "uint256" },
        ],
        indexed: false,
        internalType: "struct IVoteContainer.Tally",
        name: "votes",
        type: "tuple",
      },
      { indexed: false, internalType: "uint256", name: "votingPower", type: "uint256" },
    ],
    name: "VoteCast",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "enum IToucanVoting.VotingMode", name: "votingMode", type: "uint8" },
      { indexed: false, internalType: "uint32", name: "supportThreshold", type: "uint32" },
      { indexed: false, internalType: "uint32", name: "minParticipation", type: "uint32" },
      { indexed: false, internalType: "uint64", name: "minDuration", type: "uint64" },
      { indexed: false, internalType: "uint256", name: "minProposerVotingPower", type: "uint256" },
    ],
    name: "VotingSettingsUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "TOKEN_VOTING_INTERFACE_ID",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UPDATE_VOTING_SETTINGS_PERMISSION_ID",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UPGRADE_PLUGIN_PERMISSION_ID",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_proposalId", type: "uint256" }],
    name: "canExecute",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_proposalId", type: "uint256" },
      { internalType: "address", name: "_voter", type: "address" },
      {
        components: [
          { internalType: "uint256", name: "abstain", type: "uint256" },
          { internalType: "uint256", name: "yes", type: "uint256" },
          { internalType: "uint256", name: "no", type: "uint256" },
        ],
        internalType: "struct IVoteContainer.Tally",
        name: "_votes",
        type: "tuple",
      },
    ],
    name: "canVote",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "_metadata", type: "bytes" },
      {
        components: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "value", type: "uint256" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        internalType: "struct IDAO.Action[]",
        name: "_actions",
        type: "tuple[]",
      },
      { internalType: "uint256", name: "_allowFailureMap", type: "uint256" },
      { internalType: "uint32", name: "_startDate", type: "uint32" },
      { internalType: "uint32", name: "_endDate", type: "uint32" },
      {
        components: [
          { internalType: "uint256", name: "abstain", type: "uint256" },
          { internalType: "uint256", name: "yes", type: "uint256" },
          { internalType: "uint256", name: "no", type: "uint256" },
        ],
        internalType: "struct IVoteContainer.Tally",
        name: "_votes",
        type: "tuple",
      },
      { internalType: "bool", name: "_tryEarlyExecution", type: "bool" },
    ],
    name: "createProposal",
    outputs: [{ internalType: "uint256", name: "proposalId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "dao",
    outputs: [{ internalType: "contract IDAO", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_proposalId", type: "uint256" }],
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_proposalId", type: "uint256" }],
    name: "getProposal",
    outputs: [
      { internalType: "bool", name: "open", type: "bool" },
      { internalType: "bool", name: "executed", type: "bool" },
      {
        components: [
          { internalType: "enum IToucanVoting.VotingMode", name: "votingMode", type: "uint8" },
          { internalType: "uint32", name: "supportThreshold", type: "uint32" },
          { internalType: "uint32", name: "startDate", type: "uint32" },
          { internalType: "uint32", name: "endDate", type: "uint32" },
          { internalType: "uint32", name: "snapshotBlock", type: "uint32" },
          { internalType: "uint32", name: "snapshotTimestamp", type: "uint32" },
          { internalType: "uint256", name: "minVotingPower", type: "uint256" },
        ],
        internalType: "struct IToucanVoting.ProposalParameters",
        name: "parameters",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "abstain", type: "uint256" },
          { internalType: "uint256", name: "yes", type: "uint256" },
          { internalType: "uint256", name: "no", type: "uint256" },
        ],
        internalType: "struct IVoteContainer.Tally",
        name: "tally",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "value", type: "uint256" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        internalType: "struct IDAO.Action[]",
        name: "actions",
        type: "tuple[]",
      },
      { internalType: "uint256", name: "allowFailureMap", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_proposalId", type: "uint256" },
      { internalType: "address", name: "_voter", type: "address" },
    ],
    name: "getVotes",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "abstain", type: "uint256" },
          { internalType: "uint256", name: "yes", type: "uint256" },
          { internalType: "uint256", name: "no", type: "uint256" },
        ],
        internalType: "struct IVoteContainer.Tally",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVotingToken",
    outputs: [{ internalType: "contract IVotesUpgradeable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_who", type: "address" }],
    name: "hasEnoughVotingPower",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "implementation",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IDAO", name: "_dao", type: "address" },
      {
        components: [
          { internalType: "enum IToucanVoting.VotingMode", name: "votingMode", type: "uint8" },
          { internalType: "uint32", name: "supportThreshold", type: "uint32" },
          { internalType: "uint32", name: "minParticipation", type: "uint32" },
          { internalType: "uint32", name: "minDuration", type: "uint32" },
          { internalType: "uint256", name: "minProposerVotingPower", type: "uint256" },
        ],
        internalType: "struct IToucanVoting.VotingSettings",
        name: "_votingSettings",
        type: "tuple",
      },
      { internalType: "address", name: "_token", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_account", type: "address" }],
    name: "isMember",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_proposalId", type: "uint256" }],
    name: "isMinParticipationReached",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_proposalId", type: "uint256" }],
    name: "isProposalOpen",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_proposalId", type: "uint256" }],
    name: "isSupportThresholdReached",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_proposalId", type: "uint256" }],
    name: "isSupportThresholdReachedEarly",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minDuration",
    outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minParticipation",
    outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minProposerVotingPower",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pluginType",
    outputs: [{ internalType: "enum IPlugin.PluginType", name: "", type: "uint8" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "proposalCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "supportThreshold",
    outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "_interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_blockNumber", type: "uint256" }],
    name: "totalVotingPower",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "enum IToucanVoting.VotingMode", name: "votingMode", type: "uint8" },
          { internalType: "uint32", name: "supportThreshold", type: "uint32" },
          { internalType: "uint32", name: "minParticipation", type: "uint32" },
          { internalType: "uint32", name: "minDuration", type: "uint32" },
          { internalType: "uint256", name: "minProposerVotingPower", type: "uint256" },
        ],
        internalType: "struct IToucanVoting.VotingSettings",
        name: "_votingSettings",
        type: "tuple",
      },
    ],
    name: "updateVotingSettings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newImplementation", type: "address" }],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint32", name: "_start", type: "uint32" },
      { internalType: "uint32", name: "_end", type: "uint32" },
    ],
    name: "validateProposalDates",
    outputs: [
      { internalType: "uint32", name: "startDate", type: "uint32" },
      { internalType: "uint32", name: "endDate", type: "uint32" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_proposalId", type: "uint256" },
      {
        components: [
          { internalType: "uint256", name: "abstain", type: "uint256" },
          { internalType: "uint256", name: "yes", type: "uint256" },
          { internalType: "uint256", name: "no", type: "uint256" },
        ],
        internalType: "struct IVoteContainer.Tally",
        name: "_votes",
        type: "tuple",
      },
      { internalType: "bool", name: "_tryEarlyExecution", type: "bool" },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "votingMode",
    outputs: [{ internalType: "enum IToucanVoting.VotingMode", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
