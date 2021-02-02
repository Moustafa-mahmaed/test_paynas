import React, { Component, useState } from 'react';
import { View, Text, Wrapper, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation } from '../../ui';
import { Formik } from 'formik';
import { Image as RNImage } from 'react-native'
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { validationSchema } from './validation';
import { API_ENDPOINT } from '../../configs';
import { useSelector, useDispatch } from 'react-redux';
import { UserData } from '../../actions/authActions';

const Login = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);

  const onSubmit = values => {
    setLoading(true)
    Axios
      .post(`${API_ENDPOINT}/app/users/login` , {
    email: values.email,
    password: values.password
  })
      .then(res => {
        console.log("*******************", res.data)
        dispatch(UserData(res.data, true));
        setLoading(false)
        Navigation.init('MAIN_STACK', {
          rtl: rtl,
          sideMenu: 'SideMenu',
          name: 'Home',
        });
      })
      .catch(error => {
        setLoading(false)
        console.log("error ", error)
        console.log("error ", error.response)
        if (!error.response) {
          showError(I18n.t('ui-networkConnectionError'));
          return;
        } else {
          showError("invalid email");
        }
      });
  };

  const renderForm = ({ injectFormProps, handleSubmit }) => (
    <View stretch ph={1} center mt={10} mh={5} >
    <Text stretch bold color={colors.black} size={14} mv={15}>{I18n.t('login')}</Text>
      <Input
       style={{ marginTop:20 ,borderColor:colors.gray ,borderWidth:.8 
        , borderRadius: 10,
        backgroundColor:colors.gray,
          marginLeft:10,
         marginRight:10,
         
         }}
        email
        {...injectFormProps('email')}
        placeholder={I18n.t('email')}
        leftItems={
          <Icon
            name="user"
            type={'EvilIcons'}
            size={12}
            pl={5}
            color={colors.black}
          />
        }
      />
      <Input

        leftItems={
          <Icon
            name="lock"
            type={'EvilIcons'}
            size={12}
            pl={5}
            color={colors.black}
          />
        }
        {...injectFormProps('password')}
        placeholder={I18n.t('password')}
        secure
        showSecureEye
         style={{ marginTop:10 
        ,backgroundColor:colors.gray,
          marginLeft:10,
         marginRight:10,
         }}
      />
        <Text
        stretch
        ml={10}
       
        size={6}
        onPress={() =>Navigation.push('ForgetPassword')}
        color={colors.lightgray}      
      >
      {I18n.t('forgetPassword')}
      </Text>

      <Button
        title={I18n.t('login')}
        stretch
         onPress={loading ? null : handleSubmit}
        processing={loading}
        m={10}
        color={colors.white}
        backgroundColor={colors.primary}
        borderRadius={20} 
        
      />

    
     
     
    </View >
  );


  return (
    <Wrapper >
      <ScrollView flex stretch center backgroundColor={colors.white}>
        <Form
          schema={{
            email: '',
            password: '',
          }}
          onSubmit={onSubmit}
          render={renderForm}
          validationSchema={validationSchema}
        />
      </ScrollView>
    </Wrapper>
  );
};

export default Login;
