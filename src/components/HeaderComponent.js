/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import { AppColor, AppImage } from '../utils';

const HeaderComponent = () => {

    return (
      
      <SafeAreaView style={headerStyles.header}>
        <View style={headerStyles.layout}>
          <Image source={AppImage.back} style={headerStyles.backButton}></Image>
          <Text style={headerStyles.headertext}>Header</Text>
          <Image style={headerStyles.backButton}></Image>
        </View>
    </SafeAreaView>
      
    );
  
};

const headerStyles = StyleSheet.create({
  header: {
    height: '10%',
    backgroundColor: '#6AB04A'
  },
  headertext: {
    fontSize: 23,
    fontWeight: 'bold',
    color: AppColor.black
  },
  layout: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backButton: {
    width: 30,
    height: 30,
    marginStart: 10,
    resizeMode: 'contain',
  }
});

export default HeaderComponent;

