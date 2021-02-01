import React, { Component } from 'react'
import { View, Text ,Icon, Navigation } from '../ui';

import colors from '../ui/defaults/colors';


export default class index extends Component {
  render() {
    const { ProfileName ,ProfileType ,screenName } = this.props;
    return (
      <View stretch center
       onPress={() => Navigation.push(this.props.screenName)}
       >
       <View backgroundColor={colors.orange} 
            mh={4} p={2}  borderRadius={5} row>

              <Icon
             style={{flex:.5}}
            name="user"
            type={'EvilIcons'}
            size={20}
            ph={5}
            color={colors.white}
          />

             <View  style={{flex:3 }}
              >

            <Text size={8}  color={colors.white}>{ProfileName}</Text>
            <Text size={6} color={colors.blue}>{ProfileType}</Text>
            </View>


            {/* <Text style={{flex:.25}}>dddd</Text> */}
             <Icon
             style={{flex:.25}}
            name="dots-three-vertical"
            type={'Entypo'}
            size={12}
            pl={5}
            color={colors.white}
          />
            </View>
      </View>
    )
  }
}

