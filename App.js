import React from "react";
import AppNavigation from "./src/Navigation";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from 'redux-persist/integration/react'
import { Store, persist }  from "./src/redux/store";
import i18n from "./src/translations/i18n";
import { I18nextProvider } from "react-i18next";

function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persist}>
        <SafeAreaProvider>
        <I18nextProvider i18n={i18n}>
          <AppNavigation />
          </I18nextProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>

  );
}

export default App;