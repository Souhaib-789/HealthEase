import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from '../utilities/Colors';
import { Fonts } from '../utilities/Fonts';

const Tab = createMaterialTopTabNavigator();


const TopTabs = (props) => {

    return (
        <Tab.Navigator
            screenOptions={{

                tabBarStyle: {
                    backgroundColor: 'transparent',
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    color: Colors?.BLACK,
                    fontFamily: Fonts?.SEMIBOLD
                },
                tabBarIndicatorStyle: {
                    height: 3,
                    width: 100,
                    left:  35,
                },
            }}>
            {
                props.components?.map((component, index) => (
                    <Tab.Screen key={index} name={component?.name} component={component?.component} options={{ tabBarLabel: component?.label }} />
                ))
            }
        </Tab.Navigator>
    )
}

export default TopTabs;