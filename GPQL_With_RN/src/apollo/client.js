import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjbb7jwpi0q64018171x4jpkv', // endpoints of https://console.graph.cool/LearningGraphQL/playground
});

const wsLink = new WebSocketLink({
  uri: 'wss://subscriptions.us-west-2.graph.cool/v1/cjbb7jwpi0q64018171x4jpkv', // endpoits subscription
  options: { reconnect: true },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink, // se subscription retorna wsLink
  httpLink, // se não for, retorna httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;

