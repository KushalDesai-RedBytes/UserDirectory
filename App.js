/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { UserListingScreen, CreateUserScreen } from './src/screens/index';

// const App: () => React$Node = () => {
//   return (
//     <View style={styles.container}>
//       <Text>User Directory</Text>
//     </View>
//   );
// };

const App = createStackNavigator({
  UserListing: {
    screen: UserListingScreen,
    navigationOptions: {
      headerTitle: 'User Directory'
    }
  },
  CreateUser: {
    screen: CreateUserScreen,
    navigationOptions: {
      headerTitle: 'Create User'
    }
  }
})

export default createAppContainer(App);
