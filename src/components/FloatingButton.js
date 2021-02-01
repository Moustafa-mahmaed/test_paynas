import React, { Component } from 'react'
import { Text, View, Dimensions,StyleSheet ,Animated, TouchableWithoutFeedback } from 'react-native'
import {  Navigation  } from '../ui';
 import Icon from 'react-native-vector-icons/AntDesign'
  import Icon2 from 'react-native-vector-icons/FontAwesome'
import colors from '../ui/defaults/colors';
import I18n from 'react-native-i18n';

const {height ,width} = Dimensions.get('window');

export default class FloatingButton extends Component {
    animation = new Animated.Value(0)

    toggleMenu = () => {
        const toValue = this.open ? 0 : 1

        Animated.spring(this.animation,{
            toValue,
            friction: 5,
            useNativeDriver: false
        }).start()
        this.open = !this.open;
    };
    showAndHidemenu =()=>{
        this.toggleMenu()
      setTimeout(() =>
      {
          const toValue = 0 ;

        Animated.spring(this.animation,{
            toValue,
            friction: 5,
            useNativeDriver: false
        }).start()
        

      }
      , 5000)
    }

    render() {
        const pinStyle={
                transform:[
                    {scale: this.animation},
                    {
                        translateY:this.animation.interpolate({
                            inputRange:[0,1],
                            outputRange:[0, -80]
                        })
                    }
            ]
        }

        const thumbStyle={
            transform:[
                {scale: this.animation},
                {
                    translateY:this.animation.interpolate({
                        inputRange:[0,1],
                        outputRange:[0, -140]
                    })
                }
        ]
    }

    const heartStyle={
        transform:[
            {scale: this.animation},
            {
                translateY:this.animation.interpolate({
                    inputRange:[0,1],
                    outputRange:[0, -200]
                })
            }
    ]
}


        const rotation = {
            transform :[{
                rotate: this.animation.interpolate({
                    inputRange:[0,1],
                    outputRange:['0deg', '45deg']
                })
            }
            ]
        }

        const opacity = this.animation.interpolate({
            inputRange:[0, 0.5, 1],
            outputRange:[0, 0, 1]
        })
        return (
            <View style={[styles.container, this.props.style]}>
                
              

                <TouchableWithoutFeedback  onPress={() =>Navigation.push('AddRent')}>
                    <Animated.View style={[styles.button, styles.secondary, thumbStyle, opacity]}>
                                                                                                    
                        <Icon2 name="building" size={20} color={colors.orange}  />
                        <Text style={{color:colors.orange, fontWeight:'bold' }}  >{I18n.t('AddRent')} </Text>
                    
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback  onPress={() =>Navigation.push('AddSell')}>
                    <Animated.View style={[styles.button, styles.secondary, pinStyle, opacity]}>
                        <Icon2 name="building-o" size={20} color={colors.orange}   />
                        <Text style={{color:colors.orange, fontWeight:'bold'}}>{I18n.t('AddSell')} </Text>
                 
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                onPress={this.showAndHidemenu}
                >
                    <Animated.View style={[styles.button, styles.menu, rotation]}>
                        <Icon name="plus" size={24} color='white' />
              
                        
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        position:'absolute',
    },
    button:{
         position:'absolute',
         width:60,
        height:60,
        borderRadius: 60/2,
        alignItems:'center',
        justifyContent:'center',
        shadowRadius:10,
        shadowColor:colors.orange,
        shadowOpacity: 0.3,
        shadowOffset:{
            height:10
        }
        },
        menu:{
            backgroundColor:colors.orange,
        },
        secondary:{
            width: 90,
            height: 50,
            borderRadius: 50/2,
            backgroundColor:"white",
            borderWidth:1,
            borderColor:colors.orange,
            flexDirection:"row"
             
        },
    }
)