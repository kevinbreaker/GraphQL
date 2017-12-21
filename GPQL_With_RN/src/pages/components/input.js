import React, { Component } from 'react';
import { TextInput, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Input extends Component {
  state = {
    message: '',
  };

  handleAddMessage = async () => {
    const { author } = this.props;
    const { message } = this.state;

    if (message.length > 0) {
      const newMessage = await this.props.addMessage({
        author,
        message,
      });
    }

    this.setState({ message: '' });
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          value={this.state.message}
          onChangeText={message => this.setState({ message })}
        />
        <TouchableOpacity activeOpacity={0.6} onPress={this.handleAddMessage}>
          <Text style={styles.button}>Enviar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    height: 42,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#eaeaea',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: 0,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 12,
  },

  button: {
    marginLeft: 10,
    color: '#358cff',
    fontWeight: 'bold',
  },
});


const MessageMutation = gql`
  mutation(
    $author: String!
    $message: String!
  ) {
    createMessage(
      from: $author
      message: $message
    ) {
      id
      from
      message
    }
  }
`;

export default graphql(MessageMutation, {
  props: ({ ownProps, mutate }) => ({
    addMessage: ({ author, message }) => mutate({
      variables: { author, message },
      update: ownProps.onAddMessage,
    }),
  }),
})(Input);
