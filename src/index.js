import 'babel-polyfill';
import mount from 'koa-mount';
import Koa from 'koa';
import graphqlHTTP from 'koa-graphql';
import dotenv from 'dotenv';

import schema from './schema';

if (process.env.NODE_ENV !== 'production') {
  dotenv.load();
}

const PORT = process.env.PORT || 5000;
const app = new Koa();

app.use(
  mount(
    graphqlHTTP({
      schema,
      graphiql: true,
    }),
  ),
);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
