import React from 'react';
import './App.css';

import{ApolloProvider} from "@apollo/client";

import { client} from "./api/apolloClient";
import {LaunchList} from "./components/LaunchesList/LaunchList";

function App() {
  return (
      <ApolloProvider client={client}>
          <div className="App">
            <h1>Hello infinite</h1>
              <LaunchList/>
          </div>
      </ApolloProvider>
  );
}

export default App;
