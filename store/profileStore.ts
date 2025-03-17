import { makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Profile } from "@/models/models";
class ProfileStore {
  nickname = "";
  name = "";
  description?: string = "";

  constructor() {
    makeAutoObservable(this);
    this.loadProfile();
  }

  setProfile({ nickname, name, description }: Profile) {
    this.nickname = nickname;
    this.name = name;
    this.description = description ?? "";
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
        const { nickname, name, description } = JSON.parse(profileData);
        this.nickname = nickname;
        this.name = name;
        this.description = description ?? "";
      }
    } catch (e) {
      console.error("Ошибка загрузки профиля", e);
    }
  }
}

export const profileStore = new ProfileStore();
