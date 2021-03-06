import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//Apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>This is a react app</h1>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
