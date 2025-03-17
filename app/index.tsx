import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Главная страница</Text>
      <Button title="Перейти в профиль" onPress={() => router.push("/profile")} />
    </View>
  );
}
