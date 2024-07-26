import {Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(null);
  const navigation = useNavigation();

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (err) {
      console.log('Error sending code!', err);
      Alert.alert('Error', err, [
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

  const confirmCode = async () => {
    try {
      const userCredential = await confirm.confirm(code);
      const user = userCredential.user;
      const userDocument = await firestore()
        .collection('users')
        .doc(user.uid)
        .get();
      console.log('userdocument', userDocument);
      if (userDocument.exists) {
        navigation.navigate('Dashboard', {name: userDocument._data.name});
      } else {
        navigation.navigate('Details', user.uid);
      }
    } catch (err) {
      console.log('Invalid code!', err);
      Alert.alert('Error', err, [
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
      {!confirm ? (
        <>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 15,
              fontWeight: 500,
              color: '#D3D3D3',
            }}>
            Please Enter your Phone Number
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
            placeholder="eg. +91 9989876765"
            placeholderTextColor="#fff"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#c4c2c2',
              padding: 10,
              borderRadius: 5,
              marginBottom: 20,
              alignItems: 'center',
            }}
            onPress={signInWithPhoneNumber}>
            <Text style={{color: '#404040', fontSize: 22, fontWeight: 'bold'}}>
              Submit
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 15,
              fontWeight: 500,
              color: '#D3D3D3',
            }}>
            Enter the code sent to your phone
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
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity
            onPress={confirmCode}
            style={{
              backgroundColor: '#c4c2c2',
              padding: 10,
              borderRadius: 5,
              marginBottom: 20,
              alignItems: 'center',
            }}>
            <Text style={{color: '#404040', fontSize: 22, fontWeight: 'bold'}}>
              Confirm code
            </Text>
          </TouchableOpacity>
        </>
      )}
    </Header>
  );
};

export default Login;
