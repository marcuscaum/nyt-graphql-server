import { globalIdField } from 'graphql-relay';
import {
  GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLInputObjectType,
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

const ArticleInputType = new GraphQLInputObjectType({
  name: 'ArticleInputType',
  fields: {
    section: {
      type: GraphQLString,
    },
    timePeriod: {
      type: GraphQLInt,
    },
  },
});

export { ImageType, ArticleType, ArticleInputType };
