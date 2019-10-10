/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';

import { AppColor, AppImage, AppFonts } from '../utils';
import HeaderComponent from '../components/HeaderComponent';

export default class RedScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return (
      <View styles={{flex: 1}}>

        <HeaderComponent />
        
        <View style={ styles.container }>
          <Text style={styles.textStyle}>hello</Text>
          <Image source={AppImage.profilePic} style={styles.profile}></Image>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: '90%',
    width: '100%',
    backgroundColor: AppColor.red,
    justifyContent: 'center',
    alignItems: 'center'
  },
  redScreen: {
    fontSize: 23,
    fontWeight: 'bold',
    color: AppColor.black
  },
  profile: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: 20,
    fontFamily: AppFonts.bold
  }
});

