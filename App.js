import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light, dark } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeContext } from './src/theme/ThemeContext';
import SplashScreen from './src/screens/SplashScreen';

const themes = { light, dark };

const App = () => {

  const [theme, setTheme] = React.useState('light');
  const currentTheme = themes[theme];
  const [loading, setLoading] = React.useState(true);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timeout)
    };
  })

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider mapping={mapping} theme={currentTheme}>
          <StatusBar barStyle={theme === 'light' ? "light-content" : "dark-content"} backgroundColor={theme === 'light' ? "#f4511e" : "#000" } />
          {loading ? <SplashScreen /> : <AppNavigator />}
        </ApplicationProvider>
      </ThemeContext.Provider>
    </React.Fragment>
  );
};

export default App;