import { ApolloClient,  InMemoryCache } from "@apollo/client";
import {offsetLimitPagination} from "@apollo/client/utilities";

const dataService = "https://api.spacex.land/graphql";

export const client = new ApolloClient({
  uri: dataService,
  cache: new InMemoryCache({
    typePolicies:{
      Query :{
        fields: {
          launchesPast: offsetLimitPagination()
        }
      }
    }
  }),
});
