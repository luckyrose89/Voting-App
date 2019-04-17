const graphql = require("graphql");
const Poll = require("../models/poll");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = graphql;

const AnswerType = new GraphQLObjectType({
  name: "Answer",
  fields: () => ({
    id: { type: GraphQLID },
    option: { type: GraphQLString },
    votes: { type: GraphQLInt }
  })
});

const QuestionType = new GraphQLObjectType({
  name: "Question",
  fields: () => ({
    id: { type: GraphQLID },
    question: { type: GraphQLString },
    answer: { type: GraphQLList(AnswerType) }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    polls: {
      type: new GraphQLList(QuestionType),
      resolve(parent, args) {
        return Poll.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation"
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
