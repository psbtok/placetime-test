import { makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Profile } from "@/models/models";

class ProfileStore {
  nickname = "";
  name = "";
  description?: string = "";
  photoUri?: string = "";

  constructor() {
    makeAutoObservable(this);
    this.loadProfile();
  }

  setProfile({ nickname, name, description, photoUri }: Profile) {
    this.nickname = nickname;
    this.name = name;
    this.description = description ?? "";
    this.photoUri = photoUri ?? "";
    this.saveProfile();
  }

  async saveProfile() {
    try {
      await AsyncStorage.setItem(
        "profile",
        JSON.stringify({
          nickname: this.nickname,
          name: this.name,
          description: this.description,
          photoUri: this.photoUri,
        })
      );
    } catch (e) {
      console.error("Ошибка сохранения профиля", e);
    }
  }

  async loadProfile() {
    try {
      const profileData = await AsyncStorage.getItem("profile");
      if (profileData) {
        const { nickname, name, description, photoUri } = JSON.parse(profileData);
        this.nickname = nickname;
        this.name = name;
        this.description = description ?? "";
        this.photoUri = photoUri ?? "";
      }
    } catch (e) {
      console.error("Ошибка загрузки профиля", e);
    }
  }

  setPhotoUri(photoUri: string) {
    this.photoUri = photoUri;
    this.saveProfile();
  }
}

export const profileStore = new ProfileStore();