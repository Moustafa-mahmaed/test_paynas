import React, { Component } from 'react';
import { View, Text, Wrapper, Icon } from '../../ui';
import {Linking} from 'react-native'
import Header from '../../components/Header';
import colors from '../../ui/defaults/colors';
import I18n from 'react-native-i18n';

const ContactUs = () => {
     return (
     <Wrapper  >
     <Header  backgroundColor={colors.orange} title={I18n.t('contactUs')} tc={"white"} fontSize={40}/>
        {/* <View stretch center mh={10}  >
        <Text  mt={5} color={colors.orange} size={10}> {I18n.t('contactUs')}</Text>
            </View> */}

            <View stretch center mh={10} mt={15}>
              <Text color={colors.orange} size={8}> {I18n.t("getInTouch")} </Text>   
              <Text color={colors.black} size={10}>{I18n.t("netleezNumber")} </Text>   
              </View>


              <View stretch center mh={10} mt={15}>
              <Text color={colors.orange} size={8}> {I18n.t("locationText")} </Text>   
              <Text color={colors.black} size={8}> {I18n.t("location1")} </Text>   
              <Text color={colors.black} size={8}> {I18n.t("location2")}</Text>   
              <Text color={colors.black} size={8}> {I18n.t("location3")}</Text>   
              </View>

              <View stretch center mh={10} mt={15}>
              <Text color={colors.orange} size={8}> {I18n.t("netleezEmailText")}</Text>   
              <Text color={colors.black} size={8}> {I18n.t("netleezEmail")} </Text>      
              </View>


              <View column stretch center mh={10} mt={10}>
              <View>
              <Text color={colors.orange} size={8}> {I18n.t("folowText")} </Text>   
              </View>

              <View p={2} row  spaceAround stretch center mh={10} mt={15} >

              <Icon 
                    name={'facebook'}
                    type={'FontAwesome'}
                    size={17}
                    color={colors.blue}
                    ph={15}
                    onPress={() => { Linking.openURL('https://www.facebook.com/netleez') }}
               />           


            <Icon 
                name={'linkedin'}
                type={'Entypo'}
                size={17}
                color={'#0e76a8'}
                ph={15}
                onPress={() => { Linking.openURL('https://www.linkedin.com/company/netleez') }}
           />           


            <Icon 
                name={'instagram'}
                type={'AntDesign'}
                size={17}
                color={'#cd486b'}
                ph={15}
                onPress={() => { Linking.openURL('https://www.instagram.com/netleez') }}
           />           

              </View>
              </View>

             
               
    
        </Wrapper>
    );
};

export default ContactUs;
