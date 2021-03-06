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
    votes: { type: new GraphQLNonNull(GraphQLInt) },
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

    createPollOption: {
      type: OptionType,
      args: {
        input: {
          type: new GraphQLNonNull(OptionTypeInput)
        }
      },
      resolve(parent, args) {
        console.log(args);
        let option = new Option({
          option: args.input.option,
          votes: args.input.votes,
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
      async resolve(parent, args) {
        let option = await Option.findById(args.id).exec();
        option.votes += 1;
        return option.save();
      }
    },

    deleteQuestion: {
      type: QuestionType,
      args: {
        id: { type: GraphQLID }
      },
      async resolve(parent, args) {
        await Option.deleteMany({ pollId: args.id })
          .exec()
          .catch(err => console.error(`Error deleting poll options`, err));
        const deletedPoll = await Poll.findByIdAndRemove(args.id)
          .exec()
          .catch(err => console.error(`Error deleting poll`, err));
        return deletedPoll;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
