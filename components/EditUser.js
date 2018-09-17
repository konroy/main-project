'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';

export default class EditUser extends Component{
    
    constructor(props){
        super(props)
        this.state={
            inputID:'',
            inputUserName:'',
        }
    }

    componentDidMount(){
        this.setState({
            inputID: this.props.navigation.state.params.ID,
            inputUserName: this.props.navigation.state.params.USERNAME,
        })
    }

    static navigationOptions={
        title: 'Edit Profile',
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf:'center',
            flex:1,
        },
        headerStyle: {
            backgroundColor: 'skyblue',
        },
    };

    UpdateProfile =()=>{
        fetch('http://10.1.10.116/project/userEdit.php', {
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                id: this.state.inputID,
                name: this.state.inputUserName,
            })
        }).then((response)=> response.json())
        .then((responseJson)=>{
            Alert.alert(responseJson);
            this.props.navigation.navigate('First');
        }).catch((error)=>{
            console.error(error);
        });
        
    }

    render(){
        return(
            <View style={styles.MainContainer}>
                <Text style={{fontSize: 20, textAlign: 'center', marginBottom:7}}>Edit Profile </Text>
                <Text style={{fontSize: 10, textAlign: 'center', marginBottom:7}}>Username </Text>
                <TextInput
                    placeholder="Username"
                    value={this.state.inputUserName}
                    onChangeText={
                        TextInputValue => this.setState({
                            inputUserName:TextInputValue
                        })
                    }
                    style={styles.TextInputStyleClass}
                />

                <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdateProfile} >
   
                    <Text style={styles.TextStyle}> UPDATE PROFILE </Text>

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
  
  });
