import React, { Component, useState } from 'react';
import { View, Text, Input, 
  Icon,   ScrollView, Navigation} from '../../ui';
import Share from 'react-native-share';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { API_ENDPOINT } from '../../configs';
import { useSelector } from 'react-redux';
import { I18nManager, Image  ,Linking ,TouchableOpacity } from 'react-native'
import styles from './styles'
import Header from '../../components/Header';
import {responsiveWidth ,responsiveHeight} from '../../ui/utils/responsiveDimensions';

import Swiper from 'react-native-swiper'

 
    


const PostDetails = (props) => {


  console.log(props);
  const [loading, setLoading] = useState(false);
  const [isfav, setIsfav] = useState(false);
  const [visible, setVisible] = useState(false);

  
  const rtl = useSelector(state => state.lang.rtl);
  
  console.log("rtl" + rtl);
    
//  let {data}=props;
 console.log("props postdetails");
 console.log(props);
 let {data }=props;
 
  return (
   

        <ScrollView   backgroundColor={colors.white}>


       <View stretch center  >
            
            <View flex={1}>  
             <Swiper  dotColor={"#fff"} activeDotColor={colors.orange} 
             height={data.attachments.length === 0 ? 0 : responsiveHeight(40)} >
      {data.attachments.length > 0 &&data.attachments.map((item,key)=>{
        return(
          
           <View  key={key}>
                 
          <Image
       
            
            style={{
              width: responsiveWidth(105),
              height: responsiveHeight(40) ,
               overflow: 'hidden',
              borderBottomLeftRadius:40, borderBottomRightRadius:40
                }}
             source={{uri:`${API_ENDPOINT}${item}`}}
                /> 

        </View>

        )
        
      })}
      </Swiper>


 {data.attachments.length === 0 ?
                 
          <Image
       
            
            style={{
              width: responsiveWidth(105),
              height: responsiveHeight(40) ,
               overflow: 'hidden',
              borderBottomLeftRadius:40, borderBottomRightRadius:40
                }}
               source={require('../../assets/images/No_img.png')}
                /> 
        

 : null        
}

         
          

          <Icon
            name={'arrow-back'}
            type={'MaterialIcons'}
            size={17}
            color={colors.white}
             onPress={()=>  Navigation.pop() }
            style={{ position: 'absolute', top:15, left:25}}
           />
<View spaceBetween row   style={{ position: 'absolute', right:30, bottom:25}} >
          <TouchableOpacity onPress={()=>{
            Share.open({ title: '',
      social: Share.Social.WHATSAPP,
      recipient:"",
      message: 'Example SMS',})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    err && console.log(err);
  })
          }}>
            <Icon 
             name="share"
              type="Entypo" 
              color={colors.orange} 
              size={15} 
              style={{ marginLeft:5 ,marginRight:5  }}
            />
          </TouchableOpacity>
         
          <TouchableOpacity onPress={()=>{
            setIsfav(isfav=>!isfav)
            setVisible(true)
            setTimeout(() => {
            setVisible(false)
              
            }, 3000);
            
          }}>
            <Icon 
             name={isfav?"heart" :"heart-outlined"}
              type="Entypo" 
              color={colors.orange} 
              size={15} 
             style={{ marginLeft:5 ,marginRight:5  }}

           
            />
            </TouchableOpacity>
</View>
<View spaceBetween row m={1} p={1}   backgroundColor={colors.orange}  style={{ borderRadius:7,  elevation:10 , position: 'absolute', left:30, bottom:25}} >
            <Icon 
             name="images"
              type="Entypo" 
              color={colors.white} 
              size={12} 
              style={{ marginLeft:5 ,marginRight:5  }}
            />
            <Text color={colors.white} >
            {data.attachments.length}
            </Text>
          
</View>

           
      </View>


      <View 
      backgroundColor={'white'}
            style={{
              width: responsiveWidth(95),
              
           
              
              borderTopWidth:1,
              borderRightWidth:1,
              borderLeftWidth:1,
              borderBottomWidth:1,
              
                borderBootomColor:colors.gray,
                borderTopColor:colors.gray,
                borderRightColor:colors.gray,
              borderLeftColor:colors.gray,
                borderTopLeftRadius:30,
                borderTopRightRadius:30,
              
                   bottom:20,
           

            }}>
         <View stretch  row  spaceBetween center bbw={1} bbc={colors.gray}  pv={1} mh={5} mt={5} >

                    <View flex={2}  ph={1} style={rtl ?{borderLeftWidth:1 
                    ,borderLeftColor:colors.gray}:{borderRightWidth:1 
                    ,borderRightColor:colors.gray} }> 
                          <View  >
                          
                          <Text style={{ alignSelf: 'stretch' ,
                          textAlign:rtl ? "right": "left" }}> {data && data.title ? data.title  : "title"  } </Text>
                          </View>

                    <View row>
                          <View >
                          <Text size={6}> { (data && rtl) ?data.arabicCountryName : data.englishCountryName} | </Text>
                          </View>

                          <View >
                          <Text size={6}> { (data && rtl)  ?data.arabicCityName : data.englishCityName} </Text>
                  
                          </View>
                    </View>

                    </View>



                    <View flex={1}  center >
                    <Text> {data && data.price ? data.price : "no price"} </Text>
                    
                   { (data && data.negotiable) ?
                    <Text color={"green"}>{I18n.t('negotiable')}</Text>:
                    <Text> {I18n.t("notNegotiable")}</Text>

                   }
                { (data.realEstateTypeID ===1 || data.realEstateTypeID ===2 
                 || data.realEstateTypeID ===4  )  ?

    (
  

   data.furnished ?
      <Text size={6}>{I18n.t('furnished')}</Text> :
    <Text size={6}> {I18n.t("notfurnished")}</Text>

   
      )   
              

                   :
                   null
                  }
                   
                    </View>          

                  </View>


                            {/* Garage & Garden  & Balcony */}
            <View stretch  row mh={5} mt={5}  ph={2} spaceBetween center bbw={1} bbc={colors.gray}  pv={1}  >
            <View stretch row  center flex={2} 
              style={rtl ?{borderLeftWidth:1 
                    ,borderLeftColor:colors.gray}:{borderRightWidth:1 
                    ,borderRightColor:colors.gray ,flexWrap: 'wrap',} }   >
           
           { (data.realEstateTypeID ===1 ||data.realEstateTypeID ===2 
            ||data.realEstateTypeID ===4) ? 
         
          (data && data.luxuries && data.luxuries.map((item,key)=>{
            return(
                  <View center mh={1} ph={1} key={item.id}>
            <Icon
            name={'building-o'}
            type={'FontAwesome'}
            size={17}
            color={colors.orange}
           />
           <Text size={5}>{rtl ?item.luxuryNameAr :item.luxuryNameEn }</Text>

            </View>
            )
          })
          )
          :null
          }
         

         

            {/* ///////////////luxuries item//////////////////////// */}

           


            </View>
 

            <View  flex={1} center  >
              <Text size={7}> {data.area }
                      <Text color={"green"}> M</Text>
              </Text>
              <Text size={7}  ph={2} btc={colors.gray} btw={1} >{ rtl ?data.advertisementNameAr : data.advertisementNameEn}  </Text>
               { data.realEstateTypeID === 5 ?
                      
                      <Text size={7} btc={colors.gray} btw={1} >{rtl ? data.earthTypeNameAr:data.earthTypeNameEn}</Text>
                    
          :
          null
          }
            </View>
                    </View>


                            {/* Bed Rooms & Bath Rooms & Kitchen */}
                          

           <View mh={5}  stretch  spaceBetween center  pv={1}  >
    { (data.realEstateTypeID ===2 ||data.realEstateTypeID ===4) ? 

            <View stretch row pv={3}  spaceAround center bbw={1} bbc={colors.gray}   >  
            
                 
            <View center ph={1}>
           
                      <Text size={7}  >{I18n.t("bedRoom")} </Text>

           <View center   mv={2}  bw={1} bc={colors.gray} width={10} height={5}>
           <Text size={7} >{data.bedRoomNumbers}</Text>
           </View>

            </View>


           

               <View center ph={1}>
           
                      <Text size={7}  >{I18n.t("floorNumber")} </Text>

           <View center   mv={2}  bw={1} bc={colors.gray} width={10} height={5}>
           <Text size={7} >{data.floorNumber}</Text>
           </View>

            </View>


            <View center ph={1}>
           
           <Text size={7} >{I18n.t("bathRoom")} </Text>
          
           <View center mv={2}  bw={1} bc={colors.gray} width={10} height={5}>
           <Text size={7}  >{data.bathroomNumber}</Text>
           </View>

            </View>


          
             
             </View>
            
            

            :
            
           null
            }

            { (data.realEstateTypeID === 1 ||data.realEstateTypeID ===6 ) ? 

            <View stretch row pv={3}  spaceAround center bbw={1} bbc={colors.gray}   >  
            
                 
            <View center ph={1}>
           
                      <Text size={7}  >{I18n.t("bedRoom")} </Text>

           <View center   mv={2}  bw={1} bc={colors.gray} width={10} height={5}>
           <Text size={7} >{data.bedRoomNumbers}</Text>
           </View>

            </View>

<View center ph={1}>
           
                      <Text size={7}  > {I18n.t("numberFloor")} </Text>

           <View center   mv={2}  bw={1} bc={colors.gray} width={10} height={5}>
           <Text size={7} >{data.numberOfFloors}</Text>
           </View>

            </View>
            


            <View center ph={1}>
           
           <Text size={7} >{I18n.t("bathRoom")} </Text>
          
           <View center mv={2}  bw={1} bc={colors.gray} width={10} height={5}>
           <Text size={7}  >{data.bathroomNumber}</Text>
           </View>

            </View>


          
             
             </View>
            
            

            :
            
           null
            }


                       {/* Description */}
               <View
                mh={1} mt={5} stretch     bbw={1} bbc={colors.gray}  pv={1} >
              <Text size={8}> {I18n.t('description')}</Text>
              <Text size={7}> {(data && data.description ) ? data.description :"" }</Text>
              
              
                  </View>



                           {/* Address */}
                 <View
                mh={1} mt={5} stretch    bbw={1} bbc={colors.gray}  pv={1} >
              <Text size={8}> {I18n.t('address')}</Text>
              <Text size={8}>{(data && data.address ) ? data.address :"" }</Text>
              
                  </View>


                        {/* Contact No. */}
                <View
                mh={1} mt={5} stretch  spaceBetween     pv={1} >
              <Text size={7}>{I18n.t('contactNo')}</Text>
                 
             
              <Input 
              
        rightItems={
         <TouchableOpacity onPress={()=>Linking.openURL(`tel:${data.contactNumber}`)}>
          <Icon
            name="phone"
            type={'AntDesign'}
            size={12}
            pl={5}
            color={colors.orange}
            
          />
          </TouchableOpacity>
        }
        
       
        value= {`${data.contactNumber}`} 
       stopEditable
         style={{ 
        backgroundColor:"#e3e3e3",
          marginLeft:10,
         marginRight:10,
         paddingRight:10,
         paddingLeft:10

         }}
          />
                  
              
                  </View>

            </View>

           </View> 

     </View>
    
      </ScrollView>
  );
};

export default PostDetails;

 