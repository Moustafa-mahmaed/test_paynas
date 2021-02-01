import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation } from '../../ui';
import { Formik } from 'formik';
import { Image as RNImage } from 'react-native'
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { validationSchema } from './validation';
import { API_ENDPOINT } from '../../configs';
import { useSelector } from 'react-redux';


const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);

  const onSubmit = values => {
    setLoading(true)
    Axios
      .post(`${API_ENDPOINT}/api/v1Identity/ForegetPassword`)
      .then(res => {
        console.log("*******************", res.data)
        setLoading(false)
          Navigation.push({ name: 'ForgotPasswordwithcode', passProps: { email: res.data.UserEmail } })
      })
      .catch(error => {
        setLoading(false)
      
        console.log("error ", error)
         console.log("error ", error.response)
        if (!error.response) {
          showError(I18n.t('ui-networkConnectionError'));
          return;
        } else {
          showError(error.error);
        }
      });
  };

  const renderForm = ({ injectFormProps, handleSubmit }) => (
    
     <View stretch ph={1} center mt={10} mh={5} >
      <RNImage source={require('../../assets/images/splash.png')}
        style={{
          height: 150,
          width: 100,
          borderRadius: 20,
        }}

      />
     
      <Input
     
        email
        {...injectFormProps('email')}
        placeholder={I18n.t('enterEmail')}
        
        style={{ marginTop:40 ,borderBottomColor:colors.gray ,borderBottomWidth:.8 
        , borderBottomLeftRadius: 0,
         borderBottomRightRadius: 0,
         marginLeft:10,
         marginRight:10,

         }}
      />

      <Button
        title={I18n.t('send')}
        stretch
       onPress={loading ? null : handleSubmit}
        processing={loading}
        m={10}
        
        color={colors.white}
        backgroundColor={colors.orange}
        borderRadius={20} 
      />
<View row mv={10} >
      
       <Text
        center
        onPress={() =>Navigation.push('Login')}
        color={colors.orange}  
        ph={15}    
      >
      {I18n.t('login')}
      </Text>

       <Text
        center
        onPress={() =>Navigation.push('SignUp')}
        color={colors.orange}   
        ph={15}      
      >
      {I18n.t('signUp')}
      </Text>
</View>


    </View >
  );

  return (
    <Wrapper >
      <ScrollView flex stretch center backgroundColor={colors.white}>
       <Form
          schema={{
            email: '',
          }}
          onSubmit={onSubmit}
          render={renderForm}
          validationSchema={validationSchema}
        />
      </ScrollView>
    </Wrapper>

  );
};

export default ForgetPassword;
