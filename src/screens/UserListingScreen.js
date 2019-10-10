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
import SplashScreen from 'react-native-splash-screen'

export default class UserListingScreen extends React.Component {

    constructor(props){
      super(props);
      this.renderItem = this.renderItem.bind(this)
      this.state = {
        isLoading: false,
        userListData: [],
        pageNo: 1,
        totalPages: 0
      }
    }

    //component life0cycle method to be caled after render
    //Retrieve user list from here
    componentDidMount(){
      //Hide the splash screen
      SplashScreen.hide();
      
      setTimeout(()=>{ this.retrieveUserList() }, 1000)
      
    }

    //Call api to get users list
    retrieveUserList = () => {
      this.setState({ isLoading: true })

      fetch( AppConstants.apiUsersList+'?page='+ this.state.pageNo + '&per_page=10' )
        .then(response => response.json())
        .then((responseJson)=> {

          console.log(responseJson);

          this.setState({
            isLoading: false,
            totalPages: responseJson.total_pages,
            userListData: responseJson.data
          })
        })
        .catch(error=>console.log(error))
    }

    retrieveUserListAgain = () => {
      this.setState({ isLoading: true })

      this.state.pageNo += 1;

      fetch( AppConstants.apiUsersList+'?page='+ this.state.pageNo + '&per_page=10' )
        .then(response => response.json())
        .then((responseJson)=> {

          console.log(responseJson);

          this.setState({
            isLoading: false,
            userListData: [ ...this.state.userListData , ...responseJson.data]
          })
        })
        .catch(error=>console.log(error))
    }

    onRefresh = data => {

        console.log(data);

        if (data.isUserAdded){
          
          this.setState({
            userListData: [], 
            pageNo: 1
          }, () => {
            setTimeout(()=>{ this.retrieveUserList() }, 1000)
          });
        }
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

          {this.state.isLoading ? 
          <ActivityIndicator
               
               color = '#bc2b78'
               size = "large"
               style = {styles.activityIndicator}/>
            :
          <View style={styles.userlistContainer}>
            <FlatList 
              data = {this.state.userListData}
              keyExtractor={(item, index) => index.toString()}
              extraData = {this.state}
              renderItem={this.renderItem}
              ItemSeparatorComponent = {this.renderFlatListItemSeparator}
              onScroll={(event) => {
                
                const currentOffset = event.nativeEvent.contentOffset.y;
                const dif = currentOffset - (this.offset || 0);

                if (Math.abs(dif) < 3) {
                  console.log('unclear');
                } else if (dif < 0) {
                  console.log('up');
                } else {
                  console.log('down');

                  if (this.state.pageNo < this.state.totalPages) {
                    this.retrieveUserListAgain()
                  }
                }

                  this.offset = currentOffset;
              }}
            />
          </View>
          }
            <TouchableOpacity activeOpacity={0.5} 
              style={styles.userCreateButton} onPress={this.createNewUser}>
              <View elevation={5} style={styles.userButton}>
                <Image source={AppImage.userAdd} style={{ height: 65, width: 65 }} />
              </View>
            </TouchableOpacity>
          

        </View>
      )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
    position: 'absolute',
    height: 60,
    width: 60,
    alignItems: 'center', 
    justifyContent: 'center',
    right: 20,
    bottom: 20
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