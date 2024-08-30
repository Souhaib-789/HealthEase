import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, FlatList, RefreshControl } from "react-native";
import Input from "../../components/Input";
import { Colors } from "../../utilities/Colors";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import Icon, { IconTypes } from "../../components/Icon";
import AppointCard from "../../components/AppointCard";
import { useTranslation } from "react-i18next";
import { AppointmentsMiddleware } from "../../redux/middlewares/AppointmentsMiddleware";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Completed = () => {

    const [search, setsearch] = useState(null)
    const { t } = useTranslation();
    const ref = React.useRef();
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const appointmentsData = useSelector(state => state.AppointmentsReducer?.myAppointmentList)

// console.log('====================================');
// console.log(JSON.stringify(appointmentsData, null ,8));
// console.log('====================================');

    useFocusEffect(
        useCallback(() => {
            const data = {
                status: 'completed',
                search: undefined
            }
            fetchPastAppointmentsData(data)
        }, [navigation]))



    const fetchPastAppointmentsData = (data) => {
        dispatch(AppointmentsMiddleware.getAppointmentsData(data))
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
    }

    const onSearch = useCallback((val) => {
        setLoading(true);
        setsearch(val);
        clearTimeout(ref.current);
        ref.current = setTimeout(() => {
            const data = {
                status: 'completed',
                search: val
            }
            fetchPastAppointmentsData(data)
        }, 1000);
    }, []);

    const onRefreshPage = () => { setLoading(true), fetchPastAppointmentsData(), setsearch(null) }

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <Input
                    search
                    value={search}
                    onChangeText={(e) => onSearch(e)}
                    placeholder={t('Search')}
                    rightIcon={search && <Icon type={IconTypes.Entypo} name={'cross'} size={18} />}
                    onPressRightIcon={onRefreshPage}
                    mainStyle={{ marginVertical: 15 }} />

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={loading ? [1, 2, 3, 4, 5, 6] : appointmentsData}
                    renderItem={({ item }) =>
                        (<AppointCard item={item} loading={loading} screenType={'completed'} />)}
                    keyExtractor={(_, index) => index.toString()}
                    ListEmptyComponent={<ListEmptyComponent short text={t('no appointments found')} />}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={onRefreshPage}
                        />
                    }
                />
            </ScrollView>
        </View>
    )
}

export default Completed;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 15
    },
    sub_container: {
        alignSelf: "center",
    },
    heading: {
        fontSize: 20,
        color: Colors.WHITE,
        fontWeight: "bold"
    },
    headingx: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.BLACK
    },
    text: {
        fontSize: 18,
        color: Colors.BLACK,
        marginVertical: 2,
        fontWeight: "bold"
    },
    span: {
        fontWeight: "bold"
    },
    textx: {
        fontSize: 12
    },
    sub_heading: {
        fontSize: 18,
        color: Colors.WHITE
    },
    category_box: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 8,
        backgroundColor: 'rgba(14, 190, 127, 0.08)',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 10
    },
    category_text: {
        color: Colors.PRIMARY,
        fontSize: 14
    },
    next_available: {
        marginVertical: 10
    },
    flex: {
        backgroundColor: 'blue',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    heart: {
        position: "absolute",
        right: 18,
        top: 5
    },
    popular_card: {
        width: '100%',
        flexDirection: "row",
        borderRadius: 10,
        backgroundColor: Colors.WHITE,
        elevation: 2,
        marginHorizontal: 2,
        marginVertical: 8,
        padding: 10
    },
    popular_card_subview: {
        width: '70%',
    },
    popular_image: {
        width: 85,
        height: 85,
        borderRadius: 8,
        resizeMode: "cover"
    },
    button: {
        borderRadius: 5,
        width: '60%',
        backgroundColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        alignSelf: "flex-end",
        marginRight: 18,
        marginTop: 28
    },
    button_text: {
        color: Colors.WHITE,
        fontSize: 13,
        fontWeight: 500
    },
    no_data: {
        textAlign: "center",
        marginTop: 10,
        fontWeight: 500
    }
})