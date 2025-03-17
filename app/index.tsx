import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import { commonStyles } from "@/styles/CommonStyles";
import { profileStore } from "@/store/profileStore";

const ProfileView = observer(() => {
  const router = useRouter();

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.input}>Никнейм: {profileStore.nickname}</Text>
      <Text style={commonStyles.input}>Имя: {profileStore.name}</Text>
      {profileStore.description ? (
        <Text style={commonStyles.input}>Описание: {profileStore.description}</Text>
      ) : null}

      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => router.push("/profileForm")}
      >
        <Text style={commonStyles.buttonText}>Заполнить профиль</Text>
      </TouchableOpacity>
    </View>
  );
});

export default ProfileView;
