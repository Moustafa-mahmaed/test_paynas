 

import React, { Component ,useState,useEffect,useRef} from 'react'
import { ActivityIndicator ,Dimensions , Image , TouchableOpacity ,ScrollView } from 'react-native'
import CardsList from '../../components/CardsList'
import Carditem from '../../components/Carditem'
import I18n from 'react-native-i18n';
import ContentLoader from "react-native-easy-content-loader";
import { API_ENDPOINT } from '../../configs';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { View, Text, Wrapper ,List , Navigation } from '../../ui';
import colors from '../../ui/defaults/colors';

import NoDate from '../../components/NoDate';
import Header from '../../components/Header';
import FloatingButton from '../../components/FloatingButton';
import {responsiveWidth ,responsiveHeight} from '../../ui/utils/responsiveDimensions';

const Home = (props) => {

  const [loadingMostView, setloadingMostView] = useState(false);
  const [loadingSell, setloadingSell] = useState(false);
  const [loadingRent, setloadingRent] = useState(false);
  const [MostList, setMostList] = useState([]);
  const [mostSellList, setmostSellList] = useState([]);
  const [mostRentList, setmostRentList] = useState([]);
  const rtl = useSelector(state => state.lang.rtl);
  
  const scrollview1 = useRef(null);
  
  
  useEffect(() => {
    setloadingMostView(true);
    setloadingSell(true);
    setloadingRent(true);
 

  let mostViewUrl = `${API_ENDPOINT}/api/Offer/GetMostView?pageNumber=1&pageSize=5`
  let mostRentUrl = `${API_ENDPOINT}/api/Offer/GetAllHome?AdvertisementID=1&pageNumber=1&pageSize=5`
  let mostSellUrl = `${API_ENDPOINT}/api/Offer/GetAllHome?AdvertisementID=2&pageNumber=1&pageSize=5`

  
  const requestOne = axios.get(mostViewUrl);
const requestTwo = axios.get(mostRentUrl);
const requestThree = axios.get(mostSellUrl);

axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
  const MostList1 = responses[0].data.data.data;
   const MostRent1 = responses[1].data.data.data;
   const MostSell1 = responses[2].data.data.data;

   setMostList(MostList1);
   setmostSellList(MostRent1);
   setmostRentList(MostSell1);
    
  
   setloadingMostView(false);
    setloadingSell(false);
    setloadingRent(false);
  
 

})).catch(errors => {
  console.log(errors);
})

    // action on update of movies
}, [  ]);

 


 



renderRentList = ( ) => {
  

  return (
    <View>
      {loadingRent ?
      <ContentLoader
  
  pRows={5}
  pHeight={[100, 30, 20]}
  pWidth={[100, 70, 100]}
/>
          :
          
             <View row   spaceBetween mh={2}  >
                <View flex >
                <Text color={colors.black} size={10}> {I18n.t('rentOffer')}</Text>
                </View>
                <TouchableOpacity  onPress={()=>
                 {
                  

                   Navigation.push({
                                name: 'Catogries1',
                                
                                
                              })
                   
                 }}>
                  
                <View flex reverse>
              
                <Text color={colors.orange} size={8}>{I18n.t('seeMore')} </Text>
                </View>
                </TouchableOpacity>
         </View>

          }

        
     
           
            
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} 
            style={rtl?{transform:[{scaleX:-1}]  }:{transform:[{scaleX:1}]  }}
          
        >
           {  mostRentList && mostRentList.length >0 ?
            mostRentList.map(function(item, i){
              return(
                <Carditem  item={item} key={i}/>
              
              )
            })
            
             :
            // <NoDate />
            null
           
}
            </ScrollView>
            
      
      </View>
  
  )
}




renderSellList = ( ) => {

  return (
    <View bbw={1} style={{borderBottomLeftRadius:20, borderBottomRightRadius:20}}  bc={colors.gray} >
      {loadingSell ?
     <ContentLoader
 
  pRows={5}
  pHeight={[100, 30, 20]}
  pWidth={[100, 70, 100]}
/>
          :
          
             <View row   spaceBetween   >
                <View flex  >
                <Text color={colors.black} size={10}>{I18n.t('sellOffer')}</Text>
                </View>

                <TouchableOpacity  onPress={()=>
                 {
                  

                   Navigation.push({
                                name: 'Catogries1',
                                passProps: {
                                  ID:1,
                                },
                                
                              })
                   
                 }}>
                <View flex reverse>
                <Text color={colors.orange} size={8}>{I18n.t('seeMore')} </Text>
                </View>
                </TouchableOpacity>
         </View>

          }

        
     
           
            
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
            style={rtl?{transform:[{scaleX:-1}]  }:{transform:[{scaleX:1}]  }}  >
           { mostSellList && mostSellList.length >0 ?
            mostSellList.map(function(item, i){
              return(
                <Carditem  item={item} key={i}/>
              
              )
            })
            
             :
             <NoDate />
}
            </ScrollView>
            
      
      </View>
  
  )
}



renderViewList = ( ) => {


  return (
    <View>
      {loadingMostView ?
        <ContentLoader
  
  pRows={5}
  pHeight={[100, 30, 20]}
  pWidth={[100, 70, 100]}
/>
          :
          
             <View row   spaceBetween mh={2}  >
                <View flex >
                <Text color={colors.black} size={10}>{I18n.t('mostView')} </Text>
                </View>

                <TouchableOpacity  onPress={()=>
                 {
                  

                   Navigation.push({
                                name: 'Catogries1',
                               
                                
                              })
                   
                 }}>
                <View flex reverse>
                <Text color={colors.orange} size={8}>{I18n.t('seeMore')} </Text>
                </View>
                </TouchableOpacity>
         </View>

          }

        
     
           
            
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
            style={rtl?{transform:[{scaleX:-1}]  }:{transform:[{scaleX:1}]  }} >
           { ( MostList && MostList.length >0) ?
            MostList.map(function(item, i){
              return(
                <Carditem  item={item} key={i}/>
              
              )
            })
            
             :
            //  <NoDate />
            null
}
            </ScrollView>
            
      
      </View>
  
  )
}



  
    
    return (
      <Wrapper  >
            <Header showMenu hideBack showSearch title={I18n.t("explore")} />
    <ScrollView>
      <View  flex={1}  >
            {this.renderViewList()}
      </View>

      <View flex={1}    mh={5} pv={5} bbw={1} btw={1} bc={colors.gray}  mv={3} >
      <View flex >
                <Text color={colors.black} size={10}>{I18n.t('categories')} </Text>
                </View>
     <View stretch style={rtl?{flexDirection:"row-reverse"  }:{flexDirection:"row"  }} spaceBetween>
       
     <TouchableOpacity onPress={()=>
                 {
                  

                   Navigation.push({
                                name: 'ItemRealState',
                                passProps: {
                                  realEstateTypeName:I18n.t("villa"),
                                  imageName:"villa",
                                  realEstateTypeID: 1,

                                 
                                },
                              })
                   
                 }}>
                   
    <View center >
   
      <Image  source={require('../../assets/images/villa.jpg')} 
      style={{width: responsiveWidth(30),
        height: responsiveWidth(20) , borderRadius:10}}/>
          <Text color={colors.black}>{I18n.t("villa")}</Text>
      </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={()=>
                 {
                   
                        Navigation.push({
                                name: 'ItemRealState',
                                passProps: {
                                  realEstateTypeName:I18n.t("flat"),
                                  imageName:"flat",
                                  realEstateTypeID: 2,

                                 
                                },
                              })
                   
                 }}>
      <View center  >
      <Image  source={require('../../assets/images/flat.jpg')} 
      style={{width: responsiveWidth(30),
        height: responsiveWidth(20) , borderRadius:10}}/>
          <Text color={colors.black}>{I18n.t("flat")}</Text>
      </View>
</TouchableOpacity >
<TouchableOpacity onPress={()=>
                 {
                  

               Navigation.push({
                                name: 'ItemRealState',
                                passProps: {
                                  realEstateTypeName:I18n.t("market"),
                                  imageName:"market",
                                  realEstateTypeID: 3,

                                 
                                },
                              })
                   
                 }}>

      <View center >
      <Image  source={require('../../assets/images/market.jpg')} 
      style={{width: responsiveWidth(30),
        height: responsiveWidth(20) , borderRadius:10}}/>
          <Text color={colors.black}>{I18n.t("market")}</Text>
      </View>
      </TouchableOpacity>

     </View>

 <View stretch style={rtl?{flexDirection:"row-reverse"  }:{flexDirection:"row"  }} spaceBetween
 >
 <TouchableOpacity onPress={()=>
                 {
                  

                   Navigation.push({
                                name: 'ItemRealState',
                                passProps: {
                                  realEstateTypeName:I18n.t("resort"),
                                  imageName:"resort",
                                  realEstateTypeID: 4,

                                 
                                },
                              })
                   
                 }}>
      <View center>
      <Image  source={require('../../assets/images/resort.jpg')} 
      style={{width: responsiveWidth(30),
        height: responsiveWidth(20) ,  
    //   ,  overflow: "hidden",
    borderRadius:10 ,
    }}/>
          <Text color={colors.black}>{I18n.t("resort")}</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>
                 {
                  
                Navigation.push({
                                name: 'ItemRealState',
                                passProps: {
                                  realEstateTypeName:I18n.t("land"),
                                  imageName:"land",
                                  realEstateTypeID: 5,

                                 
                                },
                              })
                   
                 }}>
      <View center >
      <Image  source={require('../../assets/images/building.jpg')} 
      style={{width: responsiveWidth(30),
        height: responsiveWidth(20) , borderRadius:10}}/>
          <Text color={colors.black}>{I18n.t("land")}</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>
                 {
                  

                  Navigation.push({
                                name: 'ItemRealState',
                                passProps: {
                                  realEstateTypeName:I18n.t("building"),
                                  imageName:"building",
                                  realEstateTypeID: 6,

                                 
                                },
                              })
                   
                 }}>
      <View center >
      <Image  source={require('../../assets/images/1.jpg')} 
      style={{width: responsiveWidth(30),
        height: responsiveWidth(20) ,borderRadius:10}}/>
          <Text color={colors.black}>{I18n.t("building")}</Text>
      </View>
      </TouchableOpacity>
     </View>

      </View>

      <View  flex={1}  >
                  {this.renderSellList()}
      </View>

      <View  flex={1}  >
                  {this.renderRentList()}
      </View>

     </ScrollView>


      <FloatingButton style={{bottom: 90, right:60}}/>
            </Wrapper >

            
        
        
    
  
    )
  }


 


        
   
 


        
   
export default Home;

 
