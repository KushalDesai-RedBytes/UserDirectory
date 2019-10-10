import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import AppConstants from '../constants/AppConstants';
import { AppColor, AppImage, AppFonts } from '../utils';


export default class UserListingScreen extends React.Component {

    constructor(props){
      super(props);
      this.renderItem = this.renderItem.bind(this)
      this.state = {
        isLoading: false,
        userListData: [],
        pageNo: 1,
      }
    }

    //component life0cycle method to be caled after render
    //Retrieve user list from here
    componentDidMount(){
      this.retrieveUserList();
    }

    retrieveUserList = () => {
      this.setState({ isLoading: true })

      fetch(AppConstants.apiBaseUrl+AppConstants.apiUsersList)
        .then(response => response.json())
        .then((responseJson)=> {

          console.log(responseJson);

          this.setState({
            isLoading: false,
            userListData: responseJson.data
          })
        })
        .catch(error=>console.log(error))
    }

    onRefresh = () => {
      this.setState({ userListData: [], pageNo: 1 }, )
      this.setState({
        userListData: [], 
        pageNo: 1
    }, () => {
        this.afterSetStateFinished();
    });
    };

    //Go to Create User screen
    createNewUser = () => {
      // alert('hello');
      this.props.navigation.navigate('CreateUser', { onRefresh: this.onRefresh });
    }

    //Item Separator
    renderFlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
           backgroundColor:"rgba(0,0,0,0.5)"}}
        />
      );
    }

    //Items to render from response
    renderItem = ({ item, index }) => (
      <View style={styles.itemRowStyle}>
        <View style={ styles.userRowStyle }>
            <Image source={{uri: item.avatar}} style={styles.userImage}></Image>

            <View style={styles.userDetails}>
              <Text style={styles.userName}>{item.first_name} {item.last_name}</Text>
              <Text>{item.email}</Text>
            </View>
        </View>
        
      </View>
    );

    render(){
      return(
        <View style={styles.container}>

          <ActivityIndicator
               animating = {this.state.isLoading}
               color = '#bc2b78'
               size = "large"
               style = {styles.activityIndicator}/>

          <View style={styles.userlistContainer}>
            <FlatList 
              data = {this.state.userListData}
              keyExtractor={(item, index) => index.toString()}
              extraData = {this.state}
              renderItem={this.renderItem}
              ItemSeparatorComponent = {this.renderFlatListItemSeparator}
            />
          </View>

          <View style={styles.userCreateButton}>
            <TouchableOpacity activeOpacity={0.5} onPress={this.createNewUser}>
              <View elevation={5} style={styles.userButton}>
                <Image source={AppImage.userAdd} style={{ height: 50, width: 50 }} />
              </View>
            </TouchableOpacity>
          </View>

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
  itemRowStyle: {
    flex: 1,
    padding: 10
  },
  userlistContainer: {
    width: '100%',
    height: '100%'
  },
  userRowStyle: {
    flexDirection: 'row',
    alignItems:'center'
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  userDetails: {
    marginStart: 10
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 20
  },
  userCreateButton: {
    backgroundColor: 'transparent',
    position: 'absolute',
    height: '95%',
    width: '92%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 16
  },
  userButton: {
    backgroundColor: 'white',
    height: 60,
    width: 60,
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});