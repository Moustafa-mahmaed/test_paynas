import React, { Component } from 'react';
import { View, Text, Wrapper, Icon, ScrollView } from '../../ui';
import {Linking} from 'react-native'
import Header from '../../components/Header';
import colors from '../../ui/defaults/colors';
import I18n from 'react-native-i18n';
import { useSelector } from 'react-redux';

const TermsAndCondition = () => {
    const rtl = useSelector(state => state.lang.rtl);
    return (
     <Wrapper  >
     <Header  backgroundColor={colors.orange} title={I18n.t('TermsAndCondition')} tc={"white"} fontSize={40}/>

            <ScrollView stretch center mh={10} mt={5}>
              <Text color={colors.orange} size={10}> {I18n.t('TermsAndCondition')}</Text>   
              {rtl ?
              <Text color={colors.black} size={8}> 
             
يأخذ موقع انفلونسي هذا الخصوصية الشخصية على محمل الجد.  كقاعدة عامة ، لا تجمع  معلوماتك الشخصية إلا إذا اخترت ذلك
   لتزويدنا بهذه المعلومات. عندما تختار تزويدنا بمعلوماتك الشخصية ،
    أنت تمنح انفلونسي الإذن لاستخدام تلك المعلومات للأغراض المذكورة في سياسة الخصوصية هذه.
    إذا اخترت عدم تزويدنا بهذه المعلومات ،
    قد يحد من الميزات والخدمات التي يمكنك استخدامها على هذا الموقع.

    بشكل عام ، سيتم استخدام المعلومات التي تطلبها الأنفلونزا لتوفير ميزة
    أو خدمة لموقع الويب ، مثل التعليق أو الدعم ،
     أو تقديم محتوى مستقبلي يناسب اهتماماتك.
      ضمن عرضنا لسياسة الخصوصية هذه ،
      سيكون هناك وصف كامل للاستخدام المقصود من هذه المعلومات ،
      كيف يتم جمعها والتدابير الأمنية المتخذة لحمايتها ،
       بالإضافة إلى كيفية منح أو إبطال الموافقة على جمع واستخدام تلك المعلومات.
             

        </Text>   :
         <Text color={colors.black} size={8}> 
         This flu site takes personal privacy very seriously. \\n As a general rule, Influenza does not collect your personal information unless you choose
to provide this information to us. When you choose to provide us with your personal information,
you are granting Influenza permission to use that information for the purposes mentioned in this Privacy Policy. 
If you choose not to provide us with this information, 
it may limit the features and services that you can use on this website.

Generally, the information that Influenza requests will be used to provide a feature 
or service to the website, such as commenting, support,
or providing future content that suits your interests.
 Within our presentation of this privacy policy, 
 there will be a full description of the intended use of this information, 
 how it is collected and the security measures taken to protect it,
  in addition to how to grant or revoke consent to collect and use that information.
        

   </Text>}
              </ScrollView>


             
       
             
               
    
        </Wrapper>
    );
};

export default TermsAndCondition;
