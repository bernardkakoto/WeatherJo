import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ActivityIndicator, Image } from 'react-native';

const Weather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchWeather = async (cityName: string) => {
    if (!cityName) {
      alert('Please enter a city name.');
      return;
    }

    setLoading(true);
    setErrorMessage('');  // Reset all earlier error messages

    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=bc5f1911de23887358ff3b369aa8260c&units=metric`; //Replace xx with your OpenWeatherMap token
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      if (weatherData.cod !== 200) {
        setErrorMessage('Sorry, location cannot be found. Enter a different location.');
        setLoading(false);
        return;
      }

      setWeather(weatherData);

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=bc5f1911de23887358ff3b369aa8260c&units=metric`; //Replace xx with your OpenWeatherMap token
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      const dailyForecast = forecastData.list.filter((entry: any) =>
        entry.dt_txt.includes('12:00:00')
      );
      setForecast(dailyForecast);
    } catch (error) {
      console.error('Error fetching weather data', error);
      setErrorMessage('Sorry, location cannot be found. Enter a different location.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WeatherJo</Text>
        <TextInput
          style={styles.input}
          placeholder="Location & Enter"
          placeholderTextColor="#808080"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={() => fetchWeather(city)}
        />
        <Button title="Search by Location" onPress={() => fetchWeather(city)} />
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
      </View>

      {loading ? (
        <ActivityIndicator size="small" color="#fff" style={styles.loadingIndicator} />
      ) : (
        weather && (
          <View style={styles.weatherInfo}>
            <Text style={styles.city}>{weather.name}</Text>
            <Text style={styles.temp}>{weather.main.temp}°C</Text>
            <View style={styles.weatherDescription}>
              <Image
                style={styles.icon}
                source={{
                  uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                }}
              />
              <Text style={styles.description}>
                {makeTitleCase(weather.weather[0].description)}
              </Text>
            </View>

            <Text style={styles.forecastTitle}>5-Day Forecast</Text>
            <View style={styles.forecastContainer}>
              {forecast.map((day, index) => (
                <View key={index} style={styles.forecastItem}>
                  <Text style={styles.dayAndDate}>
                    {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                      weekday: 'long',
                    })} - {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                  <View style={styles.weatherDescription}>
                    <Image
                      style={styles.icon}
                      source={{
                        uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
                      }}
                    />
                    <Text style={styles.description}>
                      {makeTitleCase(day.weather[0].description)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )
      )}
    </View>
  );
};

const makeTitleCase = (text) => {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    color: 'white',
  },
  loadingIndicator: {
    marginTop: 10,
  },
  weatherInfo: {
    alignItems: 'flex-start',
    width: '100%',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  weatherDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 0,
  },
  description: {
    color: 'white',
    fontSize: 16,
  },
  forecastTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  forecastContainer: {
    marginTop: 10,
    width: '100%',
  },
  forecastItem: {
    alignItems: 'flex-start',
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
  },
  dayAndDate: {
    color: '#ADD8E6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});
