'use strict';
import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { createStackNavigator,createDrawerNavigator, DrawerItems,} from 'react-navigation';
import { Icon } from 'react-native-elements';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import StudentEdit from './components/StudentEdit';
import StudentList from './components/StudentList';
import ProfilePage from './components/ProfilePage';
import StudentAdd from './components/StudentAdd';
import EditUser from './components/EditUser';

//this class is to define the hamburger menu
class HamburgerIcon extends Component {

  toggleDrawer=()=>{
    
    this.props.navigationProps.toggleDrawer();

  }
 
  render() {
 
    return (
 
      <View style={{flexDirection: 'row'}}>
 
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >

          <Image
            source={require('./images/hamburger_icon.png')}
            style={{ width: 25, height: 25, marginLeft: 5}}
          />

        </TouchableOpacity>
 
      </View>
    
    );
  
  
  }
}

//navigation stack for list
const ListStack = createStackNavigator({
      Third: { 
        screen: StudentList,
        header: null,//prevent double header
      },
      Fourth: {screen: StudentEdit},
});


//navigation stack for profile
const ProfileStack = createStackNavigator({
  First: { screen: ProfilePage },
  Second: { screen: EditUser },
});

//make this all into one createStackNavigator because apparently you can only pass parameters this way
export const RootNavigator = createStackNavigator({

  MainRoute: {
    screen: createStackNavigator({
      Login: { screen: LoginPage },
      Register: { screen: RegisterPage },
    }),
    navigationOptions:{header:null},//prevent double header
  },

  DrawerRoute: {
    screen: createDrawerNavigator({
      Profile: { 
        screen: ProfileStack,
        navigationOptions:{
          drawerLabel: 'Profile Page',
          drawerIcon: () => (
            <Icon name="ios-person" type="ionicon" size={28} />//get icon image from react-native-elements library
          )
        }
      },
      Add: { 
        screen: StudentAdd,
        navigationOptions:{
          drawerLabel: 'Add Student',
          drawerIcon: () => (
            <Icon name="ios-add-circle-outline" type="ionicon" size={28} />
          )
        }
      },
      List: { 
        screen: ListStack,
        navigationOptions:{
          drawerLabel: 'List Student',
          drawerIcon: () => (
            <Icon name="list" type="entypo" size={28} />
          )
        }
      },
    }, {
      contentComponent: (props) => (
        <View>
            <DrawerItems{...props}/>
        </View>//to view items inside the drawer
      ),
    }),
    navigationOptions: ({ navigation }) => ({
      title: 'Student Registration App',
      headerLeft : <HamburgerIcon navigationProps={ navigation }/>,
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf:'center',
        flex:1,
        },
      headerStyle: {
        backgroundColor: 'skyblue',
      },
    })
  },
});
