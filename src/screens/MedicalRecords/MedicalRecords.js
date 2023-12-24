import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, TextInput, Modal as RNModal } from "react-native";
import { Colors } from "../../Config/Colors";
import BgImage from "../../components/BgImage";
import Header from "../../components/Header";
import noRecordImage from '../../assets/images/illustration.png'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Input from "../../components/Input";
import DatePicker from 'react-native-date-picker'
import moment from "moment";
import Entypo from 'react-native-vector-icons/Entypo'
import DocumentPicker from 'react-native-document-picker';
import { useNavigation } from "@react-navigation/native";

const MedicalRecords = () => {
    const navigation = useNavigation()
    const [currDate, setcurrDate] = useState(new Date())
    const [dateModalopen, setdateModalOpen] = useState(false)
    const [openModal, setopenModal] = useState(false)
    const [name, setname] = useState()
    const [type, settype] = useState({ id: 1 })
    const [date, setdate] = useState(null)
    const [doc, setdoc] = useState()

    let dataSend = {
        doc_name: name,
        type: type?.name,
        date: date,
        doc: doc
    }

    const SampleDocs = [
        // {
        //     id: 1,
        //     date: '24',
        //     doc_name: 'Abdullah Maman',
        //     type: 'Prescription'
        // },
        // {
        //     id: 2,
        //     date: '01',
        //     doc_name: 'Sarah Gill',
        //     type: 'Image'
        // },
        // {
        //     id: 3,
        //     date: '22',
        //     doc_name: 'Will Harry',
        //     type: 'Pdf'
        // },
    ]

    const Doctypes = [
        {
            id: 1,
            name: 'Report',
            icon: 'file-medical'
        },
        {
            id: 2,
            name: 'Prescription',
            icon: 'file-contract'
        },
        {
            id: 3,
            name: 'Invoice',
            icon: 'file-invoice-dollar'
        },
    ]

    const renderDocsItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.doc_card}>
                <View style={styles.date_box}>
                    <Text style={styles.text}>{item?.date}</Text>
                    <Text style={styles.text}>FEB</Text>
                </View>

                <View style={styles.sub_doc_card}>
                    <Text style={styles.text_x}>Records added by you</Text>
                    <Text style={styles.text_y}>Record for {item?.doc_name}</Text>
                    <Text style={styles.text_z}>1 {item?.type}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const ListEmptyComponent = () => {
        return (
            <View style={styles.list_empty_view}>
                <Image source={noRecordImage} style={styles.no_record_image} />
                <Text style={styles.heading}>Add a medical record</Text>
                <Text style={styles.bio}>A detailed health history helps a doctor diagnose you btter.</Text>
            </View>
        )
    }

    const uploadDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res[0].uri);
            //   console.log('Type : ' + res.type);
            console.log('File Name : ' + res[0].name);
            //   console.log('File Size : ' + res.size);
            setdoc(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                alert('Selection Canceled');
            } else {
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };


    return (
        <View style={styles.Container}>
            <BgImage />
            <ScrollView>
                <Header title={'Medical Records'} />

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={SampleDocs}
                    renderItem={renderDocsItem}
                    keyExtractor={item => item?.id}
                    ListEmptyComponent={ListEmptyComponent}
                />

                <TouchableOpacity style={styles.button}
                    onPress={() => setopenModal(true)}>
                    <Text style={styles.button_text}>Add a record</Text>
                </TouchableOpacity>



                {/* ---------------------------- MODAL --------------------------------------------------------- */}
                <RNModal
                    animationType={'fade'}
                    transparent={true}
                    visible={openModal}>

                    <View style={styles.modal_container}>
                        <View style={styles.modal_sub_container}>

                            <TouchableOpacity style={styles.cross_icon}
                                onPress={() => setopenModal(false)} >
                                <Entypo name={'cross'} color={Colors.DGREY} size={20} />
                            </TouchableOpacity>

                            <Text style={styles.text_w}>Record for</Text>
                            <Input
                                value={name}
                                onChangeText={(e) => setname(e)}
                                pencil={true}
                                style={styles.input}
                                mainStyle={styles.main_input_container}
                            />

                            <Text style={styles.text_w}>Type of record</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                {
                                    Doctypes?.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => settype(item)} key={index}
                                                style={styles.types_options}>
                                                <FontAwesome5 name={item?.icon} color={item?.id == type?.id ? Colors.PRIMARY : Colors.DGREY} size={25} />
                                                <Text style={[styles.text_z, { color: item?.id == type?.id ? Colors.PRIMARY : Colors.DGREY }]}>{item?.name}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            <Text style={styles.text_w}>Record created on</Text>
                            <Input
                                value={date ? moment(date).format('D MMM, yy') : null}
                                placeholder={'Date'}
                                editable={false}
                                pencil={true}
                                onPencilPress={() => setdateModalOpen(true)}
                                style={styles.input}
                                mainStyle={styles.main_input_container}
                            />
                            <DatePicker
                                modal
                                mode="date"
                                open={dateModalopen}
                                date={currDate}
                                onConfirm={(date) => {
                                    setdateModalOpen(false)
                                    setdate(date)
                                }}
                                onCancel={() => {
                                    setdateModalOpen(false)
                                }}
                            />

                            <TouchableOpacity style={styles.button} onPress={uploadDocument} >
                                <Text style={styles.button_text}>{doc ? doc[0].name : 'Upload Document'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, { marginTop: 5 }]}
                                onPress={() => { alert('Document Uploaded!'), navigation.goBack() }} >
                                <Text style={styles.button_text}>Add Record</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RNModal>
                {/* ---------------------------- MODAL END --------------------------------------------------------- */}

            </ScrollView>
        </View>
    )
}

export default MedicalRecords;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
        color: Colors.BLACK
    },
    no_record_image: {
        width: 160,
        height: 160,
        resizeMode: "contain",
        marginTop: 80,
        marginBottom: 25
    },
    bio: {
        textAlign: "center",
        marginHorizontal: 20,
        lineHeight: 20
    },
    button: {
        borderRadius: 5,
        width: '80%',
        backgroundColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        alignSelf: "center",
        marginTop: 40,
        marginVertical: 10
    },
    list_empty_view: {
        alignItems: "center",
    },
    button_text: {
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: 500
    },
    doc_card: {
        backgroundColor: Colors.WHITE,
        borderRadius: 7,
        elevation: 3,
        padding: 10,
        paddingVertical: 15,
        alignItems: "center",
        marginVertical: 10,
        flexDirection: "row",
        width: '90%',
        alignSelf: "center"
    },
    date_box: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 12,
        alignItems: "center"
    },
    text: {
        color: Colors.WHITE,
        fontSize: 16
    },
    text_w: {
        fontSize: 17,
        color: Colors.BLACK,
        fontWeight: 500,
        marginTop: 15
    },
    text_x: {
        fontSize: 15,
        color: Colors.BLACK,
        fontWeight: 500
    },
    text_y: {
        fontSize: 13,
        color: Colors.PRIMARY,
    },
    text_z: {
        fontSize: 13,
    },
    sub_doc_card: {
        marginLeft: 18
    },
    modal_container: {

        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',

    },
    modal_sub_container: {
        alignSelf: "center",
        paddingVertical: 23,
        paddingHorizontal: 15,
        backgroundColor: Colors.WHITE,
        marginTop: '70%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',

    },
    input: {
        borderBottomColor: Colors.DGREY,
        borderBottomWidth: 1,
        fontSize: 15,
        color: Colors.PRIMARY,
        fontWeight: "bold"
    },
    main_input_container: {
        elevation: 0,
        marginVertical: 0,
        paddingVertical: 0,
    },
    types_options: {
        alignItems: "center",
        margin: 15
    },
    cross_icon: {
        position: "absolute",
        right: 10,
        top: 15
    }
})