import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import { commonStyles } from "@/styles/CommonStyles";
import { profileStore } from "../store/profileStore";
import Checkbox from "expo-checkbox";

const ProfileForm = observer(() => {
  const router = useRouter();
  const [nickname, setNickname] = useState(profileStore.nickname);
  const [name, setName] = useState(profileStore.name);
  const [description, setDescription] = useState(profileStore.description);
  const [agreed, setAgreed] = useState(true);

  const isFormValid = nickname.trim() && name.trim() && agreed;

  const handleSubmit = () => {
    if (isFormValid) {
      profileStore.setProfile({ nickname, name, description });
      router.push("/");
    }
  };

  return (
    <View style={commonStyles.container}>
      <TextInput
        style={commonStyles.input}
        placeholder="Никнейм *"
        value={nickname}
        onChangeText={setNickname}
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Имя *"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Описание (опционально)"
        value={description}
        onChangeText={setDescription}
      />
      
      <View style={commonStyles.checkboxContainer}>
        <Checkbox value={agreed} onValueChange={setAgreed} />
      </View>

      <TouchableOpacity
        style={[commonStyles.button, !isFormValid && commonStyles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!isFormValid}
      >
        <Text style={commonStyles.buttonText}>Продолжить</Text>
      </TouchableOpacity>
    </View>
  );
});

export default ProfileForm;
