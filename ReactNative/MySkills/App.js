import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export const App = () => {
  return (
    <View style={style.container}>
      <StatusBar barStyle={'light-content'} />

      <Text style={style.title}>
        Bem Vindo
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#121015'
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeigth: 'bold'
  },
});