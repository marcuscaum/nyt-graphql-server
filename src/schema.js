import fetch from 'node-fetch';
import { globalIdField } from 'graphql-relay';
import {
  GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList,
} from 'graphql';

const { API_KEY } = process.env;

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: globalIdField('Article'),
    _id: {
      type: GraphQLInt,
      resolve: { id } => id,
    },
    url: {
      type: GraphQLString,
      resolve: { url } => url,
    },
    section: {
      type: GraphQLString,
      resolve: { section } => section,
    },
    title: {
      type: GraphQLString,
      resolve: { title } => title,
    },
    abstract: {
      type: GraphQLString,
      resolve: { abstract } => abstract,
    },
    publishedDate: {
      type: GraphQLString,
      resolve: { published_date } => published_date,
    },
    imageCaption: {
      type: GraphQLString,
      resolve: { media } => media[0].caption,
    },
    imageLarge: {
      type: GraphQLString,
      resolve: { media } => media[0]['media-metadata'][2].url,
    },
    totalShares: { type: GraphQLInt },
  }),
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
