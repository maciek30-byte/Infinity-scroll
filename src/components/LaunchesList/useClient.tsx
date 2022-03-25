import { useQuery } from "@apollo/client";

import { LaunchesQVars, LaunchesResponse } from "../../api/types/launchesQ";

import { GET_LIST_LAUNCHES } from "../../queries/launchCardQ";
import { client } from "../../api/apolloClient";

export const useClient = (limit: number, offset: number = 0) => {
  const { data, loading, error, fetchMore, networkStatus, variables } =
    useQuery<LaunchesResponse, LaunchesQVars>(GET_LIST_LAUNCHES, {
      client,
      notifyOnNetworkStatusChange: true,
      variables: {
        offset: 0,
        limit: 15,
      },
    });

  return {
    data,
    loading,
    error,
    fetchMore,
    networkStatus,
    variables,
  };
};
