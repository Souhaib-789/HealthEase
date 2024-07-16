import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "../../utilities/Colors";
import TopTab from "../../components/TopTabs";
import Upcoming from "./Upcoming";
import Completed from "./Completed";
import Header from "../../components/Header";
import { AppointmentsMiddleware } from "../../redux/middlewares/AppointmentsMiddleware";
import { useDispatch, useSelector } from "react-redux";

const Appointments = () => {
    const [activeCompo, setactiveCompo] = useState({ name: 'Upcoming' })
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();

    const appointmentsData = useSelector(state => state.AppointmentsReducer?.myAppointmentList)

    useEffect(() => {
        fetchAppointmentsData()
    }, [])

    const fetchAppointmentsData = () => {
        dispatch(AppointmentsMiddleware.getAppointmentsData())
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
    }

    return (
        <View style={styles.container}>

            <Header title="Appointments" back bell />
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
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={ () => {setLoading(true) , fetchAppointmentsData() }}
                    />
                }>

                {
                    activeCompo?.name == 'Upcoming' ?
                        (
                            <Upcoming data={appointmentsData} loading={loading} />
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