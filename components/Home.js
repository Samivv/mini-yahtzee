import { useState } from "react"
import { TextInput, Text, View, Pressable, Keyboard, TouchableHighlight, Alert, TouchableOpacity, Vibration } from "react-native"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header'
import Footer from './Footer'
import { NBR_OF_DICES, NBR_OF_THROWS,MAX_SPOT, MIN_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from "../constants/Game";
import style from "../style/style";
import { StatusBar } from "expo-status-bar";

export default Home = ({ navigation }) => {

    const [playerName, setPlayerName] = useState('')
    const [hasPlayerName, setHasPlayerName] = useState(false)

    const handlePlayerName = (value) => {
        if(value.trim().length > 0 ) {
            setHasPlayerName(true)
            Vibration.vibrate(200)
            Keyboard.dismiss()
        } else {
            Alert.alert('Please enter your name', 'Name is required', [{text: 'OK'}])
        }
    }

    const handleNewName = () => {
        setHasPlayerName(false)
        setPlayerName('')
    }



    return (
        <>
        <Header/>
                <StatusBar style="light"/>
            <View>
                <MaterialCommunityIcons style={style.icon} color="#2B2B52" name="information" size={90}/>
                {!hasPlayerName?
                <>
                <Text style={style.infoText}>For scoreboard enter your name...</Text>
                <TextInput style={style.input} onChangeText={setPlayerName} autoFocus={true}/>
                <TouchableHighlight style={style.okButton} onPress={() => {handlePlayerName(playerName)}}>
                    <Text style={style.okButtonText}>OK</Text>
                </TouchableHighlight>
                </>
                :
                <>
                <Text style={style.highlightCentered}>The rules:</Text>
                <Text multiline="true"><Text style={style.highlight}>THE GAME:</Text> Upper section of the classic Yahtzee
                dice game. You have {NBR_OF_DICES} dices and
                for the every dice you have {NBR_OF_THROWS+" "}
                throws. After each throw you can keep dices in
                order to get same dice spot counts as many as
                possible. In the end of the turn you must select
                your points from {MIN_SPOT} to {MAX_SPOT}.
                Game ends when all points have been selected.
                The order for selecting those is free.</Text>
                <Text multiline="true"><Text style={style.highlight}>POINTS:</Text> After each turn game calculates the sum
                for the dices you selected. Only the dices having
                the same spot count are calculated. Inside the
                game you can not select same points from
                {MIN_SPOT} to {MAX_SPOT} again.
                </Text>
                <Text multiline="true"><Text style={style.highlight}>GOAL:</Text> To get points as much as possible.
                {BONUS_POINTS_LIMIT} points is the limit of
                getting bonus which gives you {BONUS_POINTS}
                points more.</Text>
                <Text style={style.highlight}> Name chosen: {playerName}</Text>
                <TouchableOpacity onPress={() => {navigation.navigate('Gameboard',{player:playerName}); Vibration.vibrate(50);}}><Text style={style.playButton}>PLAY</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {handleNewName(); Vibration.vibrate(50);}}><Text style={style.playButton2}>Change name</Text></TouchableOpacity>
                </>
                }
            </View>
        <Footer/>
        </>
    )
}