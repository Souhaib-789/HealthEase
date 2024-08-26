import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { Colors } from "../../utilities/Colors";
import DoctorCard from "../../components/DoctorCard";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import NO_DOC from '../../assets/images/noDoc.png'
import { useTranslation } from "react-i18next";
import { DoctorsMiddleware } from "../../redux/middlewares/DoctorsMiddleware";
import { useDispatch, useSelector } from "react-redux";

const FavDoctors = () => {

    const [search, setsearch] = useState(null)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [loading, setloading] = useState(true)
    const favDoctorsList = useSelector(state => state.DoctorsReducer.favDoctorsList)

    useEffect(() => {
        fetchFavDoctorsData()
    }, [])

    const fetchFavDoctorsData = () => {
        dispatch(DoctorsMiddleware.getFavDoctorsData())
            .then(() => setloading(false))
            .catch(() => setloading(false))
    }


    return (
        <View style={styles.mainContainer}>
            <Header title={t('Favorite Doctors')} back bell />
            {/* <Input
                    search
                    value={search}
                    onChangeText={(e) => setsearch(e)}
                    placeholder={t('Search')}
                    rightIcon={search && <Icon type={IconTypes.Entypo} name={'cross'} size={18} />}
                    onPressRightIcon={() => setsearch(null)}
                    mainStyle={{ marginBottom: 13, width: '90%', marginTop: 10 }} /> */}

            <FlatList
                showsVerticalScrollIndicator={false}
                data={loading ? [1, 2, 3, 4] : favDoctorsList}
                renderItem={({ item }) =>
                    (<DoctorCard loading={loading} item={item} book={true} heart={true} style={{ width: '90%' }} />)}
                keyExtractor={(_, index) => index.toString()}
                ListEmptyComponent={<ListEmptyComponent image={NO_DOC} text={t('no fav. doctor yet')} />}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={fetchFavDoctorsData}
                    />
                }
            />
        </View>
    )
}

export default FavDoctors;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
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