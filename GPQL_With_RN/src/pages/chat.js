import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {
  View,
  Platform,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';

import Input from './components/input';

const author = 'Kevin Martin';
StatusBar.setBarStyle('dark-content');

class Chat extends Component {
  componentDidMount() {
    this.props.conversation.subscribeToMore({
      document: gql`
        subscription onMessageAdded($author: String!){
          Message(filter: {
            mutation_in: [CREATED]
            node:{
              from_not: $author
            }
          }){
            node{
              id
              from
              message
            }
          }
        }
      `,
      variables: {
        author,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data['Message']) return prev;

        const newItem = subscriptionData.data['Message'].node;

        return { ...prev, allMessages: [ ...prev.allMessages, newItem ] };
      },
    });
}

  componentDidUpdate() {
    setTimeout(() => {
      this._scrollView.scrollToEnd({ animated: true });
    }, 0);
  }

  handleAddMessage = (proxy, { data: { createMessage } }) => {
    const data = proxy.readQuery({
      query: ConversationQuery,
    });
    data.allMessages.push(createMessage);

    proxy.writeQuery({
      query: ConversationQuery,
      data,
    });
  };

  renderChat = () => (
    this.props.conversation.allMessages.map(item => (
      <View
        key={item.id}
        style={[
          styles.bubble,
          item.from === author
            ? styles['bubble-right']
            : styles['bubble-left'],
       ]}
      >
        <Text style={styles.author}>{item.from}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    ))
  );

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavio={Platform.OS === 'ios' ? 'padding' : null}
      >
        <ScrollView
          keyboardShouldPersistTaps="never"
          ref={scrollView => this._scrollView = scrollView}
          contentContainerStyle={styles.conversation}
        >
          { this.props.conversation.loading
          ? <ActivityIndicator style={styles.loading} color="#FFF" />
          : this.renderChat()
        }
        </ScrollView>
        <Input author={author} onAddMessage={this.handleAddMessage} />
      </KeyboardAvoidingView>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c7743',
    ...Platform.select({
      ios: { paddingTop: 20 },
    }),
  },

  conversation: {
    padding: 10,
  },
  loading: {
    paddingTop: 20,
  },
  bubble: {
    padding: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 4,
    marginTop: 10,
    maxWidth: width - 60,
  },

  'bubble-right': {
    alignSelf: 'flex-end',
    backgroundColor: '#d1edc1',
  },

  'bubble-left': {
    alignSelf: 'flex-start',
  },

  author: {
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#333',
  },

  message: {
    fontSize: 16,
    color: '#333',
  },
});

const ConversationQuery = gql`
  query {
    allMessages(
      orderBy: createdAt_ASC
    ) {
      id
      from
      message
    }
  }
`;

export default graphql(ConversationQuery, {
  name: 'conversation',
})(Chat);
