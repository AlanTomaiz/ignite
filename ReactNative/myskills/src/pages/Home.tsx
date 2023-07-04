import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [greeting, setGreeting] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };

    setMySkills(state => [...state, data]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills(state => state.filter(
      raw => raw.id !== id
    ))
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting('Bom dia!');
      return;
    }

    if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Boa Tarde!');
      return;
    }

    setGreeting('Boa Noite!');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Olá, Alanderson
      </Text>

      <Text style={{ color: '#fff' }}>
        {greeting}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button title="Add" onPress={handleAddNewSkill} />

      <Text style={[styles.title, { marginTop: 50, marginBottom: 20 }]}>
        My Skills
      </Text>

      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {mySkills.map(skill => <SkillCard skill={skill} key={skill} />)}
      </ScrollView> */}

      <FlatList
      showsVerticalScrollIndicator={false}
        data={mySkills}
        keyExtractor={raw => raw.id}
        renderItem={({ item }) => (
          <SkillCard
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: 15,
    marginTop: 30,
    borderRadius: 7
  },
});