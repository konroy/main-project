'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

export default class ProfilePage extends Component{
    
    constructor(props){
        super(props);
        this.state={
            isLoading: true,//for loading 
            id: null,
            email: '',
            user: '',
        }
        this.componentDidMount();
    }

    componentDidMount(){
        return fetch('http://10.1.10.116/project/profilePage.php', {
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                email: this.props.navigation.state.params.Email,
            })
        }).then((response)=> response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                email: this.props.navigation.state.params.Email,
                id: responseJson.userID,
                user: responseJson.userName.toString(),//get string of userName from JSON object
            }, function() {
              // In this block you can do something with new state.
            });
          })
        .catch((error)=>{
            console.error(error);
        });
    }

    static navigationOptions={
        title: 'Profile',
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf:'center',
            flex:1,
        },
        headerStyle: {
            backgroundColor: 'skyblue',
        },
    };

    render(){
        if (this.state.isLoading) {
            return (
              <View style={styles.MainContainer}>
                <ActivityIndicator />
              </View>
            );
          }//for loading

        return(
         <View style = { styles.MainContainer }>
            <Text style = {styles.TextComponentStyle}>Email: {this.state.email}</Text>
            <Text style = {styles.TextComponentStyle}>Username: {this.state.user}</Text>
            <Button title="Edit Profile" onPress={ () => this.props.navigation.navigate('Second', {
                ID: this.state.id,
                USERNAME: this.state.user,
            })} />
            <Button title="Log Out" onPress={ () => this.props.navigation.navigate('Login')} />
         </View>
      );
    }
}

const styles = StyleSheet.create({
 
    MainContainer :{
     
        justifyContent: 'center',
        flex:1,
        margin: 10,
    },
     
    TextInputStyleClass: {
     
        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        borderColor: '#2196F3',
        borderRadius: 5 ,
    },
    
     TextComponentStyle: {
        fontSize: 20,
        color: "#000",
        textAlign: 'center', 
        marginBottom: 15
     }
    });
