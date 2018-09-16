import fetch from 'node-fetch';
import { globalIdField } from 'graphql-relay';
import {
  GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList,
} from 'graphql';

const { API_KEY } = process.env;

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({}),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    allArticles: {
      type: new GraphQLList(ArticleType),
      resolve: async (_, { section, timePeriod }) => fetch(
        `https://api.nytimes.com/svc/mostpopular/v2/mostshared/${section}/${timePeriod}.json?api-key=${API_KEY}`,
      ),
    },
  }),
});

export default GraphQLSchema({
  query: QueryType,
});
