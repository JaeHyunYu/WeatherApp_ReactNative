import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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

export default function App() {
  return (
    // View는 Container라고 생각하면됨 div대신 사용하는거!
    // react native에 있는 모든 텍스는 text component안에 들어가야함!

    <View style={{ flex: 1 }}>
      {/*이런식으로 flex:1해서 비율로 layout함! 주로! 이런 비율들은 옆에있는 view와 비교되어져서 비율이 계산되어지는거임
      %나 사이즈를 적을 필요없음! 그냥 비율로 작성해서 layout하면됨!*/}
      <View
        style={{ flex: 1, backgroundColor: "red", flexDirection: "row" }}>

        <View
          style={{ flex: 1, backgroundColor: "gray" }}>
        </View>
        <View
          style={{ flex: 1, backgroundColor: "black" }}>
        </View>
      </View>
      <View
        style={{ flex: 1, backgroundColor: "blue" }}>
      </View>
      <View
        style={{ flex: 1, backgroundColor: "tomato" }}>
      </View>


      <StatusBar style="auto" />
      {/* Status bar는 시계 와이파이, 배터리와 같은 것들을 설정하는/소통하는 역할임 */}
    </View >
  );
}

// StyleSeet.create 는 object를 생성하는 것임!
// 아래와 같이 Stylesheet만들어서 사용해도되고, 위에 Component들에 인라인형식으로 style={} 이런식으로 넣어도 상관 없음
const styles = StyleSheet.create({
  container: {
    // border와 같은 몇몇 속성들은 사용불가 / but 우리가 알고있는 98%정도의 css는 사용가능!
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: "black",
  }
});
