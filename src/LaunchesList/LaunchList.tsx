import React from "react";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_LIST_LAUNCHES } from "../queries/launchCardQ";
import { LaunchesQVars, LaunchesResponse } from "../api/types/launchesQ";
import { InView } from "react-intersection-observer";
import { client } from "../api/apolloClient";

export const LaunchList = () => {
  const [fullyLoaded, setFullyLoaded] = React.useState(false);

  const { data, loading, error, fetchMore, networkStatus, variables } =
    useQuery<LaunchesResponse, LaunchesQVars>(GET_LIST_LAUNCHES, {
      client,
      notifyOnNetworkStatusChange: true,
      variables: {
        offset: 0,
        limit:20,
      },
    });

  if (networkStatus === NetworkStatus.loading) {
    return <h1 style={{width:'100vw',height:'100vh'}}>Loading List...</h1>
  }

  if (error) {
    return <div>{error.message}</div>;
  }


  const handleScroll = async (inView: boolean) => {
    if (inView) {
      const results = await fetchMore({
        variables: {
          offset: data && data.launches.length,
        },
      });
      setFullyLoaded(!results.data.launches.length);
    }
  };

  return (
    <>
      <ul>
        {data?.launches.map((launch) => {
          return <li key={launch.id}>{launch.mission_name}</li>;
        })}
      </ul>

      {networkStatus !== NetworkStatus.fetchMore &&
        data &&
        data.launches.length % variables!.limit === 0 &&
        !fullyLoaded && <InView onChange={handleScroll} />}
        {fullyLoaded ? <h1>loading</h1> : null}
    </>
  );
};
