import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: "onboardingCompleted",
} as const;

export const storage = {
  // Onboarding
  setOnboardingCompleted: async (completed: boolean) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.ONBOARDING_COMPLETED,
        completed.toString()
      );
    } catch (error) {
      console.error("Error setting onboarding status:", error);
      throw error;
    }
  },

  getOnboardingCompleted: async (): Promise<boolean> => {
    try {
      const value = await AsyncStorage.getItem(
        STORAGE_KEYS.ONBOARDING_COMPLETED
      );
      return value === "true";
    } catch (error) {
      console.error("Error getting onboarding status:", error);
      return false;
    }
  },

  // Utility to reset onboarding (useful for testing)
  resetOnboarding: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
    } catch (error) {
      console.error("Error resetting onboarding:", error);
      throw error;
    }
  },

  // Clear all app data
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
      throw error;
    }
  },
};
