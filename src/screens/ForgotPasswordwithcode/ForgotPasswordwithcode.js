import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Navigation, moderateScale, responsiveWidth } from '../../ui';
import { Formik } from 'formik';
import { Image } from 'react-native'
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { validationSchema } from './validation';
import { API_ENDPOINT } from '../../configs';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
// import forgetpasswordcode from '../../components/forgetpasswordcode';
import CodeInput from 'react-native-confirmation-code-input';

const ForgotPasswordwithcode = (props) => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const onSubmit = values => {
    console.log("values here")
    console.log(values)
    setLoading(true)
    Axios
      .post(`${API_ENDPOINT}/app/users/reset-password/code`
      , {
        email: values.email,
        code: Number(values.code)
      })
      .then(res => {
      
        console.log("*******************", res)
       
        setLoading(false)
         Navigation.push({ name: 'Resetpassword',passProps: 
         {
            email: values.email, 
          code: values.code

          } })
      })
      .catch(error => {
        setLoading(false)
        console.log("error ", error)
        console.log("error ", error.response)
        if (!error.response) {
          showError(I18n.t('ui-networkConnectionError'));
          return;
        } else {
          showError("Code inCorrect ");
        }
      });
  };

  const renderForm = ({ injectFormProps, handleSubmit ,setFieldValue }) => (
    <View stretch ph={1} center mt={10} mh={5} >
     
     <Text bold color={colors.black} size={13} mv={15}>{I18n.t('resetPassword')} </Text>

     <Image  source={require('../../assets/images/filled_line.png')} 
      style={{width: responsiveWidth(30),
        height: responsiveWidth(20) , borderRadius:10}}/>

     <Text
        center
        ml={7}
        mt={7}
       center
        size={8}
        onPress={() =>Navigation.push('ForgetPassword')}
        color={colors.lightgray}      
      >
      {"We've sent a code to"}
      </Text>
      <Text
        stretch
        ml={10}
        mt={3}
       center
        size={6}
        color={colors.black}      
      >
        {`${props.email}`}
      

      </Text>
      <CodeInput
        keyboardType="decimal-pad"
        activeColor={colors.textgray}
        inactiveColor={colors.textgray}
        // ref="codeInputRef1"
        codeLength={5}
        // secureTextEntry
        containerStyle={{ alignSelf: 'center' }}
        codeInputStyle={{
          color:'black',
          backgroundColor: colors.white,
          marginHorizontal: moderateScale(6), borderWidth: 2, borderRadius: 10
        }}
        className={'border-box'}
        size={responsiveWidth(13)}
        inputPosition='left'
        onFulfill={(code) => {
          setCode(code)
          setFieldValue('code', code)
          setFieldValue('email', props.email)
        }}
      />
        {/* {...injectFormProps('code')} */}
      <Button
        title={I18n.t('changepassword')}
        stretch
        onPress={loading ? null : handleSubmit}
        // onPress={() =>Navigation.push('Resetpassword')}

         color={colors.white}
        backgroundColor={colors.primary}
        processing={loading}
        borderRadius={20} 
        mv={20}
       
      />

    </View >
  );
console.log(";;;;;;;;;;;;;")
console.log(props)
console.log(";;;;;;;;;;;;;")

  return (
    <Wrapper >
      
      <ScrollView flex stretch center >
        
        <Form
          schema={{
            code: '',
          }}
          onSubmit={onSubmit}
          render={renderForm}
         validationSchema={validationSchema}
        />
      </ScrollView>

    </Wrapper>
  );
};

export default ForgotPasswordwithcode;
