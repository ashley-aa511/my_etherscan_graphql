const { ApolloServer } = require("apollo-server");  // Import ApolloServer
const { importSchema } = require("graphql-import"); // Import importSchema
const EtherDataSource = require("./datasource/ethDatasource"); // Import EtherDataSource
const typeDefs = importSchema("./schema.graphql"); // Import schema

require("dotenv").config(); // Load environment variables from .env file

// index.js - Entry point for GraphQL server 

const resolvers = { // Define resolvers
  Query: {
    etherBalanceByAddress: (
      root,
      _args,
      { dataSources } // Get ether balance by address
    ) => dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (
      root,
      _args,
      { dataSources } // Get total ether supply
    ) => dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (
      root,
      _args,
      { dataSources } // Get latest ether price
    ) => dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (
      root,
      _args,
      { dataSources } // Get block confirmation time
    ) => dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo server instance
const server = new ApolloServer({
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Set timeout and listen on port
server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
