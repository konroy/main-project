'use strict';
import React, {Component} from 'react';
import { 
  StyleSheet, 
  TextInput, 
  View, 
  Alert, 
  Button,
  ScrollView
 } from 'react-native';

export default class RegisterPage extends Component{
    
    static navigationOptions={
        title: 'Register Page',
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
    
        this.state = {
          TextInputName : '',
          TextInputEmail: '',
          TextInputPass: '',
          checkInputPass: ''
        }
      }
    
      InsertDataToServer = () => {
        const {TextInputName} = this.state;
        const {TextInputEmail} = this.state;
        const {TextInputPass} = this.state;
        const {checkInputPass} = this.state;
        
        //check passwords sama ke tak?
        if( checkInputPass === TextInputPass ){
        fetch ('http://10.1.10.116/project/userRegistration.php',{
          method: 'POST',
          headers:{
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          name: TextInputName,
          email: TextInputEmail,
          pass: TextInputPass
          })
        }).then((response) => response.json()).then((responseJson)=>{
          Alert.alert(responseJson);
        }).catch((error)=>{
          console.error(error);
        });
      }
      else{
        Alert.alert('Not matching passwords.')
      }
    }
    
      render(){
        return(
          <ScrollView>
            <View style={styles.MainContainer} title= 'Register'>
              <TextInput
                placeholder="Enter Name"
                onChangeText={TextInputName => this.setState({TextInputName})}
                style={styles.TextInputStyleClass}
              />
              <TextInput
                placeholder="Enter Email"
                onChangeText={TextInputEmail => this.setState({TextInputEmail})}
                style={styles.TextInputStyleClass}
              />
              <TextInput 
                placeholder="Enter Password"
                onChangeText={TextInputPass => this.setState({TextInputPass})}
                style={styles.TextInputStyleClass}
                secureTextEntry={true}
              />
              <TextInput 
                placeholder="Confirm Password"
                onChangeText={checkInputPass => this.setState({checkInputPass})}
                style={styles.TextInputStyleClass}
                secureTextEntry={true}
              />
              <Button 
                title="REGISTER" onPress={this.InsertDataToServer} 
                color="#2196F3" 
              />
            </View>
          </ScrollView>
        );
      }
}

const styles = StyleSheet.create({
    MainContainer: {
      justifyContent: 'center',
      flex: 1,
      margin: 10
    },
  
    TextInputStyleClass: {
      textAlign: 'center',
      marginBottom: 7,
      height: 40,
      borderWidth: 1,
      borderColor: '#FF5722',
      borderRadius: 10
    },
   
  });