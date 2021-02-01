import React, { Component } from 'react'

import { Image as RNImage ,Dimensions    } from 'react-native'
import { View, Text, Button, responsiveWidth, Navigation } from '../ui';
import colors from '../ui/defaults/colors';
import { connect } from 'react-redux';
import { API_ENDPOINT } from '../configs';

const {width ,height}=Dimensions.get('window');

class Carditem extends Component {
  
  constructor(props) {
        super(props);

        this.state = {
            rtl: props.rtl
           
        };
    }
  render() {
    const {rtl}=this.state;
let {item}=this.props;
    return (
     <View m={4} style={rtl?{transform:[{scaleX:-1}]} :null } >
      <View stretch  
        onPress={() =>
                Navigation.push({
                                name: 'PostDetails',
                                passProps: {data : item}})
          }
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          borderColor: '#999',
          borderWidth: 0.5,
          backgroundColor: '#FFF',
          elevation: 4,
            
            
        }}
      >
       {
         item.attachments.length > 0 ?
       
        <RNImage
          source={{uri:`${API_ENDPOINT}${item.attachments[1]}`}}
          style={{
            height:100,
            width:200,
            
            

          }}
        /> 
        :
         <RNImage
          source={require('../assets/images/No_img.png')}
          style={{
            height:100,
            width:200,
            
            

          }}
        /> 
        }
        </View>   

        <View m={4}  row center SpaceBetween>
      
        <View  flex mh={2} >
        <Text color={colors.black} size={8}>{item.title.substring(0, 10)}</Text>
        <Text color={colors.gray} size={7}>
        {rtl ? item.arabicCountryName : item.englishCountryName}
        </Text>
        </View>

        <View flex  center>
        <Text color={colors.gray} size={7}>{item.price}</Text>
        <Text color={colors.gray} size={7}>{rtl ? item.arabicCityName : item.englishCityName}</Text>
        </View>
  
   
   
   
        </View>

         
      </View>
    )
  }
}
const mapStateToProps = state => ({
  rtl: state.lang.rtl,

}
);


export default connect(
  mapStateToProps,
  null
)(Carditem);