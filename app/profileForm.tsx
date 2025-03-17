import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import { commonStyles } from "@/styles/CommonStyles";
import { profileStore } from "../store/profileStore";
import { Colors } from "@/styles/Colors";
import { Typography } from "@/styles/Typography";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import Slider from "@/components/interactive/slider";
import Button from "@/components/interactive/button";
import * as ImagePicker from "expo-image-picker";
import CustomStatusBar from "@/components/nonInteractive/customStatusBar";

const ProfileForm = observer(() => {
  const router = useRouter();
  const maxDescriptionLength = 600;

  const [nickname, setNickname] = useState(profileStore.nickname);
  const [name, setName] = useState(profileStore.name);
  const [description, setDescription] = useState(profileStore.description);
  const [agreed, setAgreed] = useState(profileStore.name ? true : false);
  const [descriptionLength, setDescriptionLength] = useState(description?.length ?? 0);

  const [isNicknameFocused, setIsNicknameFocused] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const [errors, setErrors] = useState({
    nickname: false,
    name: false,
    agreed: false,
  });

  useEffect(() => {
    setDescriptionLength(description?.length ?? 0);
  }, [description]);

  const isFormValid = nickname.trim() && name.trim() && agreed;

  const handleSubmit = () => {
    const newErrors = {
      nickname: !nickname.trim(),
      name: !name.trim(),
      agreed: !agreed,
    };

    setErrors(newErrors);

    if (isFormValid) {
      profileStore.setProfile({ nickname, name, description, photoUri: profileStore.photoUri });
      router.push("/");
    }
  };

  const handleNicknameChange = (text: string) => {
    setNickname(text);
    if (errors.nickname) {
      setErrors((prev) => ({ ...prev, nickname: false }));
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: false }));
    }
  };

  const handleSelectPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Для выбора фото необходимо предоставить доступ к галерее.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      profileStore.setPhotoUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={Colors.background} barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        <View style={styles.formContainer}>
          <Text style={styles.profileTitle}>Создать личный профиль</Text>
          <Text style={styles.selectPhoto}>Выберите фото</Text>
          <TouchableOpacity onPress={handleSelectPhoto}>
            <View style={styles.photoCotainer}>
              {profileStore.photoUri ? (
                <Image source={{ uri: profileStore.photoUri }} style={styles.photo} />
              ) : (
                <FontAwesome5 name="camera" size={24} color={Colors.grey} />
              )}
              <View style={styles.plusIconContainer}>
                <Fontisto name="plus-a" size={18} color={Colors.alertRed} />
              </View>
            </View>
          </TouchableOpacity>

          <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.inputLabel}>
              Никнейм
              <Text style={commonStyles.textSecondary}> (обязательно)</Text>
            </Text>
            <TextInput
              style={[
                commonStyles.input,
                isNicknameFocused && commonStyles.inputFocused,
                errors.nickname && commonStyles.inputError,
              ]}
              placeholder="@Создайте никнейм"
              value={nickname}
              onChangeText={handleNicknameChange}
              onFocus={() => setIsNicknameFocused(true)}
              onBlur={() => setIsNicknameFocused(false)}
              maxLength={30}
              numberOfLines={1}
              placeholderTextColor={Colors.textPlaceholder}
            />
            <Text style={[commonStyles.errorText, errors.nickname && commonStyles.errorTextVisible]}>
              Заполните обязательное поле
            </Text>
          </View>

          <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.inputLabel}>
              Имя
              <Text style={commonStyles.textSecondary}> (обязательно)</Text>
            </Text>
            <TextInput
              style={[
                commonStyles.input,
                isNameFocused && commonStyles.inputFocused,
                errors.name && commonStyles.inputError,
              ]}
              placeholder="Введите имя"
              value={name}
              onChangeText={handleNameChange}
              onFocus={() => setIsNameFocused(true)}
              onBlur={() => setIsNameFocused(false)}
              maxLength={30}
              numberOfLines={1}
              placeholderTextColor={Colors.textPlaceholder}
            />
            <Text style={[commonStyles.errorText, errors.name && commonStyles.errorTextVisible]}>
              Заполните обязательное поле
            </Text>
          </View>

          <View style={[commonStyles.inputContainer, commonStyles.textFieldContainer]}>
            <View style={commonStyles.labelContainer}>
              <Text style={commonStyles.inputLabel}>Описание</Text>
              <Text style={{ color: Colors.textPlaceholder }}>{`${descriptionLength}/${maxDescriptionLength}`}</Text>
            </View>
            <TextInput
              style={[
                commonStyles.input,
                commonStyles.textField,
                isDescriptionFocused && commonStyles.inputFocused,
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

          <View style={styles.checkboxContainer}>
            <Text numberOfLines={2} style={styles.textIAgree}>
              Я согласен с условиями пользовательского соглашения
            </Text>
            <Slider onChange={setAgreed} defaultValue={agreed}/>
          </View>
          <Text style={[commonStyles.errorText, errors.agreed && commonStyles.errorTextVisible, {paddingHorizontal: 4}]}>
            Вы должны согласиться
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          onPress={handleSubmit}
          disabled={!isFormValid}
          text="Продолжить"
        />
      </View>
    </View>
  );
});

export default ProfileForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
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
    fontWeight: '700',
    marginBottom: 4,
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
    marginBottom: 16,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  plusIconContainer: {
    position: 'absolute',
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
  checkboxContainer: {
    marginTop: 12,
    width: '100%',
    padding: 4,
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  textIAgree: {
    flex: 1,
    color: Colors.textPrimary,
  },
  buttonContainer: {
    zIndex: 2,
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: Colors.background,
  },
});