import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

  /* Text Styles */
  heading: { 
    fontFamily: 'Inter-ExtraBold',
    color: 'white',
    fontSize: 21,
  },









  subHeading: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },

  bigHeading: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 24,
    color: '#F2BE5C',
    textAlign: 'center'
  },
  
  helpAndContact: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 40,
  },

  bodyText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    textAlign: 'center'
  },

  textContainer: {
    width: 300,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },

  container: {
    flex: 1,
  },


  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },

  BFriendLogo: {
    width: 200,
    height: 43,
  },

  textInput: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    width: 300,
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    height: 40

  },
})

  export default styles