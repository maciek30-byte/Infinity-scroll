import { gql } from "@apollo/client";

export const GET_LIST_LAUNCHES = gql`
  query ListLaunches($offset: Int!, $limit: Int!) {
    launches: launchesPast(
      offset: $offset
      limit: $limit
      sort: "launch_date_utc"
      order: "desc"
    ) {
      id
      mission_name
      rocket {
        rocket_name
      }
    }
  }
`;
