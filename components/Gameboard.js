import { Text, View } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import style from "../style/style";
import { useEffect, useState } from "react";
import { NBR_OF_DICES, NBR_OF_THROWS,MAX_SPOT, MIN_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS, SCOREBOARD_KEY } from "../constants/Game";
import { Container, Row, Col } from 'react-native-flex-grid';
import { Pressable } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import AsyncStorage from "@react-native-async-storage/async-storage";

let board = []


export default Gameboard = ({ navigation, route}) => {
    
    const [playerName, setPlayerName] = useState('')
    const [nbrOfThrowsLeft, setNbOfThrowsLeft] = useState(NBR_OF_THROWS)
    const [status, setStatus] = useState('Throw dices')
    const [gameEndStatus, setGameEndStatus] = useState(false)
    // Ovatko nopat  kiinnitetty
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false))
    // Noppien silmäluvut
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0))
    // Onko silmäluvulle valittu pisteet
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false))
    // Kerätyt pisteet
    const [dicePointsTotal,setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0))
    //Tulostaulun pisteet
    const [scores, setScores] = useState([])

    const dicesRow = []
    for (let dice=0;dice < NBR_OF_DICES;dice++) {
        dicesRow.push(
            <Col key={"dice"+dice}><Pressable key={"dice" + dice} onPress={() => selectDice(dice)}><MaterialCommunityIcons name={board[dice]} color={getDiceColor(dice)} size={50} key={"dice"+dice}/></Pressable></Col>
        )
    }


    const pointsRow = []
    for (let spot=0;spot < MAX_SPOT;spot++) {
        pointsRow.push(
            <Col key={"pointsRow"+spot}><Text key={"pointsRow"+spot}>{getSpotTotal(spot)}</Text></Col>
        )
    }

    const pointsToSelectRow = []
    for (let diceButton=0;diceButton < MAX_SPOT;diceButton++) {
        pointsToSelectRow.push(
            <Col key={"buttonsRow"+diceButton}><Pressable key={"buttonsRow" + diceButton} onPress={() => selectDicePoints(diceButton)} ><MaterialCommunityIcons name={"numeric-"+(diceButton+1)+"-circle"} color={getDicePointsColor(diceButton)} size={35} key={"buttonsRow"+diceButton}/></Pressable></Col>
        )
    } 
                                          
    const selectDicePoints = (i) => {
        if(nbrOfThrowsLeft === 0) {
        let selectedPoints = [...selectedDicePoints]
        let points = [...dicePointsTotal]
        if(!selectedPoints[i]) {
            selectedPoints[i] = true
            let nbrOfDices = diceSpots.reduce((total, x) => (x === (i+1) ? total + 1: total),0)
            points[i] = nbrOfDices * (i+1)
        } else {
            setStatus("You already selected points for " + (i+1))
            return points[i]
        }
        setDicePointsTotal(points)
        setSelectedDicePoints(selectedPoints)
        return points[i]
    } 
    else {
        setStatus('Throw ' + NBR_OF_THROWS + ' times before setting points')
    }
}
    const savePlayerPoints = async() => {
        const timeDate = new Date()
        const newKey = scores.length + 1
        const playerPoints = {
            key: newKey,
            name: playerName,
            date: timeDate.toLocaleDateString(),
            time: timeDate.toLocaleTimeString(),
            points: 0 //yhteispisteet bonus LISÄÄ!!!
        }
        try {
            const newScore = [...scores, playerPoints]
            const jsonValue = JSON.stringify(newScore)
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue)
        } catch(error) {
            console.log("Save error: " + error.message)
        }
    }
    const getScoreboardData = async() => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY)
            if(jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue)
                setScores(tmpScores)
            }
        }   catch(error) {
            console.log("Read error: " + error.message)
        }
    } 

    function getSpotTotal(i) {
        return dicePointsTotal[i]
    }

    const throwDices = () => {
        if (nbrOfThrowsLeft===0 && !gameEndStatus) {
            setStatus("Select your points before the next throw")
            return 1
        } else if(nbrOfThrowsLeft === 0 && gameEndStatus) {
            setGameEndStatus(false)
            diceSpots.fill(0)
            dicePointsTotal.fill(0)
        }
        let spots = [...diceSpots]
        for(let i=0;i< NBR_OF_DICES;i++) {
            if(!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1)
                board[i] = 'dice-'+randomNumber
                spots[i] = randomNumber
            }
        }
        setNbOfThrowsLeft(nbrOfThrowsLeft-1)
        setDiceSpots(spots)
        setStatus("Select and throw dices again")
    }


    function getSpotTotal(i) {
        return dicePointsTotal[i]
    }

    function selectDice(i) {
        if(nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
            let dices = [...selectedDices]
            dices[i] = selectedDices[i] ? false : true
            setSelectedDices(dices)
        } else {
            setStatus("You have to throw dices first.")
        }
    }

    function getDiceColor(i) {
        return selectedDices[i] ? "black" : "steelblue"
    }

    function getDicePointsColor(i) {
        return selectedDicePoints[i] && !gameEndStatus ? "black" : "steelblue"
    }

    useEffect(() => {
        if(playerName === '' && route.params?.player) {
            setPlayerName(route.params.player)
        }
    }
    ,[])
    
    
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getScoreboardData()
      })
      return unsubscribe
    },[navigation])
    

    return(
    <>
        <   Header />
            <View>
            <Container fluid>
            <Row>{dicesRow}</Row>
            </Container>
            <Text style={style.throwsText}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={style.statusText}>{status}</Text>
            <Pressable style={style.button}onPress={() => throwDices()}>
            <Text style={style.buttonText}>THROW DICES</Text>
            </Pressable>
            <Container fluid>
            <Row>{pointsRow}</Row>
            </Container>
            <Container fluid>
            <Row>{pointsToSelectRow}</Row>
            </Container>
            <Pressable style={style.button} onPress={() => savePlayerPoints()}>
            <Text style={style.buttonText}>SAVE POINTS</Text>
            </Pressable>
            <Text style={style.playerNameText}>Let the games begin {playerName}
            </Text>
            </View>
            <Footer />
        </>
    )
}