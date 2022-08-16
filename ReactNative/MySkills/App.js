import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export const App = () => {
  const [NewSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState([]);

  function handleAddNewSkill() {
    setMySkills(state => [...state, NewSkill]);
  }

  return (
    <View style={style.container}>
      <StatusBar barStyle={'light-content'} />

      <Text style={style.title}>
        Bem Vindo
      </Text>

      <TextInput
        style={style.input}
        placeholder="Skill name"
        placeholderTextColor="#666"
        onChangeText={setNewSkill}
      />

      <TouchableOpacity style={style.button} onPress={handleAddNewSkill}>
        <Text style={style.buttonText}>
          Adicionar nova Skill
        </Text>
      </TouchableOpacity>

      <Text style={[style.title, { marginTop: 24 }]}>
        Minhas Skills
      </Text>

      {mySkills.map((skill, index) => (
        <TouchableOpacity style={style.skillBox} key={`${skill}${index}`}>
          <Text style={style.skillTitle}>{skill}</Text>
        </TouchableOpacity>
      ))}
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
    color: '#FFF',
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
  },
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