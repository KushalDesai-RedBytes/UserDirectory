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

import { AppColor } from '../utils';
import AppConstants from '../constants/AppConstants';
import ActivityIndicatorExample from '../components/ActivityIndicatorExample';

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

        let params = JSON.stringify({
          name: this.state.firstName ,
        })

        fetch( AppConstants.apiCreateUser, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }, 
            body: params
          })
          .then(response => response.json())
          .then((responseJson)=> {

            console.log(responseJson);
            console.log("JSON:"+JSON.stringify(responseJson));
            alert("JSON:"+JSON.stringify(responseJson));
            this.setState({ isLoading: false })
  
            if (responseJson.name !== ''){
                //success
                console.log('Success '+responseJson.name)
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
                    returnKeyType = { "next" }
                    value={this.state.firstName}
                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    blurOnSubmit={false}
                    onChangeText={text => this.setState({ firstName:  text })}/>

                <TextInput 
                    style = {styles.editText}
                    ref={(input) => { this.secondTextInput = input; }}
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

              {this.state.isLoading ? <ActivityIndicatorExample /> : null }
              

          </View>
        )
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
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