import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import { commonStyles } from "@/styles/CommonStyles";
import { profileStore } from "../store/profileStore";
import Checkbox from "expo-checkbox";
import { Colors } from "@/styles/Colors";
import { Typography } from "@/styles/Typography";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';

const ProfileForm = observer(() => {
  const router = useRouter();
  const maxDescriptionLength = 600;
  
  const [nickname, setNickname] = useState(profileStore.nickname);
  const [name, setName] = useState(profileStore.name);
  const [description, setDescription] = useState(profileStore.description);
  const [agreed, setAgreed] = useState(true);
  const [descriptionLength, setDescriptionLength] = useState(description?.length ?? 0);

  const [isNicknameFocused, setIsNicknameFocused] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  useEffect(() => {
    setDescriptionLength(description?.length ?? 0);
  }, [description]);
  const isFormValid = nickname.trim() && name.trim() && agreed;

  const handleSubmit = () => {
    if (isFormValid) {
      profileStore.setProfile({ nickname, name, description });
      router.push("/");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.profileTitle}>Создать личный профиль</Text>
        <Text style={styles.selectPhoto}>Выберите фото</Text>
        <View style={styles.photoCotainer}>
          <FontAwesome5 name="camera" size={24} color={Colors.grey} />
          <View style={styles.plusIconContainer}>
            <Fontisto name="plus-a" size={18} color={Colors.alertRed} />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Никнейм
            <Text style={styles.textSecondary}> (обязательно)</Text>
          </Text>
          <TextInput
            style={[
              commonStyles.input,
              isNicknameFocused && { borderColor: Colors.primary },
            ]}
            placeholder="@Создайте никнейм"
            value={nickname}
            onChangeText={setNickname}
            onFocus={() => setIsNicknameFocused(true)}
            onBlur={() => setIsNicknameFocused(false)}
            numberOfLines={1}
            placeholderTextColor={Colors.textPlaceholder}
          />  
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Имя
            <Text style={styles.textSecondary}> (обязательно)</Text>
          </Text>
          <TextInput
            style={[
              commonStyles.input,
              isNameFocused && { borderColor: Colors.primary },
            ]}
            placeholder="Введите имя"
            value={name}
            onChangeText={setName}
            onFocus={() => setIsNameFocused(true)}
            onBlur={() => setIsNameFocused(false)}
            numberOfLines={1}
            placeholderTextColor={Colors.textPlaceholder}
          />
        </View>

        <View style={[styles.inputContainer, styles.textFieldContainer]}>
          <View style={styles.labelContainer}>
            <Text style={[styles.inputLabel]}>
              Описание
            </Text>
            <Text style={{color: Colors.textPlaceholder}}>{`${descriptionLength}/${maxDescriptionLength}`}</Text>
          </View>

          <TextInput
            style={[
              commonStyles.input,
              commonStyles.textField,
              isDescriptionFocused && { borderColor: Colors.primary },
            ]}
            placeholder="Расскажите о себе"
            value={description}
            numberOfLines={5}
            multiline={true}
            maxLength={600}
            onChangeText={setDescription}
            onFocus={() => setIsDescriptionFocused(true)}
            onBlur={() => setIsDescriptionFocused(false)}
            placeholderTextColor={Colors.textSecondary}
          />
        </View>
        
        
        <View style={commonStyles.checkboxContainer}>
          <Checkbox value={agreed} onValueChange={setAgreed} />
        </View>
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

const styles = StyleSheet.create({
container: {
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: Colors.background,
  paddingHorizontal: 16,
  paddingBottom: 24
},

formContainer: {
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
 },

 profileTitle: {
  color: Colors.textPrimary,
  fontSize: Typography.fontSizes.l,
  padding: 16,
  fontWeight: 700,
  marginBottom: 4
 },
 
 selectPhoto: {
  color: Colors.textPrimary,
  fontSize: Typography.fontSizes.xs,
  marginBottom: 4,
 },

 photoCotainer: {
  width: 100,
  height: 100,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 100,
  backgroundColor: Colors.greyDimm,
  marginBottom: 16
 },

 plusIconContainer: {
  position: "absolute",
  bottom: -2,
  right: -10,
  padding: 12,
  backgroundColor: Colors.background,
  borderRadius: 50,

  shadowColor: Colors.shadow,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.2,
  shadowRadius: 25,

  elevation: 10, 
},

inputContainer: {
  width: '100%',
  marginBottom: 8,
},

inputLabel: {
  color: Colors.textPrimary,
  fontSize: Typography.fontSizes.xs,
  marginBottom: 6
},

textFieldContainer: {
  color: Colors.textSecondary,
  width: '100%',
},
labelContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},

textSecondary: {
  color: Colors.textSecondary
},
})
