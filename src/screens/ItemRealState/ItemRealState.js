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

import ContentLoader from "react-native-easy-content-loader";
import { Props } from 'react-native-image-zoom-viewer/built/image-viewer.type';

let imgs ={
  "villa":require("../../assets/images/villa.jpg"),
  "flat":require('../../assets/images/flat.jpg'),
  'resort':require('../../assets/images/resort.jpg'),
  'market':require('../../assets/images/market.jpg'),
  'land':require('../../assets/images/land.jpg'),
  'building':require('../../assets/images/building.jpg'),

  

}


const ItemRealState = (props) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const rtl = useSelector(state => state.lang.rtl);
  const [realEstateTypeID,setRealEstateTypeID] =useState(1);
  const [advertisementID,setAdvertisementID] =useState(1);
  const [advertisementName,setAdvertisementName] =useState("");


 
console.log(props);



  return (
    <Wrapper  >
     <Header backgroundColor={colors.orange} 
          title={props.realEstateTypeName} tc={"white"} />
      
   
          <View  stretch  center flex backgroundColor={"#e4e4e4"}>
                  <View  mt={5} center >
                  

                
                 <TouchableOpacity onPress={()=>
                 {
                  

                   Navigation.push({
                                name: 'CatogriesItem',
                                passProps: {
                                  realEstateTypeID: props.realEstateTypeID,
                                  advertisementID:1,
                                  realEstateTypeName:props.realEstateTypeName,
                                  advertisementName:`${I18n.t("rent")}`
                                },
                              })
                   
                 }}>
    <View   borderRadius={10} m={6}   pb={20} backgroundColor={colors.orange} center style={{
                     width: responsiveWidth(80),
                     height: responsiveWidth(50) ,

                     
                   }}>
                  
                   
                  <Image 
                    source={imgs[props.imageName]} 
      style={{width: responsiveWidth(80) ,height:responsiveWidth(40)  ,
    borderRadius:10 , 

    }}/>
                    <Text size={10} color={"white"} mt={5}>
                    {`${I18n.t("rent")} ${props.realEstateTypeName}`}
                    </Text>
                  </View>

                 </TouchableOpacity>


                
                 <TouchableOpacity onPress={()=>
                 {
                  

                   Navigation.push({
                                name: 'CatogriesItem',
                                passProps: {
                                  realEstateTypeID: props.realEstateTypeID,
                                  advertisementID:2,
                                  realEstateTypeName:props.realEstateTypeName,
                                  advertisementName:`${I18n.t("sell")}`
                                },
                              })
                   
                 }}>
                  <View   borderRadius={10} m={6}   pb={20} backgroundColor={colors.orange} center style={{
                     width: responsiveWidth(80),
                     height: responsiveWidth(50) ,

                     
                   }}>
                  
                   
                  <Image 
                    source={imgs[props.imageName]} 
      style={{width: responsiveWidth(80) ,height:responsiveWidth(40)  ,
    borderRadius:10 , 

    }}/>
                    <Text size={10} color={"white"} mt={5}>
                    {`${I18n.t("sell")} ${props.realEstateTypeName}`}
                    </Text>
                  </View>

                 </TouchableOpacity>


                
                  </View>

          </View>
  
    </Wrapper>
  );
};

export default ItemRealState;
