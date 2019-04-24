const graphql = require("graphql");
const Poll = require("../models/poll");
const Option = require("../models/pollOptions");

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

const OptionType = new GraphQLObjectType({
  name: "Option",
  fields: () => ({
    id: { type: GraphQLID },
    option: { type: GraphQLString },
    votes: { type: GraphQLInt },
    pollId: { type: GraphQLID },
    poll: {
      type: QuestionType,
      resolve(parent, args) {
        return Poll.findById(parent.pollId);
      }
    }
  })
});

const QuestionType = new GraphQLObjectType({
  name: "Question",
  fields: () => ({
    id: { type: GraphQLID },
    question: { type: GraphQLString },
    answer: {
      type: GraphQLList(OptionType),
      resolve(parent, args) {
        return Option.find({ pollId: parent.id });
      }
    }
  })
});

const OptionTypeInput = new GraphQLInputObjectType({
  name: "OptionInput",
  fields: () => ({
    option: { type: new GraphQLNonNull(GraphQLString) },
    votes: { type: GraphQLInt },
    pollId: { type: new GraphQLNonNull(GraphQLID) }
  })
});

const QuestionTypeInput = new GraphQLInputObjectType({
  name: "QuestionInput",
  fields: () => ({
    question: { type: new GraphQLNonNull(GraphQLString) }
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
    },

    poll: {
      type: QuestionType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Poll.findById(args.id);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createPoll: {
      type: QuestionType,
      args: {
        input: {
          type: new GraphQLNonNull(QuestionTypeInput)
        }
      },
      resolve(parent, args) {
        let poll = new Poll({
          question: args.input.question
        });

        return poll.save();
      }
    },

    createOption: {
      type: OptionType,
      args: {
        input: {
          type: new GraphQLNonNull(OptionTypeInput)
        }
      },
      resolve(parent, args) {
        let option = new Option({
          option: args.input.option,
          votes: 0,
          pollId: args.input.pollId
        });

        return option.save();
      }
    },

    upVote: {
      type: OptionType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        let option = Option.findById(args.id);
        option.votes += 1;
        return option.save();
      }
    },

    deleteQuestion: {
      type: QuestionType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        let poll = Poll.findByIdAndRemove(args.id);
        return poll;
      }
    },

    deleteOption: {
      type: OptionType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        let option = Option.findByIdAndRemove(args.id);
        return option;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
