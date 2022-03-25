import React from "react";
import { NetworkStatus } from "@apollo/client";
import { InView } from "react-intersection-observer";

import { useClient } from "./useClient";
import { LaunchCard } from "../LaunchCard/LaunchCard";

import { footerStyles, infoStyles, listStyles } from "./launchListStyle";

export const LaunchList = () => {
  const [fullyLoaded, setFullyLoaded] = React.useState(false);

  const { data, loading, fetchMore, error, networkStatus, variables } =
    useClient(15);

  if (networkStatus === NetworkStatus.loading) {
    return <h1>Loading List...</h1>;
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
      <ul style={listStyles}>
        {data &&
          data.launches.map((launch) => {
            return (
              <LaunchCard key={launch.id} mission_name={launch.mission_name} />
            );
          })}
      </ul>

      {networkStatus !== NetworkStatus.fetchMore &&
        data &&
        data.launches.length % variables!.limit === 0 &&
        !fullyLoaded && <InView onChange={handleScroll} />}
      {fullyLoaded ? <h1>loading</h1> : null}
      {loading ? (
        <div style={infoStyles}>
          <p>Loading....</p>
        </div>
      ) : (
        <footer style={footerStyles}>
          Footer or something that tell that is end of the list
        </footer>
      )}
    </>
  );
};
