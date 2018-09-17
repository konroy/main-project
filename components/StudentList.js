'use strict';
import React, {Component} from 'react';
import { 
  StyleSheet, 
  ActivityIndicator, 
  ListView, 
  Text, 
  View, 
  Platform, 
  RefreshControl, 
  TextInput 
} from 'react-native';

export default class StudentList extends Component {
  
  static navigationOptions={
    header: null,
  };
  
  constructor(props) {
    super(props);
    this.state = {

      isLoading: true,
      refreshing: false,
      text: '',//for search
  
    }
    this.componentDidMount();
    this.arrayholder = [];//for search
  }
   
  componentDidMount(){
  
    return fetch('http://10.1.10.116/project/studentList.php')
    .then((response) => response.json())
    .then((responseJson) => {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(responseJson),
      }, 
      function() {
        // In this block you can do something with new state.
        this.arrayholder = responseJson;
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  onRefresh() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({dataSource : ds.cloneWithRows([ ])})
    this.componentDidMount();
  }

  SearchFilterFunction(text){
    const newData = this.arrayholder.filter(function(item){
      const itemData = item.studName.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      text: text
    })
  }

  GetStudentIDFunction=(studID,studName, studClass, studPhone, studEmail)=>{
    this.props.navigation.navigate('Fourth', { 
      ID : studID,
      NAME : studName,
      CLASS : studClass,
      PHONE : studPhone,
      EMAIL : studEmail,
    });
    this.setState({
      isLoading: true,
    })
    this.componentDidMount();
  }
  
    ListViewItemSeparator = () => {
      return (
        <View
          style={{
            height: .5,
            width: "100%",
            backgroundColor: "#000",
          }}
        />
      );
    }
  
    render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
   
      return (
   
        <View style={styles.MainContainer}>
          <TextInput
          style={styles.TextInputStyleClass}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid='transparent'
          placeholder="Search Here"
          />
          <ListView
   
            dataSource={this.state.dataSource}
   
            renderSeparator= {this.ListViewItemSeparator}
  
            enableEmptySections = {true}
   
            renderRow={ (rowData) => <Text style={styles.rowViewContainer} 
 
              onPress={this.GetStudentIDFunction.bind(
                this, rowData.studID,
                rowData.studName, 
                rowData.studClass, 
                rowData.studPhone, 
                rowData.studEmail,
                )} > 
 
              {rowData.studName} 
                      
            </Text> }

            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
              }
  
          />
   
        </View>
      );
    }
  }
   
  const styles = StyleSheet.create({
   
  MainContainer :{
  flex:1,
  paddingTop: (Platform.OS == 'ios') ? 20:0,
  marginLeft: 5,
  marginRight: 5
   
  },
   
  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },

  TextInputStyleClass:{
        
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 10 ,
    backgroundColor : "#FFFFFF"
         
  },
   
  });
