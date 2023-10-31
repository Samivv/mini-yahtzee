import {useState, useEffect} from 'react'
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import Header from "./Header";
import Footer from "./Footer";
import { NBR_OF_SCOREBOARD_ROWS, SCOREBOARD_KEY } from "../constants/Game";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../style/style";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

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
<ScrollView>
    {scores.length === 0 ? (
        <View style={styles.scoreboardEmptyIcon}>
        <MaterialCommunityIcons name="clipboard-alert-outline" size={100} style={styles.scoreboardEmptyIcon}/>
        <Text style={styles.scoreboardEmptyText}>Scoreboard is empty</Text>
        </View>
    ) : (
        <DataTable>
        <DataTable.Header>
            <DataTable.Title>#Ranking</DataTable.Title>
            <DataTable.Title>Player</DataTable.Title>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Time</DataTable.Title>
            <DataTable.Title sortDirection="descending">Score</DataTable.Title>
        </DataTable.Header>
        {scores
            .sort((a, b) => b.points - a.points)
            .map((player, index) => (
            <DataTable.Row style={styles.scoreboardRow} key={player.key}>
                <DataTable.Cell style={styles.scoreboardCell}>
                <Text style={styles.scoreboardCellText}>{index + 1}.</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.scoreboardCell}>
                <Text style={styles.scoreboardCellText}>{player.name}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.scoreboardCell}>
                <Text style={styles.scoreboardCellText}>{player.date}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.scoreboardCell}>
                <Text style={styles.scoreboardCellText}>{player.time}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.scoreboardCell}>
                <Text style={styles.scoreboardCellText}>{player.points}</Text>
                </DataTable.Cell>
            </DataTable.Row>
            ))}
        </DataTable>
    )}
    </ScrollView>
    {scores.length > 0 && (
    <View>
        <TouchableOpacity
        style={styles.scoreboardClearButton}
        onPress={() => clearScoreboard()}
        >
        <Text style={styles.scoreboardClearButtonText}> <MaterialCommunityIcons name="trash-can" size={20}/>CLEAR</Text>
        </TouchableOpacity>
    </View>
    )}
        </>
    )
}