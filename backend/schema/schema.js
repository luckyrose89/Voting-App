const graphql = require("graphql");
const Poll = require("../models/poll");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLNonNull
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
    id: { type: new GraphQLNonNull(GraphQLID) },
    question: { type: GraphQLString },
    answer: { type: GraphQLList(AnswerType) }
  })
});

const AnswerTypeInput = new GraphQLInputObjectType({
  name: "AnswerInput",
  fields: () => ({
    option: { type: GraphQLString },
    votes: { type: GraphQLInt }
  })
});

const QuestionTypeInput = new GraphQLInputObjectType({
  name: "QuestionInput",
  fields: () => ({
    question: { type: new GraphQLNonNull(GraphQLString) },
    answer: { type: new GraphQLNonNull(GraphQLList(AnswerTypeInput)) }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    polls: {
      type: new GraphQLList(QuestionType),
      resolve(parent, args) {
        return Poll.find();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPoll: {
      type: QuestionType,
      args: {
        input: {
          type: new GraphQLNonNull(QuestionTypeInput)
        }
      },
      resolve(parent, args) {
        let poll = new Poll({
          question: args.input.question,
          answer: args.input.answer
        });
        return poll.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
