import colors from '../../ui/defaults/colors';
export default {
  rangeSlider: {
 alignSelf:'flex-start',
 marginLeft:20,
//  marginTop:5
 


  },
  sliders: {
    margin: 20,
    width: 300,
  },
  text1: {
    alignSelf: 'center',
    paddingVertical: 20,
    color:'black',
    
  },
  text2: {
    alignSelf: 'center',
    paddingVertical: 20,
    color:'black',
    marginLeft:200
  },
  title: {
    fontSize: 18, 
    color:'black',
    
 },
  sliderOne: {
     flexDirection: 'row',
    justifyContent: 'space-around',
  marginLeft:15
   
    },
    bedRooms:{
      flex: 1,
      width:50,
      height:50,  
       borderWidth: 5,
      borderRadius:10, 
      backgroundColor:'red', 
      borderColor:colors.gray ,
    marginLeft:10
    },
    bedRoomsNumber:{
      alignSelf:'center',
      //  marginTop:5,
    color:'black',

    },
    spaceText:{
      // marginTop:5,
      color:'black',
     },
    type:{
        marginLeft:10,
      backgroundColor:'red', 

    },
    area:{
      marginLeft:10,
      backgroundColor:'red', 
      marginTop:2
    }
   
}
