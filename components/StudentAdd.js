'use strict';
import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Alert, 
    TextInput, 
    Button, 
    Text, 
    Platform, 
    TouchableOpacity,  
    ActivityIndicator 
} from 'react-native';

export default class StudentAdd extends Component{
    
    static navigationOptions={
        title: 'Add',
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
            inputStudentName:'',
            inputStudentClass:'',
            inputStudentPhone:'',
            inputStudentEmail:''
        }
    }

    InsertStudentRecordsToServer = () =>{

        fetch('http://10.1.10.116/project/insertStudentData.php', {
            method: 'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.inputStudentName,
                kelas: this.state.inputStudentClass,
                phone: this.state.inputStudentPhone,
                email: this.state.inputStudentEmail
            })
        }).then((response) => response.json()).then((responseJson)=>{
            Alert.alert(responseJson);
            this.props.navigation.navigate('List');
          }).catch((error)=>{
            console.error(error);
          });
    }
    
    render(){
        return(
        <View style={styles.MainContainer}>
 
       <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Student Registration Form </Text>

       <TextInput
         placeholder="Enter Student Name"
         onChangeText={ TextInputValue => this.setState({ inputStudentName : TextInputValue }) }
         style={styles.TextInputStyleClass}
       />

      <TextInput
         placeholder="Enter Student Class"
         onChangeText={ TextInputValue => this.setState({ inputStudentClass : TextInputValue }) }
         style={styles.TextInputStyleClass}
       />
 
      <TextInput
         placeholder="Enter Student Phone Number"
         onChangeText={ TextInputValue => this.setState({ inputStudentPhone : TextInputValue }) }
         style={styles.TextInputStyleClass}
       />
 
       <TextInput
         placeholder="Enter Student Email"
         onChangeText={ TextInputValue => this.setState({ inputStudentEmail : TextInputValue }) }
         style={styles.TextInputStyleClass}
       />
 
      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.InsertStudentRecordsToServer} >
        <Text style={styles.TextStyle}> INSERT STUDENT RECORD TO SERVER </Text>
      </TouchableOpacity>
 
        </View>
        );
    }
}

const styles = StyleSheet.create({
 
    MainContainer :{
   
      alignItems: 'center',
      flex:1,
      paddingTop: 30,
      backgroundColor: '#fff'
   
    },

    TextInputStyleClass: {
 
        textAlign: 'center',
        width: '90%',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        borderColor: '#FF5722',
        borderRadius: 5 ,
       
    },

    TouchableOpacityStyle: {
 
        paddingTop:10,
        paddingBottom:10,
        borderRadius:5,
        marginBottom:7,
        width: '90%',
        backgroundColor: '#00BCD4'
     
      },
     
      TextStyle:{
        color:'#fff',
        textAlign:'center',
      }
})