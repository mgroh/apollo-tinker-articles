const { ApolloServer, gql } = require('apollo-server');
const articles = require('./articles.json');

const typeDefs = gql`
  type Article {
    id: String!
    title: String
    authors: [String]
    teaser: String
    text: String
  }

  type Query {
    articles: [Article]
    article(id: String!): Article 
  }
`;

const resolvers = {
  Query: {
    articles: () => articles,
    article: (root, {id}) => articles.find((a) => a.id === id)
},
};

const server = new ApolloServer({
    typeDefs,
    resolvers 
});

server.listen((process.env.PORT || 4000)).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
