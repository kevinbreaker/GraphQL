import React, { Component } from 'react';
import { Text, Platform } from 'react-native';
import { ApolloProvider } from 'react-apollo';

import  client  from './apollo/client';
import Chat from './pages/chat';

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Chat />
      </ApolloProvider>
    );
  }
}