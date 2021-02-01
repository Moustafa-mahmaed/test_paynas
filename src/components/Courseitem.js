
import React, { Component } from 'react'
// import { View, Text, Button, responsiveWidth } from '../ui';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation } from '../ui';
import I18n from 'react-native-i18n';

import colors from '../ui/defaults/colors';
// import { Text, View } from 'react-native'

// import styles from './styles'

export default class index extends Component {
  render() {
    const { CourseName ,CourseDes ,Data ,Time ,Subscribers ,seats } = this.props;
    return (
      <View  stretch center pv={5}   >

          <View   height={29}  center ph={2}   width={95} style={{
         
          borderRadius: 10,
          overflow: 'hidden',
          borderColor: '#999',
          borderWidth: 0.5,
         
          backgroundColor: '#FFF',
         
          elevation: 4
        }} >
          <View  row  height={15} width={100} >
                 <Icon
              style={{flex:.5}}
            name="photo"
            type={'Foundation'}
            size={30}
            ph={4}
            color={colors.graytextC}
          /> 
          <View  style={{flex:1.5}}>
            <Text size={9}  color={colors.blue}>{CourseName}</Text>
              <Text size={7}  color={colors.graytextC}>{CourseDes}</Text>
          
          </View> 
             <Icon
             style={{flex:.5}}
            name="dots-three-vertical"
            type={'Entypo'}
            size={12}
            pl={5}
            color={colors.blue}
          />
          </View>

           <View  row   height={15}  width={95}   >
                  <View  style={{flex:1 ,justifyContent: 'space-between', alignItems: 'center', }}
                   ph={2} center borderLeftWidth={1} borderTopWidth={1}  height={12} borderColor={colors.graytextC}> 
                 
                 
                  <Text size={7}  color={colors.blue}>{I18n.t('dateTime')}</Text>
                 
                  <View  mt={2} center>
                  <Text size={6} color={colors.orange} >{Data}</Text>
                  <Text size={6} color={colors.orange} >{Time}</Text>
                  </View>
                  </View>
                 
                 

                     <View style={{flex:1 ,justifyContent: 'space-between', alignItems: 'center', }} ph={2} borderLeftWidth={1} borderTopWidth={1}   height={12} borderColor={colors.graytextC}> 
                  <Text size={7} color={colors.blue}>{I18n.t('subscriber')}</Text>
                  <Text size={7} color={colors.orange}  >{Subscribers}</Text>
                  
                  
                  </View>

                    <View  style={{flex:1 ,justifyContent: 'space-between', alignItems: 'center', }}
                     ph={2} borderLeftWidth={1} borderTopWidth={1}  height={12}  borderColor={colors.graytextC}  > 
                  <Text size={7} color={colors.blue}>{I18n.t('availableseats')}</Text>
                  <Text size={7} color={colors.orange} >{seats}</Text>
                  
                  
                  </View>



          </View>
          </View>
          </View>

    )
  }
}

