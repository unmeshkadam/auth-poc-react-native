import {Text, TextInput, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import React, {useState} from 'react';
import Header from './Header';

const Details = ({route, navigation}) => {
  const uid = route.params;
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');

  const saveDetails = async () => {
    try {
      await firestore().collection('users').doc(uid).set({
        name,
        dob,
        gender,
      });
      navigation.navigate('Dashboard', {name});
    } catch (error) {
      console.log('Error saving details', error);
      Alert.alert('Error', error, [
        {
          text: 'OK',
          onPress: () => {
            setConfirm(null);
            setCode('');
          },
        },
      ]);
    }
  };
  return (
    <Header>
      <Text
        style={{
          marginBottom: 20,
          fontSize: 15,
          fontWeight: 500,
          color: '#D3D3D3',
        }}>
        Enter Your Details
      </Text>
      <TextInput
        style={{
          height: 50,
          width: '100%',
          borderColor: '#808080',
          borderWidth: 1,
          marginBottom: 30,
          paddingHorizontal: 10,
          color: '#fff',
          borderRadius: 5,
        }}
        placeholder="Name"
        placeholderTextColor="#fff"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={{
          height: 50,
          width: '100%',
          borderColor: '#808080',
          borderWidth: 1,
          marginBottom: 30,
          paddingHorizontal: 10,
          color: '#fff',
          borderRadius: 5,
        }}
        placeholder="Date of Birth"
        placeholderTextColor="#fff"
        value={dob}
        onChangeText={setDob}
      />
      <TextInput
        style={{
          height: 50,
          width: '100%',
          borderColor: '#808080',
          borderWidth: 1,
          marginBottom: 30,
          paddingHorizontal: 10,
          color: '#fff',
          borderRadius: 5,
        }}
        placeholder="Gender"
        placeholderTextColor="#fff"
        value={gender}
        onChangeText={setGender}
      />
      <TouchableOpacity
        onPress={saveDetails}
        style={{
          backgroundColor: '#c4c2c2',
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
          alignItems: 'center',
        }}>
        <Text style={{color: '#404040', fontSize: 22, fontWeight: 'bold'}}>
          Save Details
        </Text>
      </TouchableOpacity>
    </Header>
  );
};

export default Details;
