import React, { Component } from 'react';
import { View, Text, Wrapper, Icon, ScrollView } from '../../ui';
import {Linking} from 'react-native'
import Header from '../../components/Header';
import colors from '../../ui/defaults/colors';
import I18n from 'react-native-i18n';
import { useSelector } from 'react-redux';


const AboutUs = () => {
  const rtl = useSelector(state => state.lang.rtl);

    return (
     <Wrapper  >
     <Header  backgroundColor={colors.orange} title={I18n.t('aboutUs')} tc={"white"} fontSize={40}/>

            <ScrollView stretch center mh={10} mt={5}>
              {/* <Text color={colors.orange} size={10}> {I18n.t('aboutUs')}</Text>    */}
              {rtl ?
              <Text  center color={colors.black} size={8}>
                
دلال هو مشروع يهدف إلى الارتقاء بصناعة المحتوى في العالم العربي
                        وتعزيز مهارات النشطاء في هذا المجال مع مراعاة
                        التغييرات التي تفرضها التقنيات الحديثة ووسائل التواصل الاجتماعي. حتى وقت ليس ببعيد ،
                        كانت صناعة المحتوى حكراً على فئة محدودة ، ممثلة بشكل رئيسي من قبل الصحفيين ، 4
                        الكتاب والمخرجين والمصورين المحترفين وغيرهم من المتخصصين ،
                        لكن التغييرات الملموسة التي حدثت في السنوات الأخيرة فتحت الباب على مصراعيه
                        للجميع ليكونوا صانعي محتوى بتكلفة منخفضة نسبيًا. الأكبر
                            يتمثل التحدي بشكل أساسي في إيجاد الأفكار والقدرة على التعبير عن الأدوات المتاحة واستخدامها
                        بشكل صحيح وخلاق.
              </Text>

              :<Text  center color={colors.black} size={8}>
                paynas is a project that aims to upgrade the content industry in the Arab world 
                        and enhance the skills of activists in this field, taking into account the 
                        changes imposed by modern technologies and social media. Until not long ago,
                        the content industry was the preserve of a limited category, represented mainly by journalists, 4
                        writers, filmmakers, professional photographers and other specialists,
                        but the tangible changes that occurred in recent years opened the door wide open
                        for everyone to be content makers at a relatively low cost. The biggest
                            challenge is mainly in finding ideas and the ability to express and use the available tools 
                        correctly and creatively.
              </Text>  }

              </ScrollView>


             
       
             
               
    
        </Wrapper>
    );
};

export default AboutUs;
