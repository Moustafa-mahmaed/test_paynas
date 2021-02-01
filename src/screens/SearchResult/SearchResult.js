import React, { Component, useState } from 'react';
import { View, Text, Wrapper,ScrollView,Navigation  } from '../../ui';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { useSelector } from 'react-redux';
import CardsList  from "../../components/CardsList";


import styles from './styles'
import Header from '../../components/Header';

 

const SearchResult = (props) => {
 
  console.log("..............props...................")
console.log(props)
  console.log(".................................")
    let {data}=props.data
  
  return (
       <View flex stretch>

          <Header backgroundColor={colors.orange}
           title={I18n.t('searchResult')} 
           tc={"white"} />
     
        <View center flex   style={{ justifyContent:'center' , alignItems: 'center'}}>
            <CardsList 
            data={data}
            
            />
          
        </View> 
      </View>
  );
};

export default React.memo(SearchResult);

 