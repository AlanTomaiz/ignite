import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const Button = ({title = 'Novo Botão', onPress}) => {
  return (
    <TouchableOpacity style={style.button} onPress={onPress}>
      <Text style={style.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
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
  },
});
