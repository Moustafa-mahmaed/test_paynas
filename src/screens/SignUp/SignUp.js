import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, DatePicker, Picker } from '../../ui';
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { validationSchema } from './validation';
import { API_ENDPOINT } from '../../configs';
import { useSelector, useDispatch } from 'react-redux';
import { UserData } from '../../actions/authActions';

import { Image as RNImage } from 'react-native'
import styles from './styles'



const SignUp = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [countryId, setCountryId] = useState('');
  const [cityId, setCityId] = useState('');
  
  const rtl = useSelector(state => state.lang.rtl);

  
  const onSubmit = values => {
    console.log(values);
     setLoading(true)
    Axios
      .post(`${API_ENDPOINT}/api/v1/Identity/Register` , {
    userName:values.userName,
    email: values.email,
    password: values.password,
    confirmPassword:values.confirmPassword,
    phoneNumber:values.phoneNumber,
    tblCountriesId:values.tblCountriesId,
    tblCitiesId:values.tblCitiesId

  })
       .then(res => {
        console.log("*******************", res.data)
        dispatch(UserData(res.data, true));
        setLoading(false)
        Navigation.push('Login');
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
  };


  


  const renderForm = ({ injectFormProps,setFieldValue, handleSubmit,errors }) => (
       <View stretch ph={1} center mt={10} mh={5} >
      <RNImage source={require('../../assets/images/splash.png')}
        style={{
          height: 150,
          width: 100,
          borderRadius: 20,
        }}

      />
      {/* <Text bold color={colors.gray} size={10} mv={15}>{I18n.t('dalall')}</Text> */}
       
      <Input 
      style={styles.inputStyle}   
        {...injectFormProps('userName')}
        placeholder={I18n.t('userName')}
      />
       <Input
      style={styles.inputStyle}  
        {...injectFormProps('email')}
        placeholder={I18n.t('email')}
      />
      <Input
      style={styles.inputStyle}   
        {...injectFormProps('phoneNumber')}
        placeholder={I18n.t('phoneNumber')}
        phone
      />
       <Input
       secure
        showSecureEye
      style={styles.inputStyle}   
        {...injectFormProps('password')}
        placeholder={I18n.t('password')}
      />
       <Input
       secure
        showSecureEye
      style={[styles.inputStyle, {marginBottom:5}]}   
        {...injectFormProps('confirmPassword')}
        placeholder={I18n.t('confirmPassword')}
      />


      <View flex stretch row spaceBetween>
        <View stretch flex={0.48} >
         <Picker
          
              // {...injectFormProps('CountryID')}
            placeholder={I18n.t('country')}
            showSearchFilter
              onChange={(value, ) => { 
                setCountryId(value)
                setFieldValue('tblCountriesId', value)
               setCityId("")
                }
               }
            apiRequest={{
              url: `${API_ENDPOINT}/api/Offer/GetAllCountries`,
              params: {},
              responseResolver: response => {
              
                return {
                   data: response.data.data,
                };
              },
              transformData: item => ({
                label: rtl ?
              item.arabicCountryName : item.englishCountryName,
                value:item.id, 
              }),
            }
            }
          />
           {errors.tblCountriesId && <Text size={5.5} mb={5} color={colors.error}>{` ${I18n.t('country')} ${I18n.t('required1')}`}</Text>}
           
        </View>
 {countryId !=="" ?
         <View stretch flex={0.48}>
           <Picker
              // {...injectFormProps('CityID')}
            placeholder={I18n.t('city')}
            showSearchFilter
            onChange={(value ) => {
              
              setFieldValue('tblCitiesId', value) 
              setCityId(value) 
            
            console.log(value);
            }}
            apiRequest={{
              url: `${API_ENDPOINT}/api/Offer/GetAllCities`,
              params: {id:countryId},
              responseResolver: response => {
               
                return {
                  data: response.data.data,
                };
              },
              transformData: item => ({
                label: rtl ? item.arabicCityName : item.englishCityName,
                value: item.id,
              }),
            }}
          />
           {errors.tblCitiesId && <Text size={5.5} mb={5} color={colors.error}>{` ${I18n.t('city')} ${I18n.t('required1')}`}</Text>}

        </View>
        :null
 }
      
      </View>
      

       
       <Button
        title={I18n.t('signUp')}
        stretch
        onPress={loading ? null : handleSubmit}
        processing={loading}
        mt={10}
        mh={10}
        color={colors.white}
        backgroundColor={colors.orange}
        borderRadius={20} 
        
      />

    <Text
        center
        onPress={() =>Navigation.push('TermsAndCondition')}
        color={colors.orange}  
        size={7} 
        mt={2}
           
      >
      {I18n.t('TermsAndCondition')}
      </Text>

      <Text
        center
        onPress={() =>Navigation.push('Login')}
        color={colors.orange}  
        // mv={1}
        size={8} 

       >
      {I18n.t('login')}
      </Text>
      
    </View >
   
    
   
  );

  return (
    <Wrapper >
        <ScrollView flex stretch center backgroundColor={colors.white}>
        <Form
          schema={{
            userName: '',
            email:'',
             phoneNumber: '',
            password: '',
            confirmPassword: '',
            tblCountriesId:'',
            tblCitiesId:''
           }}
          onSubmit={onSubmit}
          render={renderForm}
          validationSchema={validationSchema}
        />
      </ScrollView>

    </Wrapper>
  );
};

export default SignUp;
