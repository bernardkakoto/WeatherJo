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

      {/* About Alert Modal */}
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
              {'\n\n'}Built by Bernard Akoto for his portfolio using Expo Router, React Native, and OpenWeatherMap.
              {'\n\n'}OpenWeatherMap token being used for this app allows a 1000 API calls/searches per day. 
              If app is unable to fetch weather conditions, then the calls/searches per day has been exhausted by testers.
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
    padding: 20,
  },
  aboutText: {
    color: '#F4A261',
    fontSize: 16,
    fontFamily: 'DancingScript',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
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
    color: '#F4A261', 
    fontFamily: 'DancingScript',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    color: '#ffffff', 
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
  },
  
  modalButtonText: {
  color: '#F4A261', 
  fontSize: 16,
  textAlign: 'center',
  },
});
