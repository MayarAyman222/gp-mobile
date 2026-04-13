
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Login from "./src/pages/Login";
import Signup from "./src/pages/Signup";
import Landing from "./src/pages/Landing";
import Setting from "./src/pages/setting";
import Category from "./src/pages/Category";
import Dashboard from "./src/pages/Dashboard";
import SubIconDashboard from "./src/pages/SubIconDashboard";
import IconDetail from "./src/pages/IconDetail";
import Home from "./src/pages/Home";
import SubIconDetail from "./src/pages/SubIconDetail";
import Profile from "./src/pages/profile";
import Favourites from "./src/pages/favourite";
import TimePeriod from "./src/pages/TimePeriod";
import Emergency from "./src/pages/Emergency";
import TryToSpeak from "./src/pages/TryToSpeak";
import ExpressByDrawing from "./src/pages/expressbydrawing";
// Context Providers
import { AppProvider } from "./src/context/AppContext";
import { LanguageProvider } from "./src/context/LanguageContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <LanguageProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Landing" component={Landing} />
             <Stack.Screen name="Setting" component={Setting} />
             <Stack.Screen name="Category" component={Category} />
             <Stack.Screen name="Dashboard" component={Dashboard} />
             <Stack.Screen name="SubIconDashboard" component={SubIconDashboard} />
            <Stack.Screen name="SubIconDetail" component={SubIconDetail} />
            <Stack.Screen name="IconDetail" component={IconDetail} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Favourites" component={Favourites} />
            <Stack.Screen name="TimePeriod" component={TimePeriod} />
            <Stack.Screen name="Emergency" component={Emergency} />
            <Stack.Screen name="TryToSpeak" component={TryToSpeak} />
            <Stack.Screen
              name="ExpressByDrawing"
              component={ExpressByDrawing}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LanguageProvider>
    </AppProvider>
  );
}

