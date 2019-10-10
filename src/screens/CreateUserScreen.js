import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity, ActivityIndicator
} from 'react-native';

import { AppColor, AppImage, AppFonts } from '../utils';
import AppConstants from '../constants/AppConstants';

export default class CreateUserScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            firstName: '',
            lastName: '',
            isUserAdded: false
        }
      }

      validateInputs = () => {

          if (this.state.firstName === ''){
                alert('Please enter your first name')
          } else if (this.state.lastName === ''){
                alert('Please enter your last name')
          } else {
                this.createUser();
          }
      }

      goBack() {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.onRefresh({ isUserAdded: true });
      }

      //Call service to create user
      createUser = () => {

        this.setState({ isLoading: true })

        fetch( AppConstants.apiCreateUser, {
            method: 'POST',
            body: JSON.stringify({
              name: this.state.firstName ,
              job: 'Teacher',
            }),
          })
          .then(response => response.json())
          .then((responseJson)=> {

            console.log(responseJson);
            this.setState({ isLoading: false })
  
            if (responseJson.id !== ''){
                //success
                console.log('Success')
                this.setState({ isUserAdded: true }, () => {

                  //Call goBack() after setState
                  this.goBack()
                })
            } else{ 
                console.log('Failure')
            }
          })
          .catch(error=>console.log(error))
      }
  
      render(){
        return(
          <View style={styles.container}>
              
              <View style={styles.contentContainer}>
                <TextInput 
                    style = {styles.editText}
                    placeholder = "Enter first name"
                    placeholderTextColor= '#2475B0'
                    value={this.state.firstName}
                    onChangeText={text => this.setState({ firstName:  text })}/>

                <TextInput 
                    style = {styles.editText}
                    placeholder = "Enter last name"
                    placeholderTextColor= '#2475B0'
                    value={this.state.lastName}
                    onChangeText={text => this.setState({ lastName: text })}/>

                <TouchableOpacity onPress={this.validateInputs}>
                    <View style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>Create User</Text>
                    </View>
                </TouchableOpacity>
              </View>

              <ActivityIndicator
               animating = {this.state.isLoading}
               color = '#bc2b78'
               size = "large"
               style = {styles.activityIndicator}/>

            
          </View>
        )
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
     },
    contentContainer: {
        width: '90%',
    },
    editText:{
        marginTop: 20,
        borderColor: '#2475B0',
        borderWidth: 2,
        borderRadius: 10,
    },
    buttonStyle: {
        marginTop: 20,
        backgroundColor: '#3498DB',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonTextStyle: {
        color: AppColor.white,
        fontSize: 20
    }
  });