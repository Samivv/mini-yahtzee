import { useContext, useState } from "react"
import { TextInput, Text, View, Keyboard, TouchableHighlight, Alert, TouchableOpacity, Vibration } from "react-native"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header'
import Footer from './Footer'
import { NBR_OF_DICES, NBR_OF_THROWS,MAX_SPOT, MIN_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from "../constants/Game";
import style from "../style/style";
import { StatusBar } from "expo-status-bar";
import { PlayerNameContext } from "./PlayerNameContext";

export default Home = ({ navigation }) => {

    const [playerName, setPlayerName] = useContext(PlayerNameContext)
    const [hasPlayerName, setHasPlayerName] = useState(false)

    const handlePlayerName = (value) => {
        const trimmedValue = value.trim();
        if (trimmedValue.length > 2 && trimmedValue.length <= 20 && /^[a-zA-Z\s]*$/.test(trimmedValue)) {
          setHasPlayerName(true);
          Vibration.vibrate(200);
          Keyboard.dismiss();
        } else {
          Alert.alert('Invalid name', 'Name must be 3-20 characters long and contain only letters and spaces', [{text: 'OK'}]);
        }
      };

    const handleNewName = () => {
        setHasPlayerName(false)
        setPlayerName('')
    }


    return (
        <>
        <Header/>
                <StatusBar style="light"/>
            <View style={style.container}>
                {!hasPlayerName?
                <>
                <MaterialCommunityIcons name="account-circle" size={100} color="#000" style={style.diceIcon}/>
                <Text style={[style.infoText,style.rulesText]}>Enter your name for the scoreboard...</Text>
                <TextInput style={style.input} onChangeText={setPlayerName} autoFocus={true}/>
                <TouchableHighlight style={style.okButton} onPress={() => {handlePlayerName(playerName)}}>
                    <Text style={style.okButtonText}>OK</Text>
                </TouchableHighlight>
                </>
                :
                <>
                <View style={style.rules}>
                <Text style={style.highlightCentered}><MaterialCommunityIcons name="book-open-page-variant" size={24} color="#000" />The rules:</Text>
                <Text style={style.highlight}><MaterialCommunityIcons name="dice-multiple" size={24} color="#000" />THE GAME:</Text>
                <Text multiline="true" style={style.rulesText}>Upper section of the classic Yahtzee
                dice game. You have {NBR_OF_DICES} dices and
                for the every dice you have {NBR_OF_THROWS+" "}
                throws. After each throw you can keep dices in
                order to get same dice spot counts as many as
                possible. In the end of the turn you must select
                your points from {MIN_SPOT} to {MAX_SPOT}.
                Game ends when all points have been selected.
                The order for selecting those is free.</Text>
                <Text style={style.highlight}><MaterialCommunityIcons name="clipboard" size={24} color="#000" />POINTS:</Text>
                <Text multiline="true" style={style.rulesText}>After each turn game calculates the sum
                for the dices you selected. Only the dices having
                the same spot count are calculated. Inside the
                game you can not select same points from
                {" "+MIN_SPOT} to {MAX_SPOT} again.
                </Text>
                <Text style={style.highlight}><MaterialCommunityIcons name="flag-checkered" size={24} color="#000" />GOAL:</Text>
                <Text multiline="true" style={style.rulesText}>To get points as much as possible.
                {" "+BONUS_POINTS_LIMIT} points is the limit of
                getting bonus which gives you {BONUS_POINTS+" "}
                points more.</Text>
                <View style={style.playButtonContainer}>
                <TouchableOpacity onPress={() => {navigation.navigate('Gameboard'); Vibration.vibrate(50);}}><Text style={style.playButton}>Play as {playerName}</Text></TouchableOpacity> 
                {/* // PEKALLE TIEDOKSI, ETTÄ TUOSSA                            ^  OLI KYLLÄ PROPSIT PELAAJANIMEÄ VARTEN, (OLI TEHTÄVÄNANNOSSA) MUTTA KÄYTÄN REACTIN CONTEXTPROVIDERIA SEN SIJAAN, ETTÄ NIMENVAIHTO TOIMII */}
                <TouchableOpacity onPress={() => {handleNewName(); Vibration.vibrate(50);}}><Text style={style.playButton2}>Change name</Text></TouchableOpacity>
                </View>
                </View>
                </>
                }
            </View>
        <Footer/>
        </>
    )
}