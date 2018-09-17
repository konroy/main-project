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

export default class StudentEdit extends Component{
    
    constructor(props){
        super(props)
        this.state={
            inputID:'',
            inputName:'',
            inputClass:'',
            inputPhone:'',
            inputEmail:'',
        }
    }

    componentDidMount(){
        this.setState({
            inputID: this.props.navigation.state.params.ID,
            inputName: this.props.navigation.state.params.NAME,
            inputClass: this.props.navigation.state.params.CLASS,
            inputPhone: this.props.navigation.state.params.PHONE,
            inputEmail: this.props.navigation.state.params.EMAIL,
        })
    }

    static navigationOptions={
        title: 'Edit Student',
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf:'center',
            flex:1,
        },
        headerStyle: {
            backgroundColor: 'skyblue',
        },
    };

    UpdateStudentRecord =()=>{
        fetch('http://10.1.10.116/project/studentUpdate.php', {
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                id: this.state.inputID,
                name: this.state.inputName,
                kelas: this.state.inputClass,
                phone: this.state.inputPhone,
                email: this.state.inputEmail
            })
        }).then((response)=> response.json())
        .then((responseJson)=>{
            Alert.alert(responseJson);
            this.props.navigation.navigate('Third');
        }).catch((error)=>{
            console.error(error);
        });
        
    }

    DeleteStudentRecord = () =>{
        fetch('http://10.1.10.116/project/studentDelete.php',{
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                id: this.state.inputID
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            Alert.alert(responseJson);
            this.props.navigation.navigate('Third');
        }).catch((error)=>{
            console.error(error);
        });
        
    }

    render(){
        return(
            <View style={styles.MainContainer}>
                <Text style={{fontSize: 20, textAlign: 'center', marginBottom:7}}>Edit Student Record Form </Text>
                <TextInput
                    placeholder="Student Name"
                    value={this.state.inputName}
                    onChangeText={
                        TextInputValue => this.setState({
                            inputName:TextInputValue
                        })
                    }
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Student Class"
                    value={this.state.inputClass}
                    onChangeText={
                        TextInputValue => this.setState({
                            inputClass:TextInputValue
                        })
                    }
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Student Phone"
                    value={this.state.inputPhone}
                    onChangeText={
                        TextInputValue => this.setState({
                            inputPhone:TextInputValue
                        })
                    }
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Student Email"
                    value={this.state.inputEmail}
                    onChangeText={
                        TextInputValue => this.setState({
                            inputEmail:TextInputValue
                        })
                    }
                    style={styles.TextInputStyleClass}
                />

                <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdateStudentRecord} >
   
                    <Text style={styles.TextStyle}> UPDATE STUDENT RECORD </Text>

                </TouchableOpacity>

                <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.DeleteStudentRecord} >

                     <Text style={styles.TextStyle}> DELETE CURRENT RECORD </Text>

                </TouchableOpacity>

                
            </View>
        )
    }
}

const styles = StyleSheet.create({

    MainContainer :{
  
      alignItems: 'center',
      flex:1,
      paddingTop: 30,
      backgroundColor: '#fff'
  
    },
  
    MainContainer_For_Show_StudentList_Activity :{
      
      flex:1,
      paddingTop: (Platform.OS == 'ios') ? 20 : 0,
      marginLeft: 5,
      marginRight: 5
      
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
    },
  
    rowViewContainer: {
      fontSize: 20,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
    }
  
  });