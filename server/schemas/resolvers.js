const { AuthenticationError } = require('apollo-server-core');
const { set } = require('../config/connection');
const {User} = require('../models');

const resolvers = {
    // me query
    Query: {
        me: async(parent, args, context) => {
            if(context.user){
                const user = await User.findOne(
                    {_id: context.user._id})
                    .select('-__v-password')
                    return user;
            }
        },
    },

    Mutation: {
        //login mutation
            login: async(parent, {email, password}) => {
                const user = await User.findOne({email});

                if(!user){
                    throw new AuthenticationError('No User Found With That Email');
                }

                const correctPass = await user.isCorrectPassword(password);

                if(!correctPass){
                    throw new AuthenticationError('Re-enter Your Password');
                }
                    const token = signToken(user);
                    return {token, user};
                
            },

            addUser: async(parent, args) => {
                const user = await User.create(args)
                const token = signToken(user);

                return {token, user};
            },

           addSet: async(parent, {setData}, context) =>{
               if(context.user){
                const newSet = await User.findbByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {set: {setData}}},
                    {new: true}
                )

                return newSet;
               }
           },

           addCard: async(parent, {cardId}, context) => {
               if(context.user){
                   const newCard = await StudySet.findOneAndUpdate(
                       {_id: context.set._id},
                       {$push: {setData: cardId}},
                       {new: true}
                   );

                   return newCard;
               }
           },

           removeCard: async(parent, {cardId}, context) => {
               if(context.user){
                  const removeCard = await StudySet.findOneAndUpdate(
                      {_id: context.user._id},
                      {$pull: {StudySet: {cardId}}},
                      {new: true}
                  )

                  return removeCard
               }
           }
        }
}

module.exports = resolvers;