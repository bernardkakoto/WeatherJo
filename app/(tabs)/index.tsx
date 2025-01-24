import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Modal, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Weather from '../../components/Weather';
import * as Font from 'expo-font';

const Index = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        DancingScript: require('../../assets/fonts/DancingScript-Regular.ttf'),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  const showAboutAlert = () => {
    setModalVisible(true);
  };

  const hideAboutAlert = () => {
    setModalVisible(false);
  };

  if (!fontLoaded) {
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#0a0a1a', '#2e2e46']} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a1a" />

      <View style={styles.weatherContainer}>
        <Text style={styles.title}>WeatherUp</Text>
        <Weather />
      </View>

      <TouchableOpacity style={styles.aboutTouchableArea} onPress={showAboutAlert}>
        <Text style={styles.aboutText}>About</Text>
      </TouchableOpacity>

      {/* Custom Alert Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideAboutAlert}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>About WeatherUp</Text>
            <Text style={styles.modalText}>
              WeatherUp is a weather application that shows current weather conditions along with a 5-day forecast.
              {'\n\n'}Built by Bernard Akoto for his portfolio using Expo Router, React Native, & OpenWeatherMap.
              {'\n\n'}Weather icon gotten from https://www.iconarchive.com/show/papirus-apps-icons-by-papirus-team/weather-icon.html.
            </Text>
            <TouchableOpacity onPress={hideAboutAlert}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  weatherContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#ffffff',
    opacity: 0, // Keeps title hidden to avoid duplication.
  },
  aboutTouchableArea: {
    position: 'absolute',
    right: 0,
    padding: 20, // Increases clickable area
  },
  aboutText: {
    color: '#F4A261',
    fontSize: 16,
    fontFamily: 'DancingScript',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black translucent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#rgba(64, 64, 64, 0.9)',
    borderRadius: 10,
    padding: 10,
    width: '70%',
  },
  modalTitle: {
    fontSize: 20,
    color: '#F4A261', // White text
    fontFamily: 'DancingScript',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    color: '#ffffff', // White text
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
  },
  
  modalButtonText: {
  color: '#F4A261', // Text color
  fontSize: 16,
  textAlign: 'center', // Ensures text is centered horizontally
  },
});
