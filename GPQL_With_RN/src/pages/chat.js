import React from 'react';
import { 
  View,
  Platform,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
 } from 'react-native';

import Input from './components/input';


StatusBar.setBarStyle('dark-content');

const Chat = () => (
  <KeyboardAvoidingView
   style={styles.container}
   behavio={Platform.OS === 'ios' ? 'padding' : null }
   keyboardShouldPersistTaps='never'
   >
    <ScrollView contentContainerStyle={styles.conversation}>
      <View style={[styles.bubble, styles['bubble-left']]}>
        <Text style={styles.author}>Kevin</Text>
        <Text style={styles.message}>Hey you guys, do you want a trouble ?</Text>
      </View>
      <View style={[styles.bubble, styles['bubble-left']]}>
        <Text style={styles.author}>Kevin</Text>
        <Text style={styles.message}>mindfuck say my password</Text>
      </View>
      <View style={[styles.bubble, styles['bubble-right']]}>
        <Text style={styles.author}>Kevin</Text>
        <Text style={styles.message}>Hey you guys</Text>
      </View>
      <View style={[styles.bubble, styles['bubble-left']]}>
        <Text style={styles.author}>Kevin</Text>
        <Text style={styles.message}>Hey you guys, do you want a trouble ?</Text>
      </View>
      <View style={[styles.bubble, styles['bubble-left']]}>
        <Text style={styles.author}>Kevin</Text>
        <Text style={styles.message}>mindfuck say my password</Text>
      </View>
      <View style={[styles.bubble, styles['bubble-right']]}>
        <Text style={styles.author}>Kevin</Text>
        <Text style={styles.message}>Hey you guys</Text>
      </View>
      <View style={[styles.bubble, styles['bubble-left']]}>
        <Text style={styles.author}>Kevin</Text>
        <Text style={styles.message}>Hey you guys, do you want a trouble ?</Text>
      </View>
      <View style={[styles.bubble, styles['bubble-left']]}>
        <Text style={styles.author}>Kevin</Text>
        <Text style={styles.message}>mindfuck say my password</Text>
      </View>
      <View style={[styles.bubble, styles['bubble-right']]}>
        <Text style={styles.author}>Kevin</Text>
        <Text style={styles.message}>Hey you guys</Text>
      </View>
      <View style={[styles.bubble, styles['bubble-left']]}>
        <Text style={styles.author}>Kevin</Text>
        <Text style={styles.message}>Hey you guys, do you want a trouble ?</Text>
      </View>
      <View style={[styles.bubble, styles['bubble-left']]}>
        <Text style={styles.author}>Kevin</Text>
        <Text style={styles.message}>mindfuck say my password</Text>
      </View>
      <View style={[styles.bubble, styles['bubble-right']]}>
        <Text style={styles.author}>Kevin</Text>
        <Text style={styles.message}>Hey you guys</Text>
      </View>

    </ScrollView>
    <Input />
  </KeyboardAvoidingView>
);

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

export default Chat;
