import fetch from 'node-fetch';
import { GraphQLList, GraphQLNonNull } from 'graphql';

import { ArticleType, ArticleInputType } from './types';

export default {
  allArticles: {
    type: new GraphQLList(ArticleType),
    args: {
      params: {
        type: new GraphQLNonNull(ArticleInputType),
      },
    },
    resolve: async (_, { params }) => {
      const { API_KEY } = process.env;
      const { section, timePeriod } = params;
      const resp = await fetch(
        `https://api.nytimes.com/svc/mostpopular/v2/mostshared/${section}/${timePeriod}.json?api-key=${API_KEY}`,
      );
      const data = await resp.json();
      return data.results;
    },
  },
};
