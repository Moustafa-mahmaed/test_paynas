import React, { Component } from 'react'

import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text
} from 'react-native'
import CardsListItem from '../CardsListItem'
import colors from '../../ui/defaults/colors';

import {Navigation} from "../../ui"
import styles from './styles'
import NoDate from '../NoDate';

class CardsList extends Component {
  render () {
    // // // //console.log(this.props)
     const { style, onItemPress, data, handleLoadMore, loadingMore } = this.props

    return (
     
      <View
        style={{justifyContent:'center'}}
      >
      { data && data.length > 0 ?
        <FlatList
        style={[styles.list, style]}
        data={data}
        extraData={data}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        numColumns={1}
        keyExtractor={(_, index) => `${index}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
            
                   Navigation.push({
                                name: 'PostDetails',
                                passProps: {data : item}})
          }
            style={styles.item}
          >
            <CardsListItem data={item} />
          
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <View style={styles.loadingMore}>
            {loadingMore && (
              <ActivityIndicator
                color="black"
                style={styles.fetching}
                size='small'
              />
            )}
          </View>
        }
      />
      :
      // <View style={{margin:10}}>
      // <NoDate />
      // </View>
      null
  }
      </View>
    
    )
  }
}




export default CardsList
