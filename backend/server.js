const { ApolloServer, gql } = require("apollo-server");

const question = "Which greeting do you prefer?";
const answers = [
  {
    option: "Hi"
  },
  {
    option: "why"
  }
];

const typeDefs = gql`
  type Answer {
    option: String
  }

  type Query {
    question: String
    answers: [Answer]
  }
`;

const resolvers = {
  Query: {
    answers: () => answers,
    question: () => question
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
