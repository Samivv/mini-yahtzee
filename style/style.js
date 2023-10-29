import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    marginTop: 0,
    marginBottom: 15,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
  },
  footer: {
    marginTop: "auto",
    backgroundColor: 'skyblue',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
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
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  playButton: {
    marginTop:50,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    marginBottom: 20,
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
    borderColor: 'gray',
    alignSelf: 'center',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  okButton: {
    width: "80%",
    alignSelf:'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  okButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  highlight: {
    fontWeight: 'bold',

  },
  throwsText: {
      fontSize: 18,
      marginBottom: 10,
  },
  statusText: {
      fontSize: 16,
      marginBottom: 20,
  },
  gameButton: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
  },
  gameText: {
      color: 'white',
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
  },scoreboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},
scoreboardEmptyText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 100,
},
scoreboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
},
scoreboardCell: {
    flex: 1,
    alignItems: 'center',
},
scoreboardCellText: {
    fontSize: 16,
},
scoreboardClearButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
},
scoreboardClearButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
},
});