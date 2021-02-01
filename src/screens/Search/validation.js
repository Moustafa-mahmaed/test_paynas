import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values => {
  return yup.object().shape({
    realEstateTypeID: yup
    .string()
   ,
      space: yup
      .number(`${I18n.t('area')} ${I18n.t('required')}`)
     ,
      FromPrice: yup
      .number()
      .required(`${I18n.t('FromPrice')} ${I18n.t('required')}`),
      toPrice: yup
      .number()
      .required(`${I18n.t('toPrice')} ${I18n.t('required')}`),
      rentOrSell: yup
      .string()
      .required(`${I18n.t('rentOrSell')} ${I18n.t('required')}`),
      tblCountriesId: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`),
      tblCitiesId: yup
      .string()
      .required(`${I18n.t('address')} ${I18n.t('required')}`),
  
   });
};
