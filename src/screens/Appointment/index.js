import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../utilities/Colors";
import TopTab from "../../components/TopTabs";
import Upcoming from "./Upcoming";
import Completed from "./Completed";
import Header from "../../components/Header";

const Appointments = () => {
    const [activeCompo , setactiveCompo] = useState({name: 'Upcoming'})
    return (
        <View style={styles.container}>

<Header title="Appointments" back bell/>
            <TopTab
                options={[{
                    id: 1,
                    name: 'Upcoming'
                },
                {
                    id: 2,
                    name: 'Completed'
                },
            ]}

                focused={activeCompo?.name}
                onActivePress={(e)=> setactiveCompo(e)}
            />

            {
                activeCompo?.name == 'Upcoming' ? 
                (
                    <Upcoming />
                ) : (
                    <Completed />
                )
            
            }
        </View>
    );
}

export default Appointments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    }
})