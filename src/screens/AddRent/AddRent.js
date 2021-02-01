import React, { Component, useState  ,useEffect} from 'react';
import {
  View, Text, Wrapper, label, Input, showError,
    Button, Form,Icon,
  ScrollView, Image, Navigation, CheckBox, Picker,
  
  
} from '../../ui';
import { Formik } from 'formik';
import { Image as RNImage, TouchableOpacity  } from 'react-native'
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import Header from "../../components/Header";
import { validationVillaSchema ,validationFlatSchema,validationLandSchema ,validationMarketSchema, validationBuildingSchema  } from './validation';
import { API_ENDPOINT } from '../../configs';
import { useSelector } from 'react-redux';
import styles from './styles'
import Icons from 'react-native-vector-icons/Ionicons'
// import { MultipleSelectPicker } from 'react-native-multi-select-picker'
import { colorStyles } from '../../ui/Base';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';



const AddRent = () => {


  const [loading, setLoading] = useState(false);
  const [typeId, setTypeId] = useState('');
  const rtl = useSelector(state => state.lang.rtl);
    const user = useSelector(state => state.auth.user);

  const [countryId, setCountryId] = useState('');
  const [bathRooms, setBathRooms] = useState('');
  const [bedRooms, setBedRooms] = useState('');
  const [negotiable, setNegotiable] = useState('');
  const [furnished, setFurnished] = useState('');
  const [selectectedItems, setSelectectedItems] = useState([]);
  const [cityId, setCityId] = useState('');
   const [image1, selectedImage1] = useState(null);
   const [image2, selectedImage2] = useState(null);
   const [image3, selectedImage3] = useState(null);
   const [image4, selectedImage4] = useState(null);
   const [imageList, setImageList] = useState([])


   const [auxList, setAuxList] = useState([])

 
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
   
    
  
   


 

useEffect(() => {
  Axios.get(`${API_ENDPOINT}/api/Offer/GetAllLuxuires`)
  .then(response => {
 
  setAuxList([]);
  response.data.data.map(function (item ,key) {
  
    
  
   setAuxList(auxList =>[...auxList ,{"value":item.id ,"label":item.luxuryName}])
   
     })

  })
 // setAuxList(response.data.data)


}, [])


// checklistImage=()=>{
  
//  if(image1){

//    setImageList(imageList =>[...imageList ,{uri: image1.uri,
//                         type: 'image/jpeg',
//                         name: image1.fileName,}])
//  }
//  if(image2){

//    setImageList(imageList =>[...imageList ,{uri: image2.uri,
//                         type: 'image/jpeg',
//                         name: image2.fileName,}])
//  }
//  if(image3){

//    setImageList(imageList =>[...imageList ,{uri: image3.uri,
//                         type: 'image/jpeg',
//                         name: image3.fileName,}])
//  }
//  if(image4){

//    setImageList(imageList =>[...imageList ,{uri: image4.uri,
//                         type: 'image/jpeg',
//                         name: image4.fileName,}])
//  }
//  console.log("............imageList.................");
//  console.log(imageList);

//  console.log(".........................................");


// Axios({
//        url    : `${API_ENDPOINT}/api/UploadFile/FileUpload`,
//        method : 'POST',
//        data   : imageList,
//        headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'multipart/form-data',
//                    // 'Authorization':'Basic YnJva2VyOmJyb2tlcl8xMjM='
//                 }
//             })
//             .then(function (response) {
//                     console.log("response :", response.data);
//            })
//            .catch(function (error) {
//                     console.log("error from image :");
//            })

     
// }
  const onSubmit = values => {
     setLoading(true)
     var data= JSON.stringify({
         ...values
     })
  Axios
      .post(`${API_ENDPOINT}/api/Offer/SaveNew` ,
     
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
        
       
        setLoading(false)
        console.log("Done");
        Navigation.push({name:'Home'})

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


 



  const renderForm = ({ injectFormProps, handleSubmit ,setFieldValue ,errors  }) => (
 
    <View stretch  stretch  mh={5}  >
<View stretch mh={5}>
<Text  mt={5} style={styles.spaceText}>{I18n.t("addImg")}</Text> 

              <View  stretch  row spaceAround>
       <View mh={2}>       
     <TouchableOpacity       onPress={() => {
                let permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MEDIA_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
              ImagePicker.showImagePicker(options, (response) => {
                selectedImage1(response)
                
  
              });
            }}
              > 

  <RNImage
            source={image1 ? { uri: image1.uri } : require('../../assets/images/plus.png')}
            style={{
              height: 100,
              width: 100,
              
            }}
          />
          </TouchableOpacity>
          </View>
          

  <View mh={2} >       
     <TouchableOpacity       onPress={() => {
                let permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MEDIA_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
              ImagePicker.showImagePicker(options, (response) => {
                selectedImage2(response)

              });
            }}
              > 

  <RNImage
            source={image2 ? { uri: image2.uri } : require('../../assets/images/plus.png')}
            style={{
              height: 80,
              width: 80,
              
            }}
          />
          </TouchableOpacity>
          </View>
          

<View mh={2}>       
     <TouchableOpacity       onPress={() => {
                let permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MEDIA_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
              ImagePicker.showImagePicker(options, (response) => {
                selectedImage3(response)
              });
            }}
              > 

  <RNImage
            source={image3 ? { uri: image3.uri } : require('../../assets/images/plus.png')}
            style={{
              height: 80,
              width: 80,
              
            }}
          />
          </TouchableOpacity>
          </View>
          



          <View mh={2}>       
     <TouchableOpacity       onPress={() => {
                let permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MEDIA_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
              ImagePicker.showImagePicker(options, (response) => {
                selectedImage4(response)
              });
            }}
              > 

  <RNImage
            source={image4 ? { uri: image4.uri } : require('../../assets/images/plus.png')}
            style={{
              height: 80,
              width: 80,
              
            }}
          />
          </TouchableOpacity>
          </View>
{/* 
 {errors. && <Text size={5.5} mb={5} color={colors.error}>{` ${I18n.t('city')} ${I18n.t('required')}`}</Text>}
       */}
               </View>
       
</View>


 <View  stretch mh={5} >


      <Text style={styles.bedAndBathRoomsText}>{I18n.t('title')}</Text>
 
      <Input
        {...injectFormProps('title')}
        placeholder={I18n.t('addTitle')}
        placeholderColor={colors.gray}
        color={colors.black}
        borderColor={colors.orange}
       
      />
 </View >
 <View stretch mh={5}>
 <Text mt={5} style={styles.spaceText}>{I18n.t('description')}</Text> 
      
     <Input
        {...injectFormProps('description')}
        placeholder={I18n.t('addDescription')}
        placeholderColor={colors.gray}
        color={colors.black}
        borderColor={colors.orange}
        height={20}
       
      />
 </View>



{/* ////////////////////////////////// */}
 
<View stretch row spaceAround >
<View  width={40}  >
<Text  style={styles.spaceText}>{I18n.t('price')}</Text> 
<Input 
placeholder={I18n.t('price')}
        placeholderColor={colors.gray}
        color={colors.black} 
        {...injectFormProps('price')}
        borderColor={colors.orange}
        number

      />
      </View>
      <View   width={40} >
      <Text style={styles.bedAndBathRoomsText}>{I18n.t('negotiable')}</Text>
  
      <Picker
          
               
            placeholder={I18n.t('negotiable')}
            
            data={ [
              {label:"Yes",value:true},
              {label:"No",value:false}
                   ]
                 }

              onChange={(value, ) => { 
               setNegotiable(value)
             setFieldValue('negotiable', value)               
                }
               }
          />

{errors.negotiable && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('negotiable')}  ${I18n.t('required')}`}</Text>}
</View>

</View>


<View stretch row  style={(typeId == 3 || typeId == 5 || typeId == 6   ) ?{ marginLeft:15 , marginRight:15 }:{
     justifyContent: 'space-around'
      } } >
<View  width={40}  >
<Text  style={styles.spaceText}>{I18n.t('area')}</Text> 
<Input  
      placeholder={I18n.t('area')}
      {...injectFormProps('area')}
      placeholderColor={colors.gray}
      color={colors.black} 
      borderColor={colors.orange}
      number
      />

      </View>
   {(typeId == 1 || typeId == 2 || typeId == 4 ) ? 
      <View  width={40} >
      <Text 
       style={styles.bedAndBathRoomsText}
       >{I18n.t('furnished')}</Text>
  
      <Picker
          
               
            placeholder={I18n.t('furnished')}
            placeholderColor={colors.gray}
            color={colors.gray} 
            data={[
                {label:"Yes",value:true},
                {label:"No",value:false}
                   ]
                 }

              onChange={(value, ) => { 
               setFurnished(value)
             setFieldValue('furnished', value)
                } 
                }
          />

{errors.furnished && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('furnished')}  ${I18n.t('required')}`}</Text>}
</View>
:null}

</View>
{(typeId == 1 ||typeId == 2  ||typeId == 4) ? 

<View row stretch spaceAround  >
 <View  width={40} >
      <Text style={styles.bedAndBathRoomsText}>{I18n.t('bedRoom')}</Text>
  
      <Picker
            placeholder={I18n.t('bedRoom')}
            data={[
               {label:"1",value:1},
               {label:"2",value:2},
               {label:"3",value:3},
               {label:"4",value:4},
               {label:"5",value:5},
               {label:"6",value:6}
               ]}

              onChange={(value, ) => { 
               setBedRooms(value)
             setFieldValue('bedRoomNumbers', value)
                }
               }
          />

{errors.bedRoomNumbers && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('bedRoom')}  ${I18n.t('required')}`}</Text>}
</View>

<View width={40}>

      <Text style={styles.bedAndBathRoomsText}>{I18n.t('bathRoom')}</Text>
  
      <Picker
          
               
            placeholder={I18n.t('bathRoom')}
            
            data={[
                   {label:"1",value:1},
                   {label:"2",value:2},
                   {label:"3",value:3},
                   {label:"4",value:4},
                   {label:"5",value:5},
                   {label:"6",value:6}
                 ]}

              onChange={(value, ) => { 
               setBathRooms(value)
             setFieldValue('bathroomNumber', value)
                }
               }
          />

{errors.bathroomNumber && <Text size={5.5} mb={5} color={colors.error}>{` ${I18n.t('bathRoom')} ${I18n.t('required')}`}</Text>}

</View>


</View>
:null}

{/* floor  */}
<View row stretch  mh={5}  >
 
 {(typeId == 2 || typeId == 4) ? 
 <View  width={40} >
      <Text style={styles.bedAndBathRoomsText}>{I18n.t('floorNumber')} </Text>
  
      <Picker
            placeholder={I18n.t('floorNumber')}
            data={[
                   {label:"1",value:1},
                   {label:"2",value:2},
                   {label:"3",value:3},
                   {label:"4",value:4},
                   {label:"5",value:5},
                   {label:"6",value:6},
                   {label:"7",value:7},
                   {label:"8",value:8},
                   {label:"9",value:9},
                   {label:"10",value:10},
                   {label:"11",value:11},
                   {label:"12",value:12},
                   {label:"13",value:13},
                   {label:"14",value:14},
                   {label:"15",value:15},
                   {label:"16",value:16},
                   {label:"17",value:17},
                   {label:"18",value:18}
                 ]}

              onChange={(value, ) => { 
               setBedRooms(value)
             setFieldValue('floorNumber', value)               
                }
               }
          />

{errors.floorNumber && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('floorNumber')}  ${I18n.t('required')}`}</Text>}
</View>
:null}
{typeId == 1 || typeId == 6 ?
<View width={45}>

      <Text style={styles.bedAndBathRoomsText}>{I18n.t('numberFloor')}</Text>
  
      <Picker  
            placeholder={I18n.t('numberFloor')}
            data={[
                   {label:"1",value:1},
                   {label:"2",value:2},
                   {label:"3",value:3},
                   {label:"4",value:4},
                   {label:"5",value:5},
                   {label:"6",value:6},
                   {label:"7",value:7},
                   {label:"8",value:8},
                   {label:"9",value:9},
                   {label:"10",value:10},
                   {label:"11",value:11},
                   {label:"12",value:12},
                   {label:"13",value:13},
                   {label:"14",value:14},
                   {label:"15",value:15},
                   {label:"16",value:16},
                   {label:"17",value:17},
                   {label:"18",value:18}
                   ]}

              onChange={(value, ) => { 
               setBathRooms(value)
               setFieldValue('numberOfFloors', value) 
               }
               }
          />

{errors.numberOfFloors && <Text size={5.5} mb={5} color={colors.error}>{` ${I18n.t('numberFloor')} ${I18n.t('required')}`}</Text>}

</View>
:null}

</View>




{/* ======================= Country ============================ */}

<View mv={5}   mh={countryId !== "" ? 0:5} stretch row flex   style={countryId !== ""  ?{   justifyContent: 'space-around' }:null } > 


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
           {errors.tblCountriesId && <Text size={5.5} mb={5} color={colors.error}>{` ${I18n.t('country')} ${I18n.t('required1')}`}</Text>}
        </View>
 {countryId !=="" ?
         <View stretch width={40} >
           <Picker
              // {...injectFormProps('CityID')}
            placeholder={I18n.t('city')}
            showSearchFilter
            onChange={(value ) => { setCityId(value) 
             setFieldValue('tblCitiesId', value) 
            //  for rent form
             setFieldValue('advertisementID', 1) 
             setFieldValue('realEstateTypeID', typeId ) 
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
{/* ============================================================== */}
 
 <View stretch mh={5}>
<Text style={styles.spaceText}> {I18n.t("address")}</Text> 
         <Input
        {...injectFormProps('address')}
        placeholder={I18n.t('address')}
        placeholderColor={colors.gray}
        color={colors.black}
        borderColor={colors.orange}
        height={7}
      />
      </View>
      
 <View stretch mh={5}>
<Text style={styles.spaceText}>{I18n.t("contactNo")}</Text> 
         <Input
          leftItems={
          <Icon
            name="contacts"
            type={'AntDesign'}
            size={12}
            pl={5}
            color={colors.grey}
          />
        }
         phoneNumber
        {...injectFormProps('contactNumber')}
        placeholder={I18n.t('addContact')}
        placeholderColor={colors.gray}
        color={colors.black}
        borderColor={colors.orange}
        // height={5}
        
       
      />
      </View>

{/*=================== aux =========================== */}

{/* <ScrollView >
               
                    <Text>Aux</Text>
               
                 <MultipleSelectPicker
                    items={ auxList}
          
                    onSelectionsChange={(ele) => {setSelectectedItems(ele),
                    setFieldValue('aux', selectectedItems)

                     }}
                    selectedItems={ 
                      selectectedItems

                    }
                   rowStyle={{ flex:1}}
                   
                    // buttonText='hello'
                    checkboxStyle={{ height: 30, width: 30  }}
                />
                   
 
         
            </ScrollView > */}
         <View stretch mh={5}>

         {typeId == 5 ? 
            <Picker
          
              // {...injectFormProps('CountryID')}
            placeholder={I18n.t('Typeland')}
            showSearchFilter
              onChange={(value ) => { 
             setFieldValue('earthTypeID', value) 
            
            }}
            apiRequest={{
              url: `${API_ENDPOINT}/api/Offer/GetAllEarthType`,
              params: {},
              responseResolver: response => {
             
                return {
                   data: response.data.data,
                };
              },
              transformData: item => (
                
            
                {
                label:item.earthTypeName,
//: item.realEstateTypeName,
               // value:item.id, 
              }
              ),
            }
            }
          />
          :null}
          {errors.earthTypeID && <Text size={5.5} mb={5} color={colors.error}>{` ${I18n.t('Typeland')} ${I18n.t('required')}`}</Text>}
          </View>
{/*=================== aux =========================== */}



          
<View stretch center style={{         }}>
       
           
           <Button
        title={I18n.t('add')}
        stretch
         onPress={loading ? null : handleSubmit}
        processing={loading}
        m={10}
        color={colors.white}
        backgroundColor={colors.orange}
        borderRadius={20} 
        
      />
      </View>
 
 



    </View >
  );


  return (
     
      <ScrollView flex stretch center backgroundColor={colors.white}  >
      <Header  backgroundColor={colors.orange} title={I18n.t('AddRent')} 
      tc={"white"} fontSize={40}
      />
     
     <View stretch   mh={7} mt={5}>
      <Picker
          
              // {...injectFormProps('CountryID')}
            placeholder={I18n.t('typeBuilding')}
            showSearchFilter
             onChange={(value ) => { 
            setTypeId(value) 
            
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
              }),
            }
            }
          />
          </View>
          {(typeId  && typeId ==1) ?
       <Form
          schema={{
              title:'',
              description:"",
              price:'',
              furnished:'',
              area:'',
              negotiable:'',
              bathroomNumber:'',
              bedRoomNumbers:'',
              tblCountriesId:'',
              tblCitiesId:'',
              address:'',
              contactNumber:'',
             numberOfFloors:''
          }}
          onSubmit={onSubmit}
          render={renderForm}
            validationSchema={validationVillaSchema}
        />
        :null 
}
        {(typeId  && (typeId ==2 || typeId == 4) ) ?
       <Form
          schema={{
              title:'',
              description:"",
              price:'',
              furnished:'',
              area:'',
              negotiable:'',
              bathroomNumber:'',
              bedRoomNumbers:'',
              tblCountriesId:'',
              tblCitiesId:'',
              address:'',
              contactNumber:'',
             floorNumber:''
          }}
          onSubmit={onSubmit}
          render={renderForm}
            validationSchema={validationFlatSchema}
        />
        :null 
}

   {(typeId  && typeId == 3 ) ?
       <Form
          schema={{
              title:'',
              description:"",
              price:'',
              area:'',
              negotiable:'',
              tblCountriesId:'',
              tblCitiesId:'',
              address:'',
              contactNumber:'',
          }}
          onSubmit={onSubmit}
          render={renderForm}
            validationSchema={validationMarketSchema}
        />
        :null 
}


   {(typeId  &&  typeId == 5 ) ?
       <Form
          schema={{
              title:'',
              description:"",
              price:'',
              area:'',
              negotiable:'',
              tblCountriesId:'',
              tblCitiesId:'',
              address:'',
              contactNumber:'',
              earthTypeID: ''
          }}
          onSubmit={onSubmit}
          render={renderForm}
            validationSchema={validationLandSchema}
        />
        :null 
}

{(typeId  && typeId == 6 ) ?
       <Form
          schema={{
              title:'',
              description:"",
              price:'',
              area:'',
              negotiable:'',
              tblCountriesId:'',
              tblCitiesId:'',
              address:'',
              contactNumber:'',
             numberOfFloors:'',
              offerAttachments:[]
            
          }}
          onSubmit={onSubmit}
          render={renderForm}
            validationSchema={validationBuildingSchema}
        />
        :null 
}
      </ScrollView>
    

  );
};

export default AddRent;
