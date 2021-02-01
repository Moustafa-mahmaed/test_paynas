import React, { Component } from 'react'
import { Text ,StatusBar,ScrollView, Animated,View ,Button ,Image ,Dimensions ,FlatList ,TouchableWithoutFeedback} from 'react-native'
import {  Navigation } from '../../ui';
import styles from "./styles"
import I18n from 'react-native-i18n';


import Modal from 'react-native-modal';
const {width, height} =Dimensions.get("window")
const illustration = [
  
   
      {id:1 , title:"Apartment & villa",subtitle:"lorem lorem text",source:require("./../../assets/images/villa.jpg")},
      {id:2  , title:"flat & villa",subtitle:"lorem lorem text2 ", source:require("./../../assets/images/flat.jpg")},
      {id:3 , title:" villa Apartment ",subtitle:"lorem lorem text3 ",source:require("./../../assets/images/resort.jpg")},
  
];
 
export default class Intro extends Component {
    scrollX=new Animated.Value(0)
   
    state={
        isLoadingComplete:false,
        isModalVisible: false,
    }
  
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  renderillustations(){
      return(
        
         <FlatList
         horizontal
         scrollEnabled
         showsHorizontalScrollIndicator={false}
         pagingEnabled
         scrollEventThrottle ={16}
         snapToAlignment="center"
           keyExtractor={(item,index)=>`${item.id}`}
        data={illustration}
        renderItem={ ({ item }) => 
          <View style={{flex:1 ,justifyContent:"center"}}>
          <Image source={item.source} resizeMode="contain"
              style={{ width ,height:height/3 , overflow:"visible" ,borderRadius:15}} />
                <View style={styles.headerContainer}>
                
                <Text  style={styles.SecondHeader}>{item.title}</Text>
                <Text style={styles.PrimaryHeader}>{item.subtitle}</Text>
                </View>
                
                </View>
         }
        keyExtractor={item => item.id}
       onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
     { useNativeDriver: false }
  )}
      />
    
       )

  }

  renderstep =()=>{
      const stepPosition=Animated.divide(this.scrollX,width )
 return(
     <View style={{flexDirection: 'row', alignItems:"center"  ,justifyContent:"center" }}>
          {illustration.map((item,index)=>{
              const opacity= stepPosition.interpolate({
                  inputRange:[index -1 ,index  ,index],
                  outputRange:[ .4 ,1 ,.4],
                  extrapolate:'clamp'

              })
              return (
                  <Animated.View 
                   key={`step-${index}`} 
                   style={[ {opacity} ,{  backgroundColor:"red" , width:5 ,height:5 ,
                    borderRadius:5, marginHorizontal:2.5 , marginVertical:2.5}]}>
                  
                  </Animated.View>
              )
          })
          }
     </View>
      )
  }
    render() {

     
        return (

            <View style={styles.root}> 
                <View style={{flex:2 }}>
                {this.renderillustations()}
                {this.renderstep()}
                </View>
                <View style={styles.headerContainer}>
                <TouchableWithoutFeedback onPress={() => Navigation.push('Login')}>
                <View style={{width:"90%" ,backgroundColor:"#fff" 
                 ,borderRadius:20 ,
                height:50
                 ,alignItems: 'center',justifyContent: 'center',}}>
                    <Text style={{textAlign:"center",fontSize:20 ,color:"#FB5C3E"}}> {I18n.t('login')} </Text>
                </View>
                
                </TouchableWithoutFeedback>
                
                </View>


                 <View style={styles.headerContainer}>
                 <TouchableWithoutFeedback onPress={() =>Navigation.push('SignUp')}>
                <View style={{width:"90%" ,
                elevation:4,
                marginBottom:10,
                backgroundColor:"#FB5C3E" ,height:50,   borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10
                  ,alignItems: 'center',justifyContent: 'center',}}>
                    <Text style={{textAlign:"center",fontSize:20 ,color:"#fff"}}>{I18n.t('createNewAccount')}</Text>
                </View>
   
                </TouchableWithoutFeedback>

                </View>
            </View>
        )
    }
}
