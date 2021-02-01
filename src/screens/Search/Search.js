import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, Picker } from '../../ui';
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { validationSchema } from './validation';
import { API_ENDPOINT } from '../../configs';
import { useSelector, useDispatch } from 'react-redux';

import { Image as RNImage } from 'react-native'
import styles from './styles'
import Header from '../../components/Header';

 

const Search = (props) => {
  const [loading, setLoading] = useState(false);
  const [cityId, setCityId] = useState('');
  const [countryId, setCountryId] = useState('');
  const user = useSelector(state => state.auth.user);

  
  const rtl = useSelector(state => state.lang.rtl);
  let [data, setData]  =useState([]);

   
  const onSubmit = values => {
      setLoading(true)
      console.log(values);
      var data= JSON.stringify({
        ...values
    })
 Axios
     .post(`${API_ENDPOINT}/api/Offer/FilterOffer` ,
    
      JSON.stringify({
        ...values   
        })
 ,
   {
 headers: {
   'Authorization': `Bearer ${user.data.token}` ,
   'Content-Type' :'application/json'
 }
}
)
     .then(res => {
       
      console.log(res.data);
       setLoading(false)
       console.log("Done");
      Navigation.push({name:'SearchResult',
      passProps: { data: res.data.data }
    
    })

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


  


  const renderForm = ({ injectFormProps, handleSubmit, setFieldValue, errors }) => (
     <View stretch  mh={5} >
      <View  stretch  mt={7}>
     <Picker
        placeholder={I18n.t('typeBuilding')}
        showSearchFilter
         onChange={(value ) => {  
         setFieldValue('realEstateTypeID', value)
        }}
        apiRequest={{
          url: `${API_ENDPOINT}/api/Offer/GetAllRealEstateType`,
          params: {},
          responseResolver: response => {
            return {
               data: response.data.data,
            };
          },
          transformData: item => ({
            label: rtl ?
          item.realEstateTypeNameAr : item.realEstateTypeNameEn,
            value:item.id, 
          }
          ),
        }}
      />
  {/* {errors.typeBuilding && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('typeBuilding')}  ${I18n.t('required')}`}</Text>} */}

          </View>
    
<View stretch row spaceBetween mt={5} >

<View   stretch    >
<Text  style={styles.spaceText}>{I18n.t('rentOrSell')}</Text> 
<View stretch width={40}    >

        <Picker
            placeholder={I18n.t('rentOrSell')}
            placeholderColor={colors.gray}
            color={colors.gray} 
            
            onChange={(value ) => { 
             setFieldValue('advertisementID', value)               
              }}
              apiRequest={{
                url: `${API_ENDPOINT}/api/Offer/GetAllAdvertisements`,
                params: {},
                responseResolver: response => {
               
                  return {
                     data: response.data.data,
                  };
                },
                transformData: item => ({
                  label: rtl ?
                item.advertisementNameAr : item.advertisementNameEn,
                  value:item.id, 
                }
                ),
              }}
          />
{/* {errors.rentOrSell && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('rentOrSell')}  ${I18n.t('required')}`}</Text>} */}

</View>

 
</View>

<View  width={40}  >
<Text  style={styles.spaceText}>{I18n.t('area')}</Text> 
<Input  
      placeholder={I18n.t('area')}
      //  {...injectFormProps('space')}
      placeholderColor={colors.gray}
      color={colors.black} 
      borderColor={colors.orange}
      number
      onChange={(value ) => { 
        setFieldValue('space', value)               
         }}

      />

      </View>
</View>

       <View stretch mt={5} >

<Text style={styles.spaceText}>{I18n.t('price')}</Text>

  
      
<View  stretch row  spaceBetween mt={2}  >

<View  width={40}  >
<Input 
placeholder={I18n.t('FromPrice')}
        placeholderColor={colors.gray}
        color={colors.black} 
        // {...injectFormProps('FromPrice')}
        borderColor={colors.orange}
        number
        onChange={(value ) => { 
          setFieldValue('fromPrice', value)               
           }}

      />
      </View>
      <View  width={40}  >
<Input 
placeholder={I18n.t('toPrice')}
        placeholderColor={colors.gray}
        color={colors.black} 
        // {...injectFormProps('toPrice')}
        onChange={(value ) => { 
          setFieldValue('toPrice', value)               
           }}
        borderColor={colors.orange}
        number

      />
      </View>
      </View>
      </View> 
{/* ======================= Country And City ============================ */}

<View mt={5} stretch row   style={countryId !== ""  ?{   justifyContent: 'space-between' }:null }   > 


        <View stretch width={40}  >
         <Picker
         style={{}}
          
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
           {/* {errors.tblCountriesId && <Text size={5.5} mb={5} color={colors.error}>{` ${I18n.t('country')} ${I18n.t('required')}`}</Text>} */}
         </View>
 {countryId !=="" ?
         <View stretch width={40} >
           <Picker
             placeholder={I18n.t('city')}
            showSearchFilter
            onChange={(value ) => { setCityId(value) 
             setFieldValue('tblCitiesId', value) 
            //   setFieldValue('advertisementID', 1) 
            //  setFieldValue('realEstateTypeID', typeId ) 
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
           {/* {errors.tblCitiesId && <Text size={5.5} mb={5} color={colors.error}>{` ${I18n.t('city')} ${I18n.t('required')}`}</Text>} */}
         </View>
        :null
 }
      </View>

      <View mh={5} stretch center>
        <Button
          title={I18n.t('search')}
          stretch
          onPress={loading ? null : handleSubmit}
          // onPress={() =>Navigation.push('SearchResult')}
          processing={loading}
          m={15}
          color={colors.white}
          backgroundColor={colors.orange}
          borderRadius={30} 
          
        />
  </View>

     </View>
  )

  
    
  return (
   
        <ScrollView  stretch backgroundColor={colors.white}>
          <Header backgroundColor={colors.orange} title={I18n.t('search')} tc={"white"} 
          />
          
         

        <Form
          schema={{
            realEstateTypeID:null,
            advertisementID:null,
            space:null,
            fromPrice: null,
            toPrice: null,
            tblCountriesId:null,
            tblCitiesId:null,
           }}
          onSubmit={onSubmit}
          render={renderForm}
          // validationSchema={validationSchema}
        />
      </ScrollView>
  );
};

export default React.memo(Search);

 