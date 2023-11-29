import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Dot from './Dot'

const Pagination = ({data,x}) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_,index) =>{
        return <Dot key={index} index={index} x={x} />
      })}
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection:'row',
        height:64,
        justifyContent:'center',
        alignItems:'center',
    },
});