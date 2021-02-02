import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values => {
  return yup.object().shape({
    code: yup
    .number().
    integer().
    required(`${I18n.t('code')} ${I18n.t('required')}`)
  });
};
