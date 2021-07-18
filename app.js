const express = require('express');
// const { json } = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

// Mongoose connect
const mongoose = require('mongoose');

// Connect MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.aq30v.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

// Import schema and resolvers
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

// Import middleware
const isAuth = require('./middleware/is-auth');

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);
