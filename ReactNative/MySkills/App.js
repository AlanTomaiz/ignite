import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View, TextInput} from 'react-native';

import {Button} from './src/components/Button';
import {SkillsBox} from './src/components/SkillsBox';

export const App = () => {
  const [NewSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState([]);

  function handleAddNewSkill() {
    setMySkills(state => [...state, NewSkill]);
  }

  return (
    <View style={style.container}>
      <StatusBar barStyle={'light-content'} />

      <Text style={style.title}>Bem Vindo</Text>

      <TextInput
        style={style.input}
        placeholder="Skill name"
        placeholderTextColor="#666"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill} title="Adicionar nova Skill" />

      <Text style={[style.title, {marginTop: 24}]}>Minhas Skills</Text>

      {mySkills.map((skill, index) => (
        <SkillsBox title={skill} key={`${skill}${index}`} />
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#121015',
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeigth: 'bold',
  },
  input: {
    color: '#FFF',
    padding: 15,
    fontSize: 18,
    marginTop: 24,
    borderRadius: 4,
    backgroundColor: '#1F1E25',
  },
});
