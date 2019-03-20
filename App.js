import React from "react"
import { StyleSheet, Text, View, Image } from "react-native"
import { NativeRouter, Route, Link } from "react-router-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Home = () => <Text>Home</Text>

const Scan = () => <Text>Scan</Text>

const Settings = () => <Text>Settings</Text>

  export default App = () => (
    <NativeRouter>
      <View style={styles.container}>
        <View style={styles.nav}>
          <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
            <Icon name="home-outline" size={50}/>
          </Link>
          <Link to="/scan" underlayColor="#f0f4f7" style={styles.navItem}>
            <Icon name="qrcode-scan" size={50}/>
          </Link>
          <Link to="/settings" underlayColor="#f0f4f7" style={styles.navItem}>
            <Icon name="settings-outline" size={50}/>
          </Link>
        </View>
  
        <Route exact path="/" component={Home} />
        <Route path="/scan" component={Scan} />
        <Route path="/settings" component={Settings} />
      </View>
    </NativeRouter>
  );

  const styles = StyleSheet.create({
    container: {
      bottom: 0,
      position: "absolute"
    },
    header: {
      fontSize: 20
    },
    nav: {
      flexDirection: "row",
      justifyContent: "space-around"
    },
    navItem: {
      flex: 1,
      alignItems: "center",
      padding: 10
    },
    subNavItem: {
      padding: 5
    },
    topic: {
      textAlign: "center",
      fontSize: 15
    }
  });
  
