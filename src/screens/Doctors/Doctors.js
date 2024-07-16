import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, } from "react-native";
import Input from "../../components/Input";
import Header from "../../components/Header";
import { Colors } from "../../utilities/Colors";
import DoctorCard from "../../components/DoctorCard";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import TextComponent from "../../components/TextComponent";
import CustomCategoryIcon from "../../components/CustomCategoryIcon";
import { useSelector } from "react-redux";
import { doctorCategories } from "../../utilities/Utilities";

const Doctors = () => {

    const [currCategory, setcurrCategory] = useState();
    const Doctors = useSelector(state => state.DoctorsReducer?.allDoctors)
    const [FilteredDoctors, setFilteredDoctors] = useState(Doctors)
    const ref = useRef(null)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    const renderCategoryItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.category_box, { backgroundColor: item?.id == currCategory?.id ? Colors.PRIMARY : Colors?.LIGHT }]}
                onPress={() => {
                    if (item?.id == 0) {
                        setFilteredDoctors(Doctors)
                    } else {
                        setFilteredDoctors(Doctors.filter(i => i?.specialization?.toLowerCase() == item?.name?.toLowerCase()))
                    }
                    setcurrCategory(item)
                }}>
                <CustomCategoryIcon category={item?.name.toLowerCase()} size={15} color={item?.id == currCategory?.id ? Colors?.WHITE : Colors.PRIMARY} />
                <TextComponent style={[styles.category_text, { color: item?.id == currCategory?.id ? Colors?.WHITE : Colors.PRIMARY }]} text={item?.name} />
            </TouchableOpacity>
        )
    }

    const onSearchDoctor = useCallback((val) => {
        setLoading(true);
        setSearch(val);
        clearTimeout(ref.current);
        ref.current = setTimeout(() => {
            if (val.length === 0) {
                setFilteredDoctors(Doctors);
                setcurrCategory({ id: 0 });
            } else {
                const data = Doctors.filter((item) =>
                    item?.name?.toLowerCase().includes(val.toLowerCase())
                );
                setFilteredDoctors(data);
            }
            setLoading(false);
        }, 300);
    }, [Doctors]);

    return (
        <View style={styles.mainContainer}>
            <Header back profile title={'Doctors'} />
            <ScrollView>
                <Input
                    value={search}
                    search placeholder={'Search'} mainStyle={{ marginVertical: 15, width: '90%' }}
                    onChangeText={(e) => onSearchDoctor(e)}
                />

                <FlatList
                    key={"CategoriesList"}
                    showsHorizontalScrollIndicator={false}
                    data={[{ id: 0, name: 'All' }, ...doctorCategories]}
                    horizontal
                    renderItem={renderCategoryItem}
                    keyExtractor={item => item?.id}
                    style={{ width: '90%', alignSelf: 'center' }}
                />

                {
                    loading ?

                        <ActivityIndicator size="large" color={Colors.PRIMARY} style={{ marginTop: 20 }} />
                        :

                        <FlatList
                            key={"DoctorsList"}
                            showsVerticalScrollIndicator={false}
                            data={FilteredDoctors}
                            renderItem={({ item }) => (
                                <DoctorCard item={item} style={{ width: '90%' }} />
                            )}
                            keyExtractor={item => item?.id}
                            ListEmptyComponent={<ListEmptyComponent text={'no doctors found'} />}
                        />

                }
            </ScrollView>
        </View>
    )
}

export default Doctors;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    category_box: {
        height: 40,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 8,
        gap: 6
    },
    category_text: {
        color: Colors.PRIMARY,
        fontSize: 12
    },
})