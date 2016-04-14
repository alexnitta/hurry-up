/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Dimensions
} from 'react-native';

import Form from 'react-native-form';
import {sendEvent, updateLocation} from './helpers/request-helpers';
import ScrollableTabView from 'react-native-scrollable-tab-view';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class hurryup extends Component {

  constructor(props) {
    super(props);


  this.watchID = null;

  this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var initialPosition = position;
      this.setState({initialPosition});
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
  }

  buttonClicked() {
    var newEvent = this.refs.form.getValues();
    var origin = this.state.initialPosition.coords;
    sendEvent(newEvent);
    updateLocation(origin);

    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log("WORKING >>>>>>>>>>>");
      var lastPosition = position;
      this.setState({lastPosition});

      var initialPosition = this.state.initialPosition;
      var initialLatitude = initialPosition.coords.latitude;
      var initialLongitude = initialPosition.coords.longitude;
      var lastLatitude = lastPosition.coords.latitude;
      var lastLongitude = lastPosition.coords.longitude;

      var distanceTraveled = Math.sqrt(Math.pow((initialLatitude - lastLatitude), 2) + Math.pow((initialLongitude - lastLongitude), 2));

      var that = this;
      if (distanceTraveled >= 0.004) { //TODO: set constant for 0.004
        updateLocation(this.state.lastPosition.coords, that);
        this.setState({ initialPosition: lastPosition });
      }
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 60000});
  }

  render() {
    return (
      <View style={styles.parent}>
        <Image style={styles.bg} source={require('./background.png')} />
        <Text style={styles.welcome}>
          hurryup
        </Text>
        <ScrollableTabView style={{marginTop: 0, top: 0}} tabBarBackgroundColor="transparent" tabBarUnderlineColor="#F5F5F6" tabBarActiveTextColor="#F5F5F6" tabBarInactiveTextColor="#ACB2BE" tabBarTextStyle={{fontFamily: 'HelveticaNeue-Light', fontSize: 15}}>
          <View tabLabel='Create Event' style={styles.container}>
            <Form ref='form'>

              <View style={styles.inputs}>
                <TextInput
                  style={styles.eventName}
                  type="TextInput"
                  name="eventName"
                  placeholderTextColor="#F5F5F6"
                  placeholder="Event Name"/>
              </View>

              <View style={styles.inputs}>
                <TextInput
                  style={styles.eventName}
                  type="TextInput"
                  name="destination"
                  placeholderTextColor="#F5F5F6"
                  placeholder='Event Location'/>
              </View>

              <View style={styles.inputs}>
                <TextInput
                  style={styles.eventName}
                  type="TextInput"
                  name="eventTime"
                  placeholderTextColor="#F5F5F6"
                  placeholder="Event Time"/>
              </View>

              <View style={styles.inputs}>
                <TextInput
                  style={styles.eventName}
                  type="TextInput"
                  name="earlyArrival"
                  placeholderTextColor="#F5F5F6"
                  placeholder="Early Arrival"/>
              </View>

              <View style={styles.inputs}>
                <TextInput
                  style={styles.eventName}
                  type="TextInput"
                  name="mode"
                  placeholderTextColor="#F5F5F6"
                  placeholder="Mode of Transport" />
              </View>
            </Form>

            <TouchableHighlight
              style={styles.button}
              onPress={this.buttonClicked.bind(this)}>
              <View>
                <Text style={styles.buttonText}>Submit!</Text>
              </View>
            </TouchableHighlight>


          </View>
          <View tabLabel='My Events' style={styles.container}>
            <Text style={styles.welcome}>AWESOME</Text>
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: deviceWidth,
    height: deviceHeight
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  welcome: {
    color: '#F5F5F6',
    fontSize: 25,
    fontFamily: 'HelveticaNeue',
    textAlign: 'center',
    marginTop: 20,
  },
  eventName: {
    backgroundColor: 'transparent',
    color: '#F5F5F6',
    left: 40,
    fontSize: 14,
    height: 25,
    width: deviceWidth - 40
  },
  button: {
    backgroundColor: '#34778A',
    marginTop: 30,
    padding: 15,
    alignItems: 'center',
    width: deviceWidth
  },
  buttonText: {
    color: '#F5F5F6',
    fontSize: 16,
    fontFamily: 'HelveticaNeue-Light',
    textAlign: 'center',
  },
  inputs: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderBottomColor: '#F5F5F6',
    borderColor: 'transparent'
  }
});

AppRegistry.registerComponent('hurryup', () => hurryup);
