import React, { Component, useState ,useEffect} from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, Picker } from '../../ui';
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { API_ENDPOINT } from '../../configs';
import { useSelector } from 'react-redux';
import CardsList  from "../../components/CardsList";

import { Image as RNImage  ,ActivityIndicator } from 'react-native'
import styles from './styles'
import Header from '../../components/Header';

 

const MyAds = (props) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(false);
  
  
  const user = useSelector(state => state.auth.user);
  const rtl = useSelector(state => state.lang.rtl);
  let [data, setData]  =useState([]);

   
useEffect(() => {
  setLoading(true)
  Axios
     .get(`${API_ENDPOINT}/api/Offer/GetAllOfferByUserId?pageNumber=1&pageSize=10` ,
     
    
   {
 headers: {
   'Authorization': `Bearer ${user.data.token}` ,
   'Content-Type' :'application/json'
 }
}
)
     .then(res => {
       setList(res.data.data)
       console.log(res.data.data);
       setLoading(false)
       console.log("Done");
     

     })
     .catch(error => {
       setLoading(false)
       console.log("error ", error)
       console.log("error ", error.response)
       if (!error.response) {
         showError(I18n.t('ui-networkConnectionError'));
         return;
       } else {
         showError(error.response.data.errors);
       }
     });
   
 
 
}, [])
  


  
    
  return (
   
        <ScrollView  stretch backgroundColor={colors.white}>
          <Header backgroundColor={colors.orange} 
          title={I18n.t('MyAds')} tc={"white"} />

          
 {loading && (
          <ActivityIndicator
            size='small'
            color={colors.black}
            style={{flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20}}
          />
        )}
<CardsList 
            data={list.data}
            // handleLoadMore={this.handleLoadMore}
            // loadingMore={loadingMore}
/>



          
         

       
      </ScrollView>
  );
};

export default React.memo(MyAds);

 