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
} from 'react-native';

export default class GreenScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return (
      <View styles={{ flex: 1 }}>
        <SafeAreaView>
          <Text style={styles.greenScreen}>Green Screen</Text>
        </SafeAreaView>
        <View style={styles.container}></View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'green'
  },
  greenScreen: {
    fontSize: 23,
    fontWeight: 'bold',
  }
});

