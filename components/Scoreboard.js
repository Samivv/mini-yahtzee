import {useState, useEffect} from 'react'
import { Text, View, Pressable } from "react-native";
import { DataTable } from "react-native-paper";
import Header from "./Header";
import Footer from "./Footer";
import { NBR_OF_SCOREBOARD_ROWS, SCOREBOARD_KEY } from "../constants/Game";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../style/style";

export default Scoreboard = ({navigation}) => {

    const [scores, setScores] = useState([])
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getScoreboardData()
        })
        return unsubscribe
      },[navigation])
      
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

    const clearScoreboard = async() => {
        try {
            await AsyncStorage.clear() 
            setScores([])
        }   catch(error) {
            console.log("Clear error: " + error.message)
        }
    }


    return(
        <>
            <Header />
            <View>
            { scores.length === 0 ?
            <Text style={styles.scoreboardEmptyText}>Scoreboard is empty</Text> 
                : scores.map((player, index) => (
                //index < NBR_OF_SCOREBOARD_ROWS &&
                <DataTable.Row style={styles.scoreboardRow}key={player.key}>
                    <DataTable.Cell style={styles.scoreboardCell}><Text style={styles.scoreboardCellText}>{index + 1}.</Text></DataTable.Cell>
                    <DataTable.Cell style={styles.scoreboardCell}><Text style={styles.scoreboardCellText}>{player.name}</Text></DataTable.Cell>
                    <DataTable.Cell style={styles.scoreboardCell}><Text style={styles.scoreboardCellText}>{player.date}</Text></DataTable.Cell>
                    <DataTable.Cell style={styles.scoreboardCell}><Text style={styles.scoreboardCellText}>{player.time}</Text></DataTable.Cell>
                    <DataTable.Cell style={styles.scoreboardCell}><Text style={styles.scoreboardCellText}>{player.points}</Text></DataTable.Cell>
                </DataTable.Row>
                ))
        }
            </View>
           {  scores.length > 0 && 
            <View>
                <Pressable style={styles.scoreboardClearButton} onPress={() => clearScoreboard()}>
                    <Text style={styles.scoreboardClearButtonText}>CLEAR</Text>
                </Pressable>
            </View>
        }
            <Footer />
        </>
    )
}