import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import MedicalRecords from '../../screens/Profile/Medical Info/MedicalInfo';
import PrivacyPolicy from '../../screens/InfoPages/PrivacyPolicy';
import Settings from '../../screens/Settings/Settings';
import BottomTabs from '../BottomTabs';
import DiagnosticsTests from '../../screens/DiagnosticsTests/DiagnosticsTests';
import Profile from '../../screens/Profile/Profile';


const Drawer = createDrawerNavigator();

const DrawerBar = () => {
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            backBehavior="history"
            drawerContent={props => <CustomDrawerContent {...props} />}
             >
            <Drawer.Screen name="BottomTabs" component={BottomTabs} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="MedicalRecords" component={MedicalRecords} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="DiagnosticsTests" component={DiagnosticsTests} options={{ drawerItemStyle: { display: 'none' }  }} />
            <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="Settings" component={Settings} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="Profile" component={Profile} options={{ drawerItemStyle: { display: 'none' } }} />
        </Drawer.Navigator>
    )
}
export default DrawerBar
;



