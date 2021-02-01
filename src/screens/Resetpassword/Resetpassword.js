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

import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';

const Resetpassword = () => {
  const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);

  const onSubmit = values => {
    setLoading(true)
    Axios
      .post(`${API_ENDPOINT}/api/v1Identity/ResetPassword`)
      .then(res => {
        console.log("*******************", res.data)
        setLoading(false)
        Navigation.push({ name: 'Login' })
      })
      .catch(error => {
        setLoading(false)
        console.log("error ", error)
        console.log("error ", error.response)
        if (!error.response) {
          showError(I18n.t('ui-networkConnectionError'));
          return;
        } else {
          showError(error.response.data);
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
          marginBottom:10
        }}

      />
      {/* <Text bold color={colors.gray} size={10} mv={15}>{I18n.t('dalall')}</Text> */}

      
      <Input
        {...injectFormProps('newpassword')}
        placeholder={I18n.t('newpassword')}
        secure
        showSecureEye
      />
     
      <Input
        {...injectFormProps('reenterpassword')}
        placeholder={I18n.t('reenterpassword')}
        secure
        showSecureEye
      />

      <Button
        title={I18n.t('changepassword')}
        stretch
        onPress={loading ? null : handleSubmit}
        // onPress={() => Navigation.push({ name: 'Login' })}
        processing={loading}
        m={10}
        color={colors.white}
        backgroundColor={colors.orange}
        borderRadius={20} 
      />


    </View >
  );

  return (
    <Wrapper >
      
      
      <ScrollView flex stretch center >
        <Form
          schema={{
            newpassword: '',
            reenterpassword: ''
          }}
          onSubmit={onSubmit}
          render={renderForm}
          validationSchema={validationSchema}
        />
      </ScrollView>

    </Wrapper>
  );
};

export default Resetpassword;
