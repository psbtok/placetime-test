import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
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

  const [errors, setErrors] = useState({
    nickname: false,
    name: false,
  });

  useEffect(() => {
    setDescriptionLength(description?.length ?? 0);
  }, [description]);

  const isFormValid = nickname.trim() && name.trim() && agreed;

  const handleSubmit = () => {
    const newErrors = {
      nickname: !nickname.trim(),
      name: !name.trim(),
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

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Никнейм
            <Text style={styles.textSecondary}> (обязательно)</Text>
          </Text>
          <TextInput
            style={[
              commonStyles.input,
              isNicknameFocused && { borderColor: Colors.primary },
              errors.nickname && { borderColor: Colors.alertRed },
            ]}
            placeholder="@Создайте никнейм"
            value={nickname}
            onChangeText={handleNicknameChange}
            onFocus={() => setIsNicknameFocused(true)}
            onBlur={() => setIsNicknameFocused(false)}
            maxLength={600}
            numberOfLines={1}
            placeholderTextColor={Colors.textPlaceholder}
          />
            <Text style={[styles.errorText, errors.nickname ? styles.errorTextVisible : '']}>Заполните обязательное поле</Text>
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
              errors.name && { borderColor: Colors.alertRed },
            ]}
            placeholder="Введите имя"
            value={name}
            onChangeText={handleNameChange}
            onFocus={() => setIsNameFocused(true)}
            onBlur={() => setIsNameFocused(false)}
            maxLength={100}
            numberOfLines={1}
            placeholderTextColor={Colors.textPlaceholder}
          />
          <Text style={[styles.errorText, errors.name ? styles.errorTextVisible : '']}>Заполните обязательное поле</Text>
        </View>

        <View style={[styles.inputContainer, styles.textFieldContainer]}>
          <View style={styles.labelContainer}>
            <Text style={[styles.inputLabel]}>Описание</Text>
            <Text style={{ color: Colors.textPlaceholder }}>{`${descriptionLength}/${maxDescriptionLength}`}</Text>
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

        <View style={styles.checkboxContainer}>
          <Text numberOfLines={2} style={styles.textIAgree}>Я согласен с условиями пользовательского соглашения</Text>
          <Slider onChange={setAgreed}/>
        </View>
      </View>

      <Button
        onPress={handleSubmit}
        disabled={!isFormValid}
        text="Продолжить"
      />
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
  inputContainer: {
    width: '100%',
  },
  inputLabel: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSizes.xs,
    marginBottom: 6,
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
    color: Colors.textSecondary,
  },
  errorText: {
    marginBottom: 2,
    opacity: 0,
    color: Colors.alertRed,
    fontSize: Typography.fontSizes.xs,
  },
  errorTextVisible: {
    opacity: 1
  },
  checkboxContainer: {
    marginTop: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textIAgree: {
    marginRight: 32
  }
});