import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values => {
  return yup.object().shape({
    userName: yup
      .string()
      .required(`${I18n.t('fullName')} ${I18n.t('required')}`),
       email: yup
      .string()
      .email()
      .required(`${I18n.t('email')} ${I18n.t('required')}`),
    phoneNumber: yup
      .string()
      .required(`${I18n.t('phoneNumber')} ${I18n.t('required')}`),
      password: yup
      .string()
      .required(`${I18n.t('password')} ${I18n.t('required1')}`),
      confirmPassword: yup
      .string()
      .required(`${I18n.t('confirmPassword')} ${I18n.t('required1')}`)
      .when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf(
      [yup.ref("password")],
      "Both password need to be the same"
    )
  }) ,
  tblCitiesId: yup
  .string()
  .required(`${I18n.t('address')} ${I18n.t('required1')}`),
  tblCountriesId: yup
  .string()
  .required(`${I18n.t('address')} ${I18n.t('required1')}`),
    //   tblCountriesId: yup
    //   .string()
    //   .required(`${I18n.t('country')} ${I18n.t('required1')}`),
    // tblCitiesId: yup
    //   .string()
    //   .required(`${I18n.t('city')} ${I18n.t('required')}`),

   });
};
