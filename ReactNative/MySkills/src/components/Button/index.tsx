import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export const Button = ({title, ...rest}: ButtonProps) => {
  return (
    <TouchableOpacity style={style.button} {...rest}>
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
