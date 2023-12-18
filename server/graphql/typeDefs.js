const { gql } = require("apollo-server");

const typeDefs=gql`

    type userData {
        id: ID,
        name: String,
        username: String,
        email: String,
        password: String,
        image: String
    }

    type messagesData {
        message_id: ID,
        sender_id: String,
        receiver_id: String,
        message_text: String,
        sent_at: String
    }

    type getSingleUser{
        id: ID,
        username: String,
        name: String,
        email: String,
        password: String,
        image: String
    }

    type getUsers{
        username: String
    }

    type PostsData{
        p_id: ID,
        p_username: String,
        p_image: String,
    }

    input registerInput {
        id: ID,
        name: String,
        username: String,
        email: String,
        password: String,
    }

    input loginInput {
        id: ID,
        username: String,
        password: String,
    }

    input resetPasswordInput {
        id: ID,
        email: String!,
        username: String!,
        password: String,
    }

    input resetUsernameInput{
        id: ID,
        email: String!,
        password: String!,
        username: String
    }

    input resetEmailInput{
        id:ID,
        username: String!,
        password: String!,
        email: String
        
    }

    input deleteInput {
        email: String!,
        password: String!,
    }
    

    input messagesInput{
        message_id: ID,
        sender_id: String,
        receiver_id: String,
        message_text: String,
    }

    input changeImageInput{
        username: String,
        image: String,
        
    }

    input postsImages{
        p_images: String
    }

    type Mutation {
        create(input: registerInput): userData
        login(input: loginInput): userData
        resetPassword(input: resetPasswordInput): userData
        resetUsername(input: resetUsernameInput): userData
        resetEmail(input: resetEmailInput): userData
        delete(input: deleteInput): userData
        messages(input: messagesInput): messagesData
        changeImage(input: changeImageInput): userData
        postsImages(input: postsImages): PostsData
    }

    type Query {
        Users: [userData]
        senderMessages(input: messagesInput): [messagesData]
        receiverMessages(input: messagesInput): [messagesData]
        getSingleUser(username: String): getSingleUser
        getImages: [PostsData]
    }
`

module.exports = {typeDefs}