import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
} from 'react-native';

import {Button} from '../../components/Button';
import {SkillsBox} from '../../components/SkillsBox';

interface SkillProps {
  id: string;
  title: string;
}

export const Home = () => {
  const [NewSkill, setNewSkill] = useState('');
  const [gretting, setGretting] = useState('');
  const [mySkills, setMySkills] = useState<SkillProps[]>([]);

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      title: NewSkill,
    };

    setMySkills(state => [...state, data]);
  }

  function handleRemoveSkill(skill_id: string) {
    setMySkills(state => state.filter(skill => skill.id !== skill_id));
  }

  useEffect(() => {
    const today = new Date().getHours();

    setGretting(
      today < 12
        ? 'Bom dia'
        : today >= 12 && today <= 18
        ? 'Boa Tarde'
        : 'Boa Noite',
    );
  }, []);

  return (
    <View style={style.container}>
      <StatusBar barStyle={'light-content'} />

      <Text style={style.title}>Bem Vindo</Text>
      <Text style={[style.title, {fontSize: 12, color: '#999'}]}>
        {gretting}
      </Text>

      <TextInput
        style={style.input}
        placeholder="Skill name"
        placeholderTextColor="#666"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill} title="Adicionar nova Skill" />

      <Text style={[style.title, {marginTop: 24}]}>Minhas Skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SkillsBox
            title={item.title}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
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
