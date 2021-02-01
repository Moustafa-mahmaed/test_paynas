import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values => {
  return yup.object().shape({

    newpassword: yup
      .string()
      .required(`${I18n.t('password')} ${I18n.t('required1')}`),
    reenterpassword: yup
      .string()
      .required()
      .when("newpassword", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf(
      [yup.ref("newpassword")],
      "Both password need to be the same"
    )
  })
      
  });
};
