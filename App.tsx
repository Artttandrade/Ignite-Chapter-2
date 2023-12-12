import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import { Dashboard } from './src/pages/Dashboard';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isFontsLoadeds] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const onLayoutRootView = useCallback(async () => {
    if (isFontsLoadeds)
      await SplashScreen.hideAsync();
  }, [isFontsLoadeds]);

  if (!isFontsLoadeds)
    return null;

  return (
    <View
      onLayout={onLayoutRootView}
      style={{
        flex: 1
      }}
    >
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
    </View>
  );
}

