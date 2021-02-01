import React, { Component } from 'react';
import { View, Text, Wrapper, Icon, ScrollView } from '../../ui';
import {Linking ,StyleSheet ,Dimensions} from 'react-native'
import Header from '../../components/Header';
import colors from '../../ui/defaults/colors';
import I18n from 'react-native-i18n';
import { useSelector } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 
var { width, height } = Dimensions.get('window')

const AboutUs1 = () => {
  const rtl = useSelector(state => state.lang.rtl);

    return (
     <Wrapper  >
     <Header  backgroundColor={colors.orange} title={I18n.t('aboutUs')} tc={"white"} fontSize={40}/>
     <MapView
        style={ styles.map }
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />


             
       
             
               
    
        </Wrapper>
    );
};

export default AboutUs1;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
   flex:1
  },
});