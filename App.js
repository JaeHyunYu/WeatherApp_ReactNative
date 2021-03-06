import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
// 이런 StyleSheet, Text와 같은 Component들은  react native 공식 홈페이지에서 더 확인할 수 있음
/*
이전 버전들에는 다양한 component들이 존재했지만, 최신 버전들에선 많이 사라짐
많은 component를 지원하는게 어렵기 때문!
따라서 매우 필수적인 component들을 남겨둠

API는 자바스크립트 코드임 -> 자바스크립트가 OS와 소통함!

다른 다양한 api/component들은 reactnativedirectory와 같은 사이트에들어가게되면
여러 component들이 존재함! 사용가능한것임! 커뮤니티임!
커뮤니티(Git과 같은)이기때문에 버그가 발생하면 기다리거나 내가 고치는 수 밖에 없음..

Expo는 Reactnative가 제공하지않는 몇몇 component들이 없는걸 알고
자체 팀에서 이런 component들과 API를 제공하기로함! -> 이것이 Expo SDK임
EXPO SDK는 다양하고 멋진 component들이 있음
이젠 EXPO Packages/API를 사용하면 많은 API들을 사용할 수 있는 것임!

*/
import { Fontisto } from "@expo/vector-icons"
// https://icons.expo.fyi/ 들어가서 아이콘들 확인 가능
const icons = {
  "Clouds": "cloudy",
  "Clear": "day-sunny",
  "Rain": "rain",
  "Atmosphere:": "cloudy-gusts",
  "Snow": "snow",
  "Drizzle": "day-rain",
  "Thunderstorm": "lightning",
}
const { height, width: SCREEN_WIDTH } = Dimensions.get('window');
// 위에 코드는 object가져와서 내가 원하는 이름으로 바꿔주는 뜻!
// width를 SCREEN_WIDTH로 사용하겠따~

console.log(SCREEN_WIDTH);

export default function App() {

  const [city, setCity] = useState('Loading');
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const API_KEY = "73f2ad47a90724ebfcc896cf62b32c3d";
  const getWheather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    // 위에 코드로 권한 허가
    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    // 위의 코드로 latitued, longitude 받아오기
    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    setCity(location[0].city);
    // city 값 가져옴
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays(json.daily);

  }

  // 이건 그냥 prototype 이니까 보안적으로 안좋지만 그냥 api key를 직접 넣는 거임
  //https://home.openweathermap.org/api_keys
  // -> 날씨정보 제공해주는 API

  useEffect(() => {
    getWheather();
  }, [])
  return (
    // View는 Container라고 생각하면됨 div대신 사용하는거!
    // react native에 있는 모든 텍스는 text component안에 들어가야함!

    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={styles.weather}>
        {/* ScrollView를 이용할 경우,style prop이 아닌
        container style을 이용해야함
        pagingEnabled속성을 쓰면 carousel 쓰는 것처럼 보여짐
        */}


        {days.length === 0 ?
          <View style={styles.day}>
            <ActivityIndicator color="black" size="large" style={{ marginTop: 10 }} />
            {/* ActivityIndicator 는 loading을 하는 react native에서 제공하는 Component임 */}
          </View> :
          (
            days.map((day, index) =>
              <View key={index} style={{ ...styles.day, alignItems: "center" }}>
                {/* es6 기능 스타일을 갖고오고 추가적으로 또 스타일을 직접넣고싶으면 두개의 {{넣고
                                      추가적으로 해주면됨}} */}
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                  <Fontisto name={icons[day.weather[0].main]} size={80} color="black" />
                </View>
                <Text style={styles.description}>{day.weather[0].main}</Text>
                <Text style={styles.tinyText}>{day.weather[0].description}</Text>

              </View>)
          )
        }


      </ScrollView >

      <StatusBar />
    </View >
  );
}

// StyleSeet.create 는 object를 생성하는 것임!
// 아래와 같이 Stylesheet만들어서 사용해도되고, 위에 Component들에 인라인형식으로 style={} 이런식으로 넣어도 상관 없음
const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'rgba(39, 245, 228, 0.34)'
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "600"
  },
  weather: {

  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: 'center',

  },
  temp: {
    marginTop: 50,
    fontSize: 110,
    fontWeight: 'bold'
  },
  description: {
    marginTop: -20,
    fontSize: 40,
  },
  tinyText: {
    fontSize: 20
  }

});
