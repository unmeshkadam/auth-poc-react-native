import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
const backgroundImg = require('../assets/img/app-bg.jpg');

const Header = ({children}) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={backgroundImg}
        resizeMode="cover"
        style={{flex: 1, paddingHorizontal: 20}}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 100,
            paddingTop: 100,
            textAlign: 'center',
            color: '#E5E4E2',
          }}>
          AUTHIZO
        </Text>
        {children}
      </ImageBackground>
    </View>
  );
};

export default Header;
