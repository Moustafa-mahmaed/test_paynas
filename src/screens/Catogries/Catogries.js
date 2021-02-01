import React, { Component, useState  ,useEffect} from 'react';
import { View, Text, Wrapper, Input, showError, Icon, Navigation ,List  } from '../../ui';
import { Image  ,ScrollView ,ActivityIndicator} from "react-native";
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import CardsList  from "../../components/CardsList";
import { useSelector } from 'react-redux';
import {responsiveWidth ,responsiveHeight} from '../../ui/utils/responsiveDimensions';
import Header from '../../components/Header';
import { API_ENDPOINT } from '../../configs';

const Catogries = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setloadingMore] = useState(false);
  const [pageIndex, setpageIndex] = useState(1);
  const [total, setTotal] = useState(0);
  const [newCat, setNewCat] = useState(false);
  const [list, setList] = useState([]);
  const [realEstateTypeID ,setRealEstateTypeID] =useState(1);
  const rtl = useSelector(state => state.lang.rtl);


   onCardPress = (route, item) => {
// Navigation.push("Catogries" ,passProps: { data: item })}
   
  }

  handleLoadMore = () => {
   

    if (list.length < total && !loading  && loadingMore ) {
      console.log("load more");
     setpageIndex(pageIndex + 1);
    //  setloadingMore(true);
     console.log("pageIndex inside loadmore"+ loadingMore);
     getData(pageIndex ,realEstateTypeID ,false);

     
    }else{
      console.log(` list.length :${list.length} - total : ${total} - loading :${loading} - "nextpage :${loadingMore} `);
      console.log(list.length < total && !loading  && loadingMore);
      console.log("not load more");

      // setloadingMore(false);
    }
  }


  

  const getData = (pageIndex ,realEstateTypeID  ,newCat) => {

   
    setLoading(true);
    console.log(loading);
    console.log("pageIndex"+ pageIndex + "realEstateTypeID" + realEstateTypeID ,"newCat" +newCat);
console.log("realEstateTypeID" + realEstateTypeID);
    // let url=`${API_ENDPOINT}/api/Offer/GetAll?AdvertisementID=1&RealEstateTypeID=${realEstateTypeID}&pageNumber=${pageIndex}&pageSize=5`
    let url=`${API_ENDPOINT}/api/Offer/GetAll?AdvertisementID=1&RealEstateTypeID=4&pageNumber=1&pageSize=5`
    console.log(url);
      Axios.get(url)
      .then(res => {
        console.log(res.data.data.totalCount);
        let total_Count=res.data.data.totalCount;
      let  NextPage=(res.data.data.nextPage ==="Yes")?true :false;
       
        setloadingMore(NextPage)
        console.log("total_Count" +total_Count);
        setTotal(total_Count)
        
        let result=res.data.data.data
        if(newCat){
         // setloadingMore(false);
          
          setList([...result]);
        }else{
          setList([...list ,...result]);

        }
        
         

         setLoading(false);
        
         setNewCat(false)
         
       
   
      })
      .catch(error => {
        setLoading(false)
         

      console.log("000000000000000000000000");
        console.log("error ", error)
      console.log("000000000000000000000000");

         console.log("error ", error.response)
        if (!error.response) {
          showError(I18n.t('ui-networkConnectionError'));
          return;
        } else {
          showError(I18n.t('MayBe_Error'));
        }
      });
  
  };

useEffect(() => getData(pageIndex,realEstateTypeID,newCat ,loadingMore), [pageIndex ||
 realEstateTypeID  || newCat ||loadingMore ]);



 renderCatogries = () => (

   <ScrollView 
       horizontal showsHorizontalScrollIndicator={false} 
        
         style={{flex:1}}>
       <View   mh={5}  center onPress={()=>{
   getData(1,1 ,true) 
}} >
      <Image  source={require('../../assets/images/1.jpg')} 
      style={{width:80 ,height:50  ,
    borderRadius:10 , 
    }}/>
          <Text size={6}>{I18n.t("villa")}</Text>
      </View>



<View mh={5}   center onPress={()=>{
   getData(1,2 ,true) 
}} >
      <Image  source={require('../../assets/images/1.jpg')} 
      style={{width:80 ,height:50  ,
    borderRadius:10 ,
    }}/>
          <Text size={6}>{I18n.t("flat")}</Text>
      </View>


      <View   mh={5}  center onPress={()=>{
   getData(1,3 ,true) 
}} >
      <Image  source={require('../../assets/images/1.jpg')} 
      style={{width:80 ,height:50  ,
    borderRadius:10 ,
    }}/>
          <Text size={6}>{I18n.t("resort")}</Text>
      </View>

      <View mh={5}  center onPress={()=>{
   getData(1,4,true) 
}} >
      <Image  source={require('../../assets/images/1.jpg')} 
      style={{width:80 ,height:50  ,
    borderRadius:10 ,
    }}/>
          <Text size={6}>{I18n.t("market")}</Text>
      </View>

      <View  mh={5} center onPress={()=>{
   getData(1,5 ,true) 
}} >
      <Image  source={require('../../assets/images/1.jpg')} 
      style={{width:80 ,height:50  ,
    borderRadius:10 ,
    }}/>
          <Text size={6}>{I18n.t("land")}</Text>
      </View>

      <View  mh={5}  center onPress={()=>{
   getData(1,6) 
}} >
      <Image  source={require('../../assets/images/1.jpg')} 
      style={{width:80 ,height:50  ,
    borderRadius:10 ,
    }}/>
          <Text size={6}>{I18n.t("building")}</Text>
      </View>
      </ScrollView> 
   
 )

  renderList = () => {
    return (
      <View   flex={9} style={{ alignItems: 'center'}}>
       

 {loading && (
          <ActivityIndicator
            size='small'
            color={colors.black}
            style={{flex: 1,
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

    renderSearch =()=>(
      <View mh={5} mt={4}>
      <Input
        
         leftItems={
          <Icon
            name="search"
            type={'EvilIcons'}
            size={12}
            pl={5}
            color={colors.orange}
          />
        }
        placeholder={I18n.t('search')}
        placeholderColor={colors.orange}
        placeholderFontSize={2}
        color={colors.black}
        backgroundColor={"#F4F4F4"}
       
      />
      </View>
    )

  return (
    <Wrapper  >
      {this.renderSearch()}
    {this.renderCatogries()}
    {this.renderList()}


    </Wrapper>
  );
};

export default React.memo(Catogries);
