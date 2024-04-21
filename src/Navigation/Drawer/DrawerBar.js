import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import BottomTabs from '../BottomTabs';
import DiagnosticsTests from '../../screens/DiagnosticsTests/DiagnosticsTests';
import Profile from '../../screens/Profile/Profile';
import About from '../../screens/InfoPages/About';
import InviteFriend from '../../screens/InfoPages/InviteFriend';
import Support from '../../screens/InfoPages/Support';


const Drawer = createDrawerNavigator();

const DrawerBar = () => {
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            backBehavior="history"
            drawerContent={props => <CustomDrawerContent {...props} />}
             >
            <Drawer.Screen name="BottomTabs" component={BottomTabs} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="DiagnosticsTests" component={DiagnosticsTests} options={{ drawerItemStyle: { display: 'none' }  }} />
            <Drawer.Screen name="Profile" component={Profile} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="About" component={About} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="InviteFriend" component={InviteFriend} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="Support" component={Support} options={{ drawerItemStyle: { display: 'none' } }} />

        </Drawer.Navigator>
    )
}
export default DrawerBar
;



