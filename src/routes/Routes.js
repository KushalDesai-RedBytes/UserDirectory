/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import { RedScreen, GreenScreen } from '../screens';


const Routes = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>

          {/* Redscreen */}
          <Scene key="red"
            component={RedScreen}
            title="RED"
            initial
            />

           <Scene key="green"
              component={GreenScreen}
              title="GREEN"
              
              /> 

      </Scene>
    </Router>
  );
};

export default Routes;
