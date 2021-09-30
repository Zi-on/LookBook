const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            console.log(context.user);
            if(context.user) {
                const userData = await User.findOne({})
                .select('-__v -password')
                .populate('books')

            return userData;
            }
            
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user)

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
              throw new AuthenticationError('No profile with this email found!');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect password!');
            }
      
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            console.log(context.user)
            console.log( args.input)
            return User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $SetBook: {
                        authors: args.input.authors,
                        description: args.input.description,
                        title: args.input.title,
                        bookId: args.input.bookId,
                        image: args.input.image,
                        link: args.input.link,
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        removeBook: async (parent, { bookId }) => {
            return User.findOneAndDelete({ _id: bookId });
        }

    }

}
module.exports = resolvers;