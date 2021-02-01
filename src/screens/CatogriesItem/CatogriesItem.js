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
import NoDate from '../../components/NoDate';

const options = [
  { label: I18n.t("rent"), value: 1 },
  { label: I18n.t("sell"), value: 2  },
 
];
const CatogriesItem = (props) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const rtl = useSelector(state => state.lang.rtl);
  const [realEstateTypeID,setRealEstateTypeID] =useState(props.realEstateTypeID);
  const [total,setTotal] =useState(0);
  const [advertisementID,setAdvertisementID] =useState(props.advertisementID);
  const [pageIndex,setpageIndex] =useState(1);
  const [loadingMore,setloadingMore] =useState(false);
  
  


 

useEffect(() => getData(), [ ]);




  const getData = () => {

   
    setLoading(true);
    
 
    let url=`${API_ENDPOINT}/api/Offer/GetAll?AdvertisementID=${advertisementID}&RealEstateTypeID=${realEstateTypeID}&pageNumber=1&pageSize=5`
      Axios.get(url)
      .then(res => {
     
        console.log(res.data);
         setTotal(res.data.data.totalCount)
  
         if(res.data.data.nextPage ==="Yes"){
           setloadingMore(true);
         }else{
           setloadingMore(false);

         }
          setList(res.data.data.data)

          console.log("loadingMore");
          console.log(loadingMore);
         setLoading(false);
         
        
      
         
       
   
      })
      .catch(error => {
        setLoading(false)

         

        console.log("error ", error)
      

         console.log("error ", error.response)
        if (!error.response) {
          showError(I18n.t('ui-networkConnectionError'));
          return;
        } else {
          showError(I18n.t('MayBe_Error'));
        }
      });
  
  };



  const getDataMore = (pageIndex) => {

   
    setLoading(true);
    
 
    let url=`${API_ENDPOINT}/api/Offer/GetAll?AdvertisementID=1&RealEstateTypeID=${realEstateTypeID}&pageNumber=${pageIndex}&pageSize=5`
      Axios.get(url)
      .then(res => {
     
        console.log(res.data);
         setTotal(res.data.data.totalCount)
  
         if(res.data.data.nextPage ==="Yes"){
           setloadingMore(true);
         }else{
           setloadingMore(false);

         }
         let result =res.data.data.data
          setList([...list ,...result]);

          console.log("loadingMore");
          console.log(loadingMore);
         setLoading(false);
        
      
         
       
   
      })
      .catch(error => {
        setLoading(false)
         

        console.log("error ", error)
      

         console.log("error ", error.response)
        if (!error.response) {
          showError(I18n.t('ui-networkConnectionError'));
          return;
        } else {
          showError(I18n.t('MayBe_Error'));
        }
      });
  
  };

  handleLoadMore = () => {
   

    if (list.length < total && !loading  && loadingMore ) {
     setpageIndex(pageIndex + 1);
    //  setloadingMore(true);
     console.log("pageIndex inside loadmore"+ loadingMore);
     getDataMore(pageIndex);

     
    }else{
      console.log("not load more");
    }
  }




  renderList = () => {
    return (
      <View    flex={9} style={{ alignItems: 'center'}}>
       
 {loading && (
          <ActivityIndicator
            size='small'
            color={colors.black}
            style={{flex: 1,
            marginTop:20,
    backgroundColor: colors.white,
    paddingHorizontal: 20}}
          />
        )}
      

        
<CardsList 
          data={list}
          // onItemPress={this.onCardPress}
             handleLoadMore={this.handleLoadMore}
             loadingMore={loadingMore}
/>


</View> 

    )}


    // renderSearch =()=>(
    //   <View mh={5} mt={4}>
    //   <Input
        
    //      leftItems={
    //       <Icon
    //         name="search"
    //         type={'EvilIcons'}
    //         size={12}
    //         pl={5}
    //         color={colors.orange}
    //       />
    //     }
    //     onFocus={()=> Navigation.push({ name: 'Search',})}
    //     placeholder={I18n.t('search')}
    //     placeholderColor={colors.orange}
    //     placeholderFontSize={2}
    //     color={colors.black}
    //     backgroundColor={"#F4F4F4"}
       
    //   />
    //   </View>
    // )
console.log(props);
let title=`${props.advertisementName} ${props.realEstateTypeName}`;

  return (
    <Wrapper  >
      <Header backgroundColor={colors.orange} 
          title={title} tc={"white"} />
    {/* {this.renderSearch()} */}
    {this.renderList()}
    
    </Wrapper>
  );
};

export default CatogriesItem;
