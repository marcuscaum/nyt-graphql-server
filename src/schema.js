import fetch from 'node-fetch';
import { globalIdField } from 'graphql-relay';
import {
  GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList,
} from 'graphql';

const ImageType = new GraphQLObjectType({
  name: 'Image',
  fields: {
    id: globalIdField('Image'),
    url: {
      type: GraphQLString,
      resolve: ({ media }) => media[0]['media-metadata'][2].url,
    },
    caption: {
      type: GraphQLString,
      resolve: ({ media }) => media[0].caption,
    },
  },
});

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: {
    id: globalIdField('Article'),
    url: {
      type: GraphQLString,
      resolve: ({ url }) => url,
    },
    section: {
      type: GraphQLString,
      resolve: ({ section }) => section,
    },
    title: {
      type: GraphQLString,
      resolve: ({ title }) => title,
    },
    abstract: {
      type: GraphQLString,
      resolve: ({ abstract }) => abstract,
    },
    publishedDate: {
      type: GraphQLString,
      resolve: ({ published_date }) => published_date,
    },
    image: {
      type: ImageType,
      resolve: ({ media }) => ({ media }),
    },
    totalShares: {
      type: GraphQLInt,
      resolve: ({ total_shares }) => total_shares,
    },
  },
});

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      allArticles: {
        type: new GraphQLList(ArticleType),
        resolve: async () => {
          const { API_KEY } = process.env;
          const resp = await fetch(
            `https://api.nytimes.com/svc/mostpopular/v2/mostshared/Science/30.json?api-key=${API_KEY}`,
          );
          const data = await resp.json();
          return data.results;
        },
      },
    },
  }),
});
