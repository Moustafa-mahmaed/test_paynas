import React, { Component } from 'react'
import { Image ,Dimensions    } from 'react-native'
import { View, Text, Button, Navigation } from '../../ui';
import colors from '../../ui/defaults/colors';
import {responsiveWidth ,responsiveHeight} from '../../ui/utils/responsiveDimensions';
import { useSelector } from 'react-redux';
import { API_ENDPOINT } from '../../configs';


const CardsListItem = (props) => {

  const rtl = useSelector(state => state.lang.rtl);

   const {  data} = props
  
  return (
    <View>
      <View mh={3} style={{ alignItems: 'center',}}>

     {
         data.attachments.length > 0 ?
       
        <Image
          source={{uri:`${API_ENDPOINT}${data.attachments[1]}`}}
              
             style={{ width: responsiveWidth(96),
                    height: responsiveHeight(20) ,
    
    borderTopLeftRadius: 10, borderTopRightRadius: 10, 
    }}
            
         
        /> 
        :
         <Image
          source={require('../../assets/images/No_img.png')}
        
            
             style={{ width: responsiveWidth(96),
                    height: responsiveHeight(20) ,
    
    borderTopLeftRadius: 10, borderTopRightRadius: 10, 
    }}
            
            

        
        /> 
        }

</View> 

        <View p={2} style={{ backgroundColor:'#e4e4e4' , width: responsiveWidth(96),
                    height: responsiveHeight(15) , borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}
                     mh={3}  row center SpaceBetween backgroundColor={colors.white}>
      
        <View  flex={2}  >
        <Text color={colors.black} size={10}>
        {/* {item.title.substring(0, 10)} */}
        {data && data.title !=="" ?   data.title :"Title"}
        </Text>
        <Text color={colors.gray} size={7}>
        {/* {rtl ? item.arabicCountryName : item.englishCountryName} */}
        
         {(data &&  data.counterView ) ? 
        data.counterView : 0
        
}
         | 
                {(data &&  data.englishCountryName  && data.arabicCountryName&& rtl) ? 
        data.arabicCountryName : data.englishCountryName
        
}

        </Text>
        </View>

        <View flex={1}  mh={2} >
        <Text color={colors.gray} size={7}>
        {data && data.price !=="" ?   data.price :"0"}
        </Text>
        <Text color={colors.gray} size={7}>
        
         {(data &&  data.englishCountryName  && data.arabicCountryName&& rtl) ? 
        data.arabicCityName : data.englishCityName
        
}
        </Text>
        </View>
  
   
   </View>
   
        </View>
    
  );
};

export default CardsListItem;

