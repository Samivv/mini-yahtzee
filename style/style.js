import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 0,
    paddingTop: 25,
    paddingBottom:15,
    backgroundColor: '#2B2B52',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 'auto',
    backgroundColor: '#2B2B52',
    flexDirection: 'row',
  },
  title: {
    color: '#F5F5F5',
    // fontWeight: 'bold',
    fontFamily: 'Header',
    flex: 1,
    fontSize: 35,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#F5F5F5',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    // backgroundColor: '#F5F5F5',
    backgroundColor: '#AEDFF7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#F5F5F5',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,

  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonLeft: {
    position: 'absolute',
    bottom:9,
    left:0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2B2B52',
    padding: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonRight: {
    position: 'absolute',
    bottom:9,
    right:0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2B2B52',
    padding: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  restartButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },
  buttonText: {
    color:"#F5F5F5",
    fontSize: 20,
    textAlign: 'center',
    marginLeft: 10,
    fontFamily: 'Kanit'
  },
  playButton: {
    marginTop:7,
    borderRadius: 5,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#2B2B52',
    padding: 10,
  },
  playButton2: {
    marginTop:5,
    borderRadius: 5,
    marginBottom: 'auto',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#2B2B52',
    padding: 10,
  },
  icon: {
    alignSelf: 'center'
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    alignSelf: 'center'
  },
  input: {
    height: 40,
    width: '80%',
    fontFamily: 'Kanit',
    borderColor: '#2B2B52',
    alignSelf: 'center',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  okButton: {
    width: "80%",
    alignSelf:'center',
    backgroundColor: '#2B2B52',
    padding: 10,
    borderRadius: 5,
  },
  okButtonText: {
    color: '#F5F5F5',
    textAlign: 'center',
    fontFamily: 'Kanit',
    fontWeight: 'bold'
  },
  highlight: {
    fontFamily: 'KanitBig',
  },
  highlightCentered: {
    fontFamily: 'KanitBig',
    textAlign: 'center',
    fontSize: 25,
    borderBottomWidth: 2,
    borderBottomColor: '#2B2B52',
  },
  throwsText: {
      fontSize: 18,
      marginBottom: 10,
  },
  statusText: {
      fontSize: 16,
      marginBottom: 20,
      color: 'green'
  },
  gameButton: {
      backgroundColor: '#2B2B52',
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
  },
  gameText: {
      color: '#F5F5F5',
      textAlign: 'center',
      fontSize: 18,
  },
  playerNameText: {
      fontSize: 20,
      marginTop: 20,
  },
  rowContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  scoreboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  scoreboardEmptyText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2B2B52',
  },
  scoreboardEmptyIcon: {
    marginTop: 100,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  scoreboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2B2B52',
  },
  scoreboardCell: {
    flex: 1,
    alignItems: 'center',
  },
  scoreboardCellText: {
    fontSize: 12,
    color: '#2B2B52',
    flex: 1,
    flexWrap: 'wrap',
    paddingHorizontal: 5
  },
  scoreboardClearButton: {
    backgroundColor: '#FF5733',
    padding: 10,
  },
  scoreboardClearButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  }, statusBox: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B2B52',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 20,
  },
  statusLabel: {
    fontWeight: 'bold',
    fontFamily: 'Header',
    fontSize: 15,
    marginRight: 5,
    color: 'white',
    flex: 1
  },
  statusText: {
    fontWeight: 'bold',
    flex:4
  },
  restartContainer: {
    position: 'absolute',
    top: 68,
    right:0,
  },
  borders: {
    borderWidth:1,
    backgroundColor: '#2B2B52',
  },
  throwButton: {
    marginTop: 20,
    marginBottom: 20,
    height:100
  },
  noAdjust: {
    maxWidth:90,
    justifyContent: 'center'
  },
  rules: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 10,
    width: "100%",
    height: "100%"
  }, gameboardLabel: {
    fontSize: 18,
    fontFamily: 'Kanit',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  rulesText: {
    fontFamily: 'Kanit',
  },
  playButtonContainer: {
    marginTop: 20,
    marginBottom: 20,
    borderTopWidth: 2
  },

});