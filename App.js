import Home from './components/Home';
import Gameboard from './components/Gameboard';
import Scoreboard from './components/Scoreboard'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { PlayerNameProvider } from './components/PlayerNameContext';
import {useFonts} from 'expo-font';


const Tab = createBottomTabNavigator();

export default function App() {
  
  const [loaded] = useFonts({
    Kanit: require('./assets/fonts/Kanit-Regular.ttf'),
    KanitBig: require('./assets/fonts/Kanit-Black.ttf'),
    Header: require('./assets/fonts/Kanit-Thin.ttf'),
  });

  if(!loaded) {
    return null
  }

  return (
    <PlayerNameProvider>
    <NavigationContainer>
    <Tab.Navigator
      //initialRouteName="Feed"
      sceneContainerStyle={{backgroundColor: 'transparent'}}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName
          if (route.name === "Home" ) {
            iconName = focused ? 'information' : 'information-outline'
          } else if (route.name === 'Gameboard') {
            iconName = focused ? 'dice-multiple' : 'dice-multiple-outline'
          } else if (route.name === 'Scoreboard') {
            iconName = focused ? 'view-list' : 'view-list-outline'
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color}/>
        },
        tabBarStyle: {backgroundColor: "#2B2B52", borderTopWidth: 0,marginTop:0},
        tabBarInactiveTintColor: "white",
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{tabBarStyle: { display: "none" }, headerShown: false}}/>
      <Tab.Screen name="Gameboard" component={Gameboard} options={{headerShown: false}}/>
      <Tab.Screen name="Scoreboard" component={Scoreboard} options={{headerShown: false}}/>
      
    </Tab.Navigator>
    </NavigationContainer>
    </PlayerNameProvider>
  );
}