import React, { Component, useState  ,useEffect} from 'react';
import { View, Text, Wrapper, Input, showError, Icon, Navigation ,List  } from '../../ui';
import { Image  ,ScrollView ,ActivityIndicator ,TouchableOpacity} from "react-native";
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import CardsList  from "../../components/CardsList";
import { useSelector } from 'react-redux';
import {responsiveWidth ,responsiveHeight} from '../../ui/utils/responsiveDimensions';
import Header from '../../components/Header';
import { API_ENDPOINT } from '../../configs';
import SwitchSelector from "react-native-switch-selector";
import ContentLoader from "react-native-easy-content-loader";
import { Props } from 'react-native-image-zoom-viewer/built/image-viewer.type';

const options1 = [
  { label: "إيجار" , value: 1 },
  { label: "بيع", value: 2  },
 
];

const options2 = [
  { label: "rent" , value: 1 },
  { label: "sell", value: 2  },
 
];
const Catogries1 = (props) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const rtl = useSelector(state => state.lang.rtl);
  const [realEstateTypeID,setRealEstateTypeID] =useState(1);
  const [advertisementID,setAdvertisementID] =useState(1);
  const [advertisementName,setAdvertisementName] =useState("");
  
  
  useEffect(() => {

    if(advertisementID===1 && props.ID !==1){
      
          setAdvertisementName(I18n.t("rent"));
          
       
      }else{
        setAdvertisementName(I18n.t("sell"))
        setAdvertisementID(2)

      }

    // action on update of movies
}, [advertisementName ,advertisementID ]);

 


  return (
    <Wrapper  >

     <Header backgroundColor={colors.orange} 
          title={I18n.t('catogries')} tc={"white"} />
      <ScrollView>

    <View pv={5} mh={5}>
    <SwitchSelector
  options={rtl?options1:options2}
  buttonColor={colors.orange}
 
  fontSize={22}
  textColor={colors.black}
  initial={props.ID? 1: 0}
  height={70}
  backgroundColor={"#eee3e3"}
  onPress={value => 
  setAdvertisementID(value)
  }
/>
</View>
          <View  stretch  center flex>
                  <View row style={{ flexWrap: 'wrap', justifyContent: 'center', }}>
                  { loading && (  <ContentLoader
  
  pRows={5}
  pHeight={[100, 30, 20]}
  pWidth={[100, 70, 100]}
/>
                  )}

                
                 <TouchableOpacity onPress={()=>
                 {
                  

                   Navigation.push({
                                name: 'CatogriesItem',
                                passProps: {
                                  realEstateTypeID: 1,
                                  advertisementID:advertisementID,
                                  realEstateTypeName:I18n.t("villa"),
                                  advertisementName:advertisementName
                                 
                                },
                              })
                   
                 }}>
                  <View   borderRadius={10} m={2}  backgroundColor={colors.orange} center style={{
                     width: responsiveWidth(45),
                     height: responsiveWidth(45) ,
                     
                   }}>
                  
                   
                  <Image  source={require('../../assets/images/1.jpg')} 
      style={{width: responsiveWidth(45) ,height:responsiveWidth(40)  ,
    borderRadius:10 , 
    }}/>
                    <Text pb={5} size={10} color={"white"}>
                    {I18n.t("villa")}
                    </Text>
                  </View>

                 </TouchableOpacity>


                 
                 <TouchableOpacity onPress={()=>
                 {
                   
                   Navigation.push({
                                name: 'CatogriesItem',
                                passProps: {
                                  realEstateTypeID:2,
                                  advertisementID:advertisementID,
                                  realEstateTypeName:I18n.t("flat"),
                                  advertisementName:advertisementName
                                 
                                },
                              })
                   
                 }}>
                  <View  borderRadius={10} m={2} backgroundColor={colors.orange} center style={{
                     width: responsiveWidth(45),
                     height: responsiveWidth(45) ,
                     
                   }}>
                  
                          
                  <Image  source={require('../../assets/images/flat.jpg')} 
      style={{width: responsiveWidth(45) ,height:responsiveWidth(40)  ,
    borderRadius:10 , 
    }}/>

                    <Text pb={5} size={10} color={"white"}>
                    {I18n.t("flat")}
                    </Text>
                  </View>

                 </TouchableOpacity>

                 
                 <TouchableOpacity onPress={()=>
                 {
                   
                   Navigation.push({
                                name: 'CatogriesItem',
                                passProps: {
                                  realEstateTypeID: 4,
                                  advertisementID:advertisementID,
                                  realEstateTypeName:I18n.t("resort"),
                                  advertisementName:advertisementName
                                 
                                },
                              })
                   
                 }}>
                  <View  borderRadius={10} m={2} backgroundColor={colors.orange} center style={{
                     width: responsiveWidth(45),
                     height: responsiveWidth(45) ,
                     
                   }}>
                  
                          
                  <Image  source={require('../../assets/images/resort.jpg')} 
      style={{width: responsiveWidth(45) ,height:responsiveWidth(40)  ,
    borderRadius:10 , 
    }}/>

                    <Text pb={5} size={10} color={"white"}>
                    {I18n.t("resort")}
                    </Text>
                  </View>

                 </TouchableOpacity>

                 
                 <TouchableOpacity onPress={()=>
                 {
                   
                   Navigation.push({
                                name: 'CatogriesItem',
                                passProps: {
                                  realEstateTypeID: 3,
                                  advertisementID:advertisementID,
                                  realEstateTypeName:I18n.t("market"),
                                  advertisementName:advertisementName
                                 
                                },
                              })
                   
                 }}>
                  <View  borderRadius={10} m={2} backgroundColor={colors.orange} center style={{
                     width: responsiveWidth(45),
                     height: responsiveWidth(45) ,
                     
                   }}>
                         
                         <Image  source={require('../../assets/images/market.jpg')} 
      style={{width: responsiveWidth(45) ,height:responsiveWidth(40)  ,
    borderRadius:10 , 
    }}/>
                   

                    <Text pb={5} size={10} color={"white"}>
                    {I18n.t("market")}
                    </Text>
                  </View>

                 </TouchableOpacity>
                 
                 <TouchableOpacity onPress={()=>
                 {
                   
                   Navigation.push({
                                name: 'CatogriesItem',
                                passProps: {
                                  realEstateTypeID: 5,
                                  advertisementID:advertisementID,
                                  realEstateTypeName:I18n.t("land"),
                                  advertisementName:advertisementName
                                 
                                },
                              })
                   
                 }}>
                  <View borderRadius={10}   m={2} backgroundColor={colors.orange} center style={{
                     width: responsiveWidth(45),
                     height: responsiveWidth(45) ,
                     
                   }}>
                  
                          
                  <Image  source={require('../../assets/images/land.jpg')} 
      style={{width: responsiveWidth(45) ,height:responsiveWidth(40)  ,
    borderRadius:10 , 
    }}/>

                    <Text pb={5} size={10} color={"white"}>
                    {I18n.t("land")}
                    </Text>
                  </View>

                 </TouchableOpacity>
                 
                 <TouchableOpacity onPress={()=>
                 {
                   
                   Navigation.push({
                                name: 'CatogriesItem',
                                passProps: {
                                  realEstateTypeID: 6,
                                  advertisementID:advertisementID,
                                  realEstateTypeName:I18n.t("building"),
                                  advertisementName:advertisementName
                                 
                                },
                              })
                   
                 }}>
                  <View  borderRadius={10} m={2} backgroundColor={colors.orange} center style={{
                     width: responsiveWidth(45),
                     height: responsiveWidth(45) ,
                     
                   }}>
                  
                          
                  <Image  source={require('../../assets/images/building.jpg')} 
      style={{width: responsiveWidth(45) ,height:responsiveWidth(40)  ,
    borderRadius:10 , 
    }}/>

                    <Text  pb={5} size={10} color={"white"}>
                    {I18n.t("building")}
                    </Text>
                  </View>

                 </TouchableOpacity>


                
                  </View>

          </View>

    </ScrollView>

    </Wrapper>
  );
};

export default React.memo(Catogries1);
