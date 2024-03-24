import React from "react";
import AppNavigation from "./src/Navigation";
import Store from "./src/redux/store";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App() {
  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        <AppNavigation />
        </SafeAreaProvider>
    </Provider>

  );
}

export default App;