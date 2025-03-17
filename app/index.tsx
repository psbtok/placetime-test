import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import { profileStore } from "@/store/profileStore";
import { Colors } from "@/styles/Colors";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import CustomStatusBar from "@/components/nonInteractive/customStatusBar";
import { Typography } from "@/styles/Typography";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from "@/components/interactive/button";
import { useCallback } from "react";

const ProfileView = observer(() => {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      if (!profileStore.name) {
        router.replace("/profileForm");
      }
    }, [profileStore.name])
  );

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={Colors.primaryPale} barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        <View style={styles.acitonsContainer}>
          <View style={styles.icon}>
            <FontAwesome name="bell" size={16} color={Colors.primary} />
          </View>
          <View style={styles.imageContainer}>
            {profileStore.photoUri ? (
              <Image source={{ uri: profileStore.photoUri }} style={styles.image} />
            ) : (
              <FontAwesome5 name="camera" size={32} color={Colors.grey} />
            )}
          </View>
          <View style={styles.icon}>
            <Ionicons name="settings-sharp" size={20} color={Colors.primary} />
          </View>
        </View>
        <View style={styles.nameContainer}>
          <View style={styles.nameWrapperOuter}>
            <View style={styles.nameWrapperInner}>
              <Text style={styles.name}>{profileStore.name}</Text>
              <Text style={styles.nickname}>@{profileStore.nickname}</Text>
            </View>
          </View>
        </View>
        <View style={styles.subscriptionWrapper}>
          <View style={styles.subscriptionContainer}>
            <Text style={styles.subscriptionText}><Text style={styles.subscriptionCount}>0</Text> подписчиков</Text>
            <Text style={styles.subscriptionText}><Text style={styles.subscriptionCount}>0</Text> подписок</Text>
          </View>
        </View>
        {profileStore.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Описание</Text>
            <Text style={styles.description}>{profileStore.description}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => router.push("/profileForm")}
          text="Заполнить профиль"
        />
      </View>
    </View>
  );
});

export default ProfileView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  acitonsContainer: {
    width: '100%',
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: Colors.primaryPale,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: Colors.greyDimm,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    overflow: "hidden",
  },
  icon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderRadius: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.primaryPale,
  },
  nameWrapperOuter: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  nameWrapperInner: {
    minWidth: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    padding: 12,
    paddingHorizontal: 20,
    bottom: '50%',
    backgroundColor: Colors.primaryPale,
  },
  name: {
    fontWeight: 700,
    color: Colors.textPrimary,
    fontSize: Typography.fontSizes.l,
  },
  nickname: {
    color: Colors.textPrimary,
  },
  subscriptionWrapper: {
    width: '100%',
    paddingHorizontal: 16,
  },
  subscriptionContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 12,
    borderColor: Colors.greyBorderDimm,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  subscriptionText: {
    color: Colors.textPlaceholder,
  },
  subscriptionCount: {
    color: Colors.textPrimary,
    fontWeight: 700,
    fontSize: Typography.fontSizes.xs,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 24,
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.background,
  },
  descriptionContainer: {
    marginTop: 36,
    paddingHorizontal: 24,
    paddingBottom: 24,
    width: '100%',
  },
  descriptionLabel: {
    fontWeight: 600,
    fontSize: Typography.fontSizes.l,
  },
  description: {
    marginTop: 12,
    fontSize: Typography.fontSizes.l,
  },
});