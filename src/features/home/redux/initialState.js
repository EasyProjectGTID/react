const initialState = {
  token: "af15872defd6cb78e2dad2573ebaa6a90ffedc22",
  baseApiUrl: 'http://127.0.0.1:8000/',
  resultatRecherche: [],
  typeApp: 'mesVotes',
  cloudWords: [],
  resultatCompute: [],
  allSeries: {},
  showDetails: null,
  getSimilarItemsPending: false,
  getSimilarItemsError: null,
  getRecentSeriePending: false,
  getRecentSerieError: null,
  modalSignOrConnect: false,
  votePending: false,
  voteError: null,
  voteSuccess:false,
  getAllSeriePending: false,
  getAllSerieError: null,
  getComputePending: false,
  getComputeError: null,
  getMyUserVotePending: false,
  getMyUserVoteError: null,
  getMyVoteComputePending: false,
  getMyVoteComputeError: null,
  deleteVotePending: false,
  deleteVoteError: null,


};

export default initialState;
