/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Alert, Image } from 'react-native';
import { getUserData, getUserClasses } from '../../service/classService.js';
import styles from './classes_styling.js';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';

function UserClasses() {
  const [classes, setClasses] = useState([]);
  const [userId, setUserId] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // For Calendar
  const currentDate = new Date();
  const lastYear = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
  const nextYear = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());
  const startDate = moment().startOf('week').toDate();
  const endDate = moment().endOf('week').toDate();
  const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const formattedEndDate = endDate.toLocaleDateString('en-US', { day: 'numeric' });
  const customHeader = 'Week of ' + formattedStartDate + ' - ' + formattedEndDate;

  useEffect(() => {
    getUserData(setUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      async function fetchUserClasses() {
        try {
          const userClasses = await getUserClasses(userId);
          setClasses(userClasses);
        } catch (error) {
          console.error('Error fetching classes', error);
        }
      }
      fetchUserClasses();
    }
  }, [userId]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert(
          { errorMsg },
          'This app requires location access. Please enable location services in your device settings.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
        return;
      }

      const locationSubscription = Location.watchPositionAsync(
        { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 30000, distanceInterval: 1 },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
      console.log(location?.coords);
      return () => {
        locationSubscription.remove();
      };
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#1044a9' }}>
        <Text style={[{ color: 'white' }, { paddingTop: 20 }, { fontFamily: 'serif' }, { fontSize: 17 }, { backgroundColor: '#1044a9' }]}>   Welcome, [Full Name] </Text>
      </View>
      <CalendarStrip
      scrollable
      scrollerPaging
      minDate={lastYear}
      maxDate={nextYear}
      style={{ height: '10%', paddingTop: '4%', paddingBottom: '2%' }} 
      calendarColor={'#1044a9'}
      calendarHeaderStyle={{ color: 'white', fontFamily: 'serif', fontSize: '15%', paddingBottom: '2%' }} 
      dateNumberStyle={{ color: 'white', fontFamily: 'serif', fontSize: '12%' }} 
      dateNameStyle={{ color: 'white', fontFamily: 'serif', fontSize: '12%' }} 
      highlightDateNumberStyle={{ color: 'white' }}
      selectedDateStyle={{ color: 'white', backgroundColor: 'F4A543' }}
      daySelectionAnimation={{ type: 'background', duration: '30', borderWidth: '0.1%', highlightColor: 'transparent', borderHighlightColor: 'white' }} // Adjust borderWidth with percentage
      highlightDateContainerStyle={{ backgroundColor: '#77A1F2' }}
      iconContainer={{ flex: 0.1 }}
      calendarAnimation={{ type: 'paralell', duration: '500' }}
      // headerText={customHeader}
    />
      <View style={{ backgroundColor: '#1044a9' }}>
        <Text style={[{ color: '#1044a9' }, { padding: 10 }, { fontFamily: 'serif' }, { fontSize: 15 }, { backgroundColor: '#D1DFFB' }, { textAlign: 'center' }]}>[Upcoming Class]</Text>
      </View>
      <View style={styles.outerClassContainer}>
        <Text>User Classes</Text>
        <View style={styles.classesContainer}>
          {classes.map((classItem, index) => (
            <View key={classItem.crn} style={styles.classItem}>
              <Text>{classItem.classname}</Text>
              <Image
              source={{ uri: classItem.imageurl }}
              style={styles.image}
              resizeMode="cover"
            />
              <Text>{classItem.crn}</Text>

            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default UserClasses;
