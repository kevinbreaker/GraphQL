import React, { Component } from 'react';
import { TextInput, Text, View, TouchableOpacity, StyleSheet } from 'react-native';


export default class Input extends Component {
  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          underlineColorAndroid="rgba(0,0,0,0)"
        />
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.button}>Enviar</Text>
        </TouchableOpacity>
      </View>
    )
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
  }
});