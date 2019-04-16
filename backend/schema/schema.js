const graphql = require("graphql");
const Poll = require("../models/poll");

const { GraphQLObjectType, GraphQLSchema } = graphql;

const QuestionType = new GraphQLObjectType({
  name: "Question"
});

const AnswerType = new GraphQLObjectType({
  name: "Answer"
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType"
});

const Mutation = new GraphQLObjectType({
  name: "Mutation"
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
