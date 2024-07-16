import React, { useState } from "react";
import {View, StyleSheet, ScrollView, FlatList} from "react-native";
import Input from "../../components/Input";
import { Colors } from "../../utilities/Colors";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import Icon, { IconTypes } from "../../components/Icon";
import AppointCard from "../../components/AppointCard";

const Upcoming = (props) => {

    const [search, setsearch] = useState(null)

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                    <Input
                        search
                        value={search}
                        onChangeText={(e) => setsearch(e)}
                        placeholder={'Search'}
                        rightIcon={search && <Icon type={IconTypes.Entypo} name={'cross'} size={18} />}
                        onPressRightIcon={() => setsearch(null)}
                        mainStyle={{ marginVertical: 15 }} />

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={props?.data}
                        renderItem={({ item }) =>
                            (<AppointCard loading={props?.loading} item={item} screenType={'upcoming'}  />)}
                        keyExtractor={(_ , index) => index.toString()}
                        ListEmptyComponent={<ListEmptyComponent text={'no doctors found'} />}
                     
                    />
            </ScrollView>
        </View>
    )
}

export default Upcoming;

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