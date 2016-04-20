import React, {
  Text,
  View,
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import {getAllEvents} from '../helpers/request-helpers';
import Directions from './directions-event';

var Icon = require('react-native-vector-icons/Ionicons');

const deviceWidth = Dimensions.get('window').width;

class AllEvents extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      userId: props.userId,
    };
  }

  componentDidMount() {
    var that = this;
    getAllEvents(that);
  }

  buttonClicked() {
    //look into using websockets instead of refresh button / or state control
    var that = this;
    getAllEvents(that);
    this.render();
  }

  getDirections() {
    var that = this;
    console.log('button clicked for directions');
  }

  displayTime(time) {
    var dateTime = time.toString();
    var hours = dateTime.substring(16,18);
    var postfix;
    if (Number(hours) > 12) {
      postfix = 'PM';
      hours = hours - 12;
    } else {
      postfix = 'AM';
    }
    var minutes = dateTime.substring(19,21);
    return hours + ':' + minutes + ' ' + postfix;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          {this.state.events.map((event, index) =>
            <View style={styles.EventContainer} key={index}>
              <View style={styles.EventRow}>
                <Text style={styles.EventTitle}>Event:</Text>
                <View style={styles.EventInput}>
                  <Text style={styles.EventText}>{event.eventName} @ {this.displayTime(event.eventTime)} on {event.eventTime.substring(0,10)}</Text>
                </View>
              </View>
              <View style={styles.EventRow}>
                <Text style={styles.EventTitle}>Where: </Text>
                <View style={styles.EventInput}>
                  <Text style={styles.EventText}>{event.address} {event.city} {event.state}</Text>
                </View>
              </View>
              <View style={styles.EventRow}>
                <Text style={styles.EventTitle}>Getting there by: </Text>
                <View style={styles.EventInput}>
                  <Text style={styles.EventText}>{event.mode}</Text>
                </View>
              </View>      
              <View style={styles.EventRow}>
                <Icon.Button name="android-walk" backgroundColor="#3b5998" onPress={this.getDirections}>
                  <Text style={styles.buttonText}>Directions</Text>
                </Icon.Button>  
              </View>
              <Directions event = {event} />
            </View>
          )}
          <Text style={styles.welcome}>no more events</Text>
        </ScrollView>
        <TouchableHighlight
          style={styles.button}
          onPress={this.buttonClicked.bind(this)}>
          <View>
            <Text style={styles.buttonText}>Refresh!</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  EventContainer: {
    flex: 1,
    margin: 7,
    padding: 15,
    height: 250,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#F5F5F6',
  },
  EventRow: {
    flex: 1,
    flexDirection:'row',
  },
  EventTitle: {
    margin: 5,
    fontSize: 14,
    color: '#ACB2BE',
    textDecorationLine: 'underline'
  },
  EventInput: {
    flex: 1,
    alignItems: 'flex-end',
  },
  EventText: {
    flex: 1,
    margin: 5,
    fontSize: 16,
    color: '#F5F5F6',
  },
  welcome: {
    margin: 20,
    fontSize: 20,
    color: '#ACB2BE',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
  },
  button: {
    padding: 15,
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor: '#34778A',
  },
  buttonText: {
    fontSize: 16,
    color: '#F5F5F6',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-Light',
  },

  iconButton: {
    padding: 15,
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor: '#34778A',
  }
});

export default AllEvents;
