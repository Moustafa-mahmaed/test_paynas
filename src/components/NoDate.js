import React, { Component, useState } from 'react';
import { View, Text, Wrapper, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation } from '../ui';

import { useSelector, useDispatch } from 'react-redux';
import {responsiveWidth ,responsiveHeight} from '../ui/utils/responsiveDimensions';


const NoDate = () => {

 
  const rtl = useSelector(state => state.lang.rtl);

  return (
    <Wrapper >
      <View stretch   center    mh={2}
        style={{
          
          width: responsiveWidth(95),
          height: responsiveWidth(35) ,
          borderRadius: 20,
          overflow: 'hidden',
          borderColor: '#999',
          borderWidth: 0.5,
          backgroundColor: '#e3e3e3',
          elevation: 4, 
          padding: 4,
        
          
            
            
        }}
      >
        

      <Text color={"#000"} m={3}>NO Data </Text>

  
   
   
   

         
      </View>

    </Wrapper>
  );
};

export default NoDate;
