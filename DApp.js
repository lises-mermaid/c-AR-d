/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight
} from 'react-native'

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro'

// import {
//   HomeScreen,
//   TestScreen
// } from './components'


// Insert your API key below!
var sharedProps = {
  apiKey: '53F859C6-0996-417C-8CC3-CDDF2775C41C',
}

// Sets the default scene you want for AR and VR
const InitialARScene = require('./components/cardWithAR')
const InitialVRScene = require('./components/cardWithVR')

const HOME = 'HOME'
const SELECT_SEND_OR_SCAN =  'SELECT_SEND_OR_SCAN'
const SELECT_CATEGORY = 'SELECT_CATEGORY'
const CHOOSE_AR_OR_VR = 'CHOOSE_AR_OR_VR'
const VR_NAVIGATOR_TYPE = 'VR'
const AR_NAVIGATOR_TYPE = 'AR'

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
let defaultNavigatorType = HOME

export default class ViroSample extends Component {
  constructor() {
    super()

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps
    }
    this._getExperienceSelector.bind(this)
    this._getARNavigator = this._getARNavigator.bind(this)
    this._getVRNavigator = this._getVRNavigator.bind(this)
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this)
    this._exitViro = this._exitViro.bind(this)
    this._getHomeScreen = this._getHomeScreen.bind(this)
    this._getSendOrScanScreen = this._getSendOrScanScreen.bind(this)
    this._getSelectCategoryScreen = this._getSelectCategoryScreen.bind(this)
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == HOME) {
      return this._getHomeScreen()
    } else if (this.state.navigatorType == SELECT_SEND_OR_SCAN) {
      return this._getSendOrScanScreen()
    } else if (this.state.navigatorType == SELECT_CATEGORY) {
      return this._getSelectCategoryScreen()
    } else if (this.state.navigatorType == CHOOSE_AR_OR_VR) {
      return this._getExperienceSelector()
    } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
      return this._getVRNavigator()
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator()
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getHomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={localStyles.title}>cARd</Text>
        <TouchableHighlight style={localStyles.buttons}
          onPress={this._getExperienceButtonOnPress(SELECT_SEND_OR_SCAN)}
          underlayColor={'#68a0ff'} >
          <Text style={localStyles.buttonText}>Select Send or Scan</Text>
        </TouchableHighlight>
      </View>
    )
  }
  _getSendOrScanScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={localStyles.title}>Test</Text>
        <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(SELECT_CATEGORY)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Send a Card</Text>
        </TouchableHighlight>
        <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(CHOOSE_AR_OR_VR)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Scan a Card</Text>
        </TouchableHighlight>
      </View>
    )
  }
  _getSelectCategoryScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={localStyles.title}>Select Category</Text>
        <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress()}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Birthday</Text>
        </TouchableHighlight>
        <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress()}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Wedding</Text>
        </TouchableHighlight>
        <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress()}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Farewell</Text>
        </TouchableHighlight>
        <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress()}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Retirement</Text>
        </TouchableHighlight>
      </View>
    )
  }
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            Choose your desired experience:
          </Text>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>AR</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>VR</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene}} />
    );
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialVRScene}} onExitViro={this._exitViro} />
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: HOME
    })
  }
}

const localStyles = StyleSheet.create({
  title: {
    fontSize: 100
  },
  viroContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
})

module.exports = ViroSample
