import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import { StudentProvider } from './context/StudentContext';
import { UIProvider } from './context/UIContext';
import { NotificationProvider } from './context/NotificationContext';
import { SettingsProvider } from './context/SettingsContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';

import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

// Clerk token storage
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch {}
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
      tokenCache={tokenCache}
    >
      <AuthProvider>
        <StudentProvider>
          <UIProvider>
            <NotificationProvider>
              <SettingsProvider>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                  <Stack screenOptions={{ headerShown: false }} />
                </ThemeProvider>
              </SettingsProvider>
            </NotificationProvider>
          </UIProvider>
        </StudentProvider>
      </AuthProvider>
    </ClerkProvider>
  );
}
