import { Text, TouchableOpacity, Vibration, View } from "react-native";
import Header from "./Header";
import style from "../style/style";
import { useContext, useEffect, useState } from "react";
import { NBR_OF_DICES, NBR_OF_THROWS,MAX_SPOT, MIN_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS, SCOREBOARD_KEY } from "../constants/Game";
import { Container, Row, Col } from 'react-native-flex-grid';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { PlayerNameContext } from "./PlayerNameContext";

let board = []


export default Gameboard = ({ navigation, route}) => {
    
    const [playerName, setPlayerName] = useContext(PlayerNameContext)
    const [nbrOfThrowsLeft, setNbOfThrowsLeft] = useState(NBR_OF_THROWS)
    const [status, setStatus] = useState('Throw dices')
    const [gameEndStatus, setGameEndStatus] = useState(false)
    const [pointsVar, setPointsVar] = useState(0)
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
            <Col key={"dice"+dice}><TouchableOpacity key={"dice" + dice} onPress={() => selectDice(dice)}><MaterialCommunityIcons name={board[dice]} color={getDiceColor(dice)} size={50} key={"dice"+dice}/></TouchableOpacity></Col>
        )
    }

    useEffect(() => {
        if(board.length === 0) {
            for(let i=0;i<NBR_OF_DICES;i++) {
                board.push(`dice-${i+1}`)
            }
        }
    }
    ,[])

    useEffect(() => {
        if(nbrOfThrowsLeft===0) {
            setStatus("Select your points before the next throw")
        }
    },[nbrOfThrowsLeft])

    const pointsRow = []
    for (let spot=0;spot < MAX_SPOT;spot++) {
        pointsRow.push(
            <Col key={"pointsRow"+spot}><Text style={{ fontWeight: 'bold',fontSize: 16,textAlign: 'center'}} key={"pointsRow"+spot}>{getSpotTotal(spot)}</Text></Col>
        )
    }

    const pointsToSelectRow = []
    for (let diceButton=0;diceButton < MAX_SPOT;diceButton++) {
        pointsToSelectRow.push(
            <Col key={"buttonsRow"+diceButton}><TouchableOpacity key={"buttonsRow" + diceButton} onPress={() => selectDicePoints(diceButton)} ><MaterialCommunityIcons name={"numeric-"+(diceButton+1)+"-circle"} color={getDicePointsColor(diceButton)} size={35} key={"buttonsRow"+diceButton}/></TouchableOpacity></Col>
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
            Vibration.vibrate(100)

        } else {
            setStatus("You already selected points for " + (i+1))
            return points[i]
        }
        setDicePointsTotal(points)
        setSelectedDicePoints(selectedPoints)
        setNbOfThrowsLeft(NBR_OF_THROWS)
        selectedDices.fill(false)
        return points[i]
    } 
    else {
        setStatus('Throw ' + NBR_OF_THROWS + ' times before setting points')
    }
}


    useEffect(() => {
        setPointsVar(dicePointsTotal.reduce((total, x) => total + x, 0))
        let allPointsSelected = selectedDicePoints.every((point) => point === true)
        if (allPointsSelected) {
            savePlayerPoints()
        }
        // savePlayerPoints()
        // setGameEndStatus(false)
        // setDiceSpots(new Array(NBR_OF_DICES).fill(0))
        // setDicePointsTotal(new Array(MAX_SPOT).fill(0))
        // setSelectedDicePoints(new Array(MAX_SPOT).fill(false))
        // setNbOfThrowsLeft(NBR_OF_THROWS)
    }, [selectedDicePoints])

    const savePlayerPoints = async() => {
        let points = dicePointsTotal.reduce((total, x) => total + x, 0)
        if(points == 0) {
            setStatus("You have to select points first")
            return 1
        }
        if(points >= BONUS_POINTS_LIMIT) {
            points += BONUS_POINTS
            Alert.alert("CONGRATULATIONS!", `BONUS POINTS GRANTED, \nTOTALING ${points}`)
            setPointsVar(points)
        }
        const timeDate = new Date()
        const newKey = scores.length + 1
        const playerPoints = {
            key: newKey,
            name: playerName,
            date: timeDate.toLocaleDateString([], {day: '2-digit', month: '2-digit', year: '2-digit'}),
            time: timeDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            points: points
        }
        try {
            const newScore = [...scores, playerPoints]
            const jsonValue = JSON.stringify(newScore)
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue)
        } catch(error) {
            console.log("Save error: " + error.message)
        }
        setStatus("Points saved. Go again?")
    }

    const getScoreboardData = async() => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY)
            if(jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue)
                setScores(tmpScores)
            } else {
                setScores([]) //Fixaus siihen, että vanhat pisteet palaavat clearauksen jälkeen kun pelaat pelin loppuun ennen kun olet sulkenut pelin.
            }
        } catch(error) {
            console.log("Read error: " + error.message)
        }
    }
    function getSpotTotal(i) {
        return dicePointsTotal[i]
    }
    const throwDices = () => {
        if (nbrOfThrowsLeft===0 && !gameEndStatus) {
            Vibration.vibrate(500)
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
        Vibration.vibrate(100)
        setNbOfThrowsLeft(nbrOfThrowsLeft-1)
        setDiceSpots(spots)
        setStatus("Select and throw dices again")
        setPointsVar(dicePointsTotal.reduce((total, x) => total + x, 0))
        let allPointsSelected = selectedDicePoints.every((point) => point === true)
        if (allPointsSelected) {
            setGameEndStatus(false)
            setDiceSpots(new Array(NBR_OF_DICES).fill(0))
            setDicePointsTotal(new Array(MAX_SPOT).fill(0))
            setSelectedDicePoints(new Array(MAX_SPOT).fill(false))
            setNbOfThrowsLeft(NBR_OF_THROWS)
        }
    }


    function selectDice(i) {
        if(nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
            let dices = [...selectedDices]
            dices[i] = selectedDices[i] ? false : true
            Vibration.vibrate(40)
            setSelectedDices(dices)
        } else {
            setStatus("You have to throw dices first.")
        }
    }

    function getDiceColor(i) {
        return selectedDices[i] ? "#5e5eee" : "#2B2B52"
    }

    function getDicePointsColor(i) {
        return selectedDicePoints[i] && !gameEndStatus ? "#5e5eee" : "#2B2B52"
    }

    function restartGame(x) {
        setNbOfThrowsLeft(NBR_OF_THROWS)
        setDiceSpots(new Array(NBR_OF_DICES).fill(0))
        setSelectedDices(new Array(NBR_OF_DICES).fill(false))
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false))
        setDicePointsTotal(new Array(MAX_SPOT).fill(0))
        setGameEndStatus(false)
        if (x === "reset") {
            setStatus("The game has been manually reset.")
        } else {
        setStatus("Throw dices")
        }
    }
    
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getScoreboardData()
      })
      return unsubscribe
    },[navigation])

    

    return(
        <>
        <StatusBar style="light"/>
        <Header />
        <View style={style.container}>
        <View style={style.statusBox}>
            <Text style={style.statusLabel}>Status:</Text>
            <Text style={[style.statusText, { color: status == "Select and throw dices again" || status == "Throw dices" || status=="Points saved. Go again?" ? "green" : "red" }]}>
            {status}
        </Text>
        </View>
        <TouchableOpacity style={style.restartContainer} onPress={() => Alert.alert("Info", "Long press the icon to restart game!")} onLongPress={() => {restartGame("reset"); Vibration.vibrate(500)}}>
            <Text>Restart<MaterialCommunityIcons name="restart" size={30} color="#2B2B52" /></Text>
        </TouchableOpacity>
        <View style={style.iconContainer}>
        </View>
        <Container fluid>
            <Row><Text style={style.gameboardLabel}>Dice points:</Text></Row>
            <TouchableOpacity onPress={() => Alert.alert("Info",`The scores for each dice are shown here from ${MIN_SPOT} to ${MAX_SPOT}`)}><Row style={{padding: 50}}>{pointsRow}</Row></TouchableOpacity>
            <Row><Text style={style.gameboardLabel}>Select which dice you want points for:</Text></Row>
            <Row style={{borderBottomWidth: 5, borderColor: nbrOfThrowsLeft == 0 ? '#5e5eee' : "#F5F5F5", borderRadius: 25}}>{pointsToSelectRow}</Row>
            <Row><Text style={style.gameboardLabel}>Select dices:</Text></Row>
            <Row style={{borderBottomWidth: 5, borderColor: nbrOfThrowsLeft == 0 ? "#F5F5F5" : '#5e5eee', borderRadius: 25}}>{dicesRow}</Row>
        </Container>
        <View style={style.button}>
            <View style={[style.button, style.borders]}>
                <MaterialCommunityIcons name="dice-multiple" size={26} color="#F5F5F5" />
                <TouchableOpacity onPress={() => {Alert.alert("Info", "The amount of throws you have left.")}}><Text style={style.buttonText}>{nbrOfThrowsLeft}</Text></TouchableOpacity>
            </View>
            <View style={style.button}>
                <TouchableOpacity style={[style.button, style.borders, style.throwButton]} onPress={() => throwDices()}>
                    <MaterialCommunityIcons name="handball" size={24} color="#F5F5F5" />
                    <Text style={style.buttonText}>THROW</Text>
            </TouchableOpacity>
            </View>
            <View style={[style.button, style.borders, style.noAdjust]}>
                <Text style={style.buttonText}>{pointsVar} </Text>
                <TouchableOpacity onPress={() => {Alert.alert("Info", "The amount of points you have gathered.")}}>
                <MaterialCommunityIcons name="clipboard" size={26} color="#F5F5F5" />
                </TouchableOpacity>
            </View>
            </View>
            <View style={style.footer}>
             <Text style={[style.author]}>Good luck, {playerName}!</Text>
            </View>
        </View>
        </>
    )
}