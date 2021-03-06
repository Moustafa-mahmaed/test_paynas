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
    
    console.log("*******************", values)

    setLoading(true)
    Axios
      .post(`${API_ENDPOINT}/app/users/reset-password/email`,
      {
        email: values.email,
      })
      .then(res => {
        console.log("*******************", res.data)
        setLoading(false)
          Navigation.push({ name: 'ForgotPasswordwithcode', passProps: { email: values.email } })
      })
      .catch(error => {
        setLoading(false)
      
        console.log("error ", error)
         console.log("error ", error.response)
        if (!error.response) {
           
           showError(I18n.t('ui-networkConnectionError'));
           

          return;
        } else {
          showError("email not valid");
          

        }
      });
  };

  const renderForm = ({ injectFormProps, handleSubmit }) => (
    
     <View stretch ph={1} center mt={10} mh={5} >
      <Text bold color={colors.black} size={13} mv={15}> {I18n.t('resetPassword')} </Text>
     
      <Input
     
        email
        {...injectFormProps('email')}
        placeholder={I18n.t('enterEmail')}
        
        style={{ marginTop:40 ,
         backgroundColor:colors.gray,
         marginLeft:10,
         marginRight:10,

         }}
      />

<Text
        stretch
        // ml={10}
       center
        size={8}
        mt={2}
        onPress={() =>Navigation.push('ForgetPassword')}
        color={colors.lightgray}      
      >
      {"we will  send confirmation code"}
      </Text>
      <Button
        title={I18n.t('sendCode')}
        stretch
       onPress={loading ? null : 
      
         handleSubmit
      }
        processing={loading}
        mt={50}
        ml={10}
        mr={10}
        color={colors.white}   
        borderRadius={10} 
      />

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
