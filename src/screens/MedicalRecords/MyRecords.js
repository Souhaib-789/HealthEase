import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import { Colors } from "../../Config/Colors";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import Image from "../../components/Image";
import PDF from '../../assets/images/pdf.png'
import TextComponent from "../../components/TextComponent";
import Icon, { IconTypes } from "../../components/Icon";

const MyRecords = ( ) => {

    const SampleDocs = [
        {
            id: 1,
            date: '24',
            doc_name: 'Abdullah Maman',
            type: 'Prescription'
        },
        {
            id: 2,
            date: '01',
            doc_name: 'Sarah Gill',
            type: 'Image'
        },
        {
            id: 3,
            date: '22',
            doc_name: 'Will Harry',
            type: 'Pdf'
        },
    ]

    const renderDocsItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.doc_card}>
                <Image source={PDF} style={{ width: 30, height: 30 }} />

                <View style={styles.sub_doc_card}>
                    <TextComponent style={styles.text_x} text={'diabetes_precription.pdf'} />
                    <TextComponent style={styles.text_y} text={`Record for ${item?.doc_name}`} />
                    <TextComponent style={styles.text_y} text={'28 Mar 2023'} />
                </View>

                <TouchableOpacity style={{ position: 'absolute', right: 10, top: 10 }}>
                    <Icon type={IconTypes.FontAwesome5} name={'trash'} size={15} color={Colors?.PRIMARY} />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.Container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={SampleDocs}
                    renderItem={renderDocsItem}
                    keyExtractor={item => item?.id}
                    ListEmptyComponent={<ListEmptyComponent text={'no records found'} />}
                />
        </View>
    )
}

export default MyRecords;

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        backgroundColor: Colors.RED,
        padding: 15
    },
    heading:{
        fontSize: 20,
        fontWeight: "bold"
    },
    doc_card: {
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        elevation: 3,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 3,
        flexDirection: "row",
        alignItems: "center",
    },
    text_x: {
        fontSize: 14,
        color: Colors.BLACK,
        fontWeight: 500
    },
    text_y: {
        fontSize: 11,
        color: Colors.DDGREY,
    },
})