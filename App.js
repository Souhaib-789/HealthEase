import React from "react";
import AppNavigation from "./src/Navigation";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from 'redux-persist/integration/react'
import { Store, persist }  from "./src/redux/store";

function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persist}>
        <SafeAreaProvider>
          <AppNavigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>

  );
}

export default App;