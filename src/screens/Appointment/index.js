import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "../../utilities/Colors";
import TopTab from "../../components/TopTabs";
import Upcoming from "./Upcoming";
import Completed from "./Completed";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";

const Appointments = () => {
    const [activeCompo, setactiveCompo] = useState({ name: 'Upcoming' })
    const {t} = useTranslation();


    return (
        <View style={styles.container}>

            <Header title={t("Appointments")} back bell />
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
                onActivePress={(e) => setactiveCompo(e)}
            />
            <ScrollView>

                {
                    activeCompo?.name == 'Upcoming' ?
                        (
                            <Upcoming />
                        ) : (
                            <Completed />
                        )

                }
            </ScrollView>
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