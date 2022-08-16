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

      <TextInput style={style.input} placeholder="Skill name" placeholderTextColor="#666" />

      <TouchableOpacity style={style.button}>
        <Text style={style.buttonText}>
          Adicionar nova Skill
        </Text>
      </TouchableOpacity>
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
  input: {
    padding: 15,
    fontSize: 18,
    marginTop: 24,
    borderRadius: 4,
    backgroundColor: '#1F1E25',
  },
  button: {
    padding: 16,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 24,
    backgroundColor: '#A370F7',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
  }
});