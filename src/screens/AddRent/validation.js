import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationVillaSchema = values => {
  return yup.object().shape({
     
    title: yup
      .string()
      .required(`${I18n.t('addTitle')} ${I18n.t('required')}`)
      ,
      
      description: yup
      .string()
      .required(`${I18n.t('description')} ${I18n.t('required')}`)
      ,
      price: yup
      .number()
      .required(`${I18n.t('price')} ${I18n.t('required')}`),
      negotiable: yup
      .boolean()
      .required(`${I18n.t('negotiable')} ${I18n.t('required')}`),
      
      bathroomNumber: yup
      .string()
      .required(`${I18n.t('bathRoom')} ${I18n.t('required')}`)
       ,
      bedRoomNumbers: yup
      .number()
      .required(`${I18n.t('bedRoom')} ${I18n.t('required')}`) ,
       numberOfFloors: yup
       .number()
       .required(`${I18n.t('numberFloor')} ${I18n.t('required')}`) ,
      area: yup
      .number()
      .required(`${I18n.t('area')} ${I18n.t('required')}`),
        furnished: yup
       .boolean()
       .required(`${I18n.t('furnished')} ${I18n.t('required')}`),
       tblCitiesId: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`)
      ,
      tblCountriesId: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`)
      ,
      address: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`)
      ,
      contactNumber: yup
      .string()
      .required(`${I18n.t('contact')} ${I18n.t('required')}`)
      ,
       });
};



export const validationFlatSchema = values => {
  return yup.object().shape({
     
    title: yup
      .string()
      .required(`${I18n.t('addTitle')} ${I18n.t('required')}`)
      ,
      
      description: yup
      .string()
      .required(`${I18n.t('description')} ${I18n.t('required')}`)
      ,
      price: yup
      .number()
      .required(`${I18n.t('price')} ${I18n.t('required')}`),
      negotiable: yup
      .boolean()
      .required(`${I18n.t('negotiable')} ${I18n.t('required')}`),
      
      bathroomNumber: yup
      .string()
      .required(`${I18n.t('bathRoom')} ${I18n.t('required')}`)
       ,
      bedRoomNumbers: yup
      .number()
      .required(`${I18n.t('bedRoom')} ${I18n.t('required')}`) ,
      floorNumber: yup
      .string()
      .required(`${I18n.t('floorNumber')} ${I18n.t('required')}`)
       ,
      area: yup
      .number()
      .required(`${I18n.t('area')} ${I18n.t('required')}`),
       furnished: yup
      .boolean()
      .required(`${I18n.t('furnished')} ${I18n.t('required')}`),
       tblCitiesId: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`)
      ,
      tblCountriesId: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`)
      ,
      address: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`)
      ,
      contactNumber: yup
      .string()
      .required(`${I18n.t('contact')} ${I18n.t('required')}`)
      ,
       });
};


export const validationMarketSchema = values => {
  return yup.object().shape({
      title: yup
      .string()
      .required(`${I18n.t('addTitle')} ${I18n.t('required')}`),
      description: yup
      .string()
      .required(`${I18n.t('description')} ${I18n.t('required')}`),
      price: yup
      .number()
      .required(`${I18n.t('price')} ${I18n.t('required')}`),
      negotiable: yup
      .boolean()
      .required(`${I18n.t('negotiable')} ${I18n.t('required')}`),
      area: yup
      .number()
      .required(`${I18n.t('area')} ${I18n.t('required')}`),
       tblCitiesId: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`),
      tblCountriesId: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`),
      address: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`),
      contactNumber: yup
      .string()
      .required(`${I18n.t('contact')} ${I18n.t('required')}`)
       });
};


export const validationLandSchema = values => {
  return yup.object().shape({
      title: yup
      .string()
      .required(`${I18n.t('addTitle')} ${I18n.t('required')}`),
      description: yup
      .string()
      .required(`${I18n.t('description')} ${I18n.t('required')}`),
      price: yup
      .number()
      .required(`${I18n.t('price')} ${I18n.t('required')}`),
      negotiable: yup
      .boolean()
      .required(`${I18n.t('negotiable')} ${I18n.t('required')}`),
      area: yup
      .number()
      .required(`${I18n.t('area')} ${I18n.t('required')}`),
      //  earthTypeID: yup
      // .string()
      // .required(`${I18n.t('Typeland')} ${I18n.t('required')}`),
       tblCitiesId: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`),
      tblCountriesId: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`),
      address: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`),
      contactNumber: yup
      .string()
      .required(`${I18n.t('contact')} ${I18n.t('required')}`)
       });
};

export const validationBuildingSchema = values => {
  return yup.object().shape({
      title: yup
      .string()
      .required(`${I18n.t('addTitle')} ${I18n.t('required')}`),
      description: yup
      .string()
      .required(`${I18n.t('description')} ${I18n.t('required')}`),
      price: yup
      .number()
      .required(`${I18n.t('price')} ${I18n.t('required')}`),
      negotiable: yup
      .boolean()
      .required(`${I18n.t('negotiable')} ${I18n.t('required')}`),
      area: yup
      .number()
      .required(`${I18n.t('area')} ${I18n.t('required')}`),
       tblCitiesId: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`),
      tblCountriesId: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`),
      address: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`),
      contactNumber: yup
      .string()
      .required(`${I18n.t('contact')} ${I18n.t('required')}`)
       });
};
