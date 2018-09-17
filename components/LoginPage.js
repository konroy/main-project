'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
} from 'react-native';
export default class LoginPage extends Component{
    
    static navigationOptions={
        title: 'Student Registration App',
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf:'center',
            flex:1,
        },
        headerStyle: {
            backgroundColor: 'skyblue',
        },
    };

    constructor(props){
        super(props)
        this.state={
            userEmail: '',
            userPassword: '',
        }
    }

    UserLoginFunction=()=>{
        const {userEmail}=this.state;
        const {userPassword}=this.state;

        fetch('http://10.1.10.116/project/userLogin.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userEmail,
                password: userPassword
            })
        }).then((response)=> response.json())
        .then((responseJson) => {
            if(responseJson === 'Data Matched'){
                this.props.navigation.navigate('First', {Email:userEmail})//pass params userEmail to ProfilePage by routing from DrawerRoute
            }
            else{
                Alert.alert(responseJson);
            }
        }).catch((error)=>{
            console.error(error);
        });
    }

    render(){
        return(
            <View style={styles.MainContainer}>
                <Text style={styles.TextComponentStyle}>Log In</Text>
                <TextInput
                    placeholder="Enter Email"
                    onChangeText = {userEmail => this.setState({userEmail})}
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Enter Password"
                    onChangeText = {userPassword => this.setState({userPassword})}
                    style={styles.TextInputStyleClass}
                    secureTextEntry={true}
                />
                <Button
                    title="Login"
                    onPress={this.UserLoginFunction}
                    color="#2196F3"
                />
                <Button
                    title="Register"
                    onPress={()=>this.props.navigation.navigate('Register')}
                    color="#2196F3"
                />
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