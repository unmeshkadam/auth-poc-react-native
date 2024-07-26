import {Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';

const Dashboard = ({route}) => {
  const {name} = route.params;
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth().signOut();

      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      console.log('Error during Logout!', error);
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
          fontSize: 30,
          fontWeight: 500,
          color: '#D3D3D3',
        }}>
        Welcome to Dashboard
      </Text>
      <Text
        style={{
          marginBottom: 50,
          fontSize: 30,
          fontWeight: 500,
          color: '#e38914',
        }}>
        {name}!
      </Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#c4c2c2',
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
          alignItems: 'center',
        }}>
        <Text style={{color: '#404040', fontSize: 22, fontWeight: 'bold'}}>
          Logout
        </Text>
      </TouchableOpacity>
    </Header>
  );
};

export default Dashboard;
