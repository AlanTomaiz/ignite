import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface BoxProps {
  title: string;
}

export const SkillsBox = ({title}: BoxProps) => {
  return (
    <TouchableOpacity style={style.skillBox}>
      <Text style={style.skillTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  skillBox: {
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#1F1E25',
    paddingVertical: 12,
    marginTop: 8,
  },
  skillTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
