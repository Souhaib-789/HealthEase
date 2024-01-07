import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput, Modal as RNModal } from "react-native";
import { Colors } from "../../Config/Colors";
import Header from "../../components/Header";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Input from "../../components/Input";
import DatePicker from 'react-native-date-picker'
import moment from "moment";
import Entypo from 'react-native-vector-icons/Entypo'
import DocumentPicker from 'react-native-document-picker';
import { useNavigation } from "@react-navigation/native";
import Image from "../../components/Image";
import PDF from '../../assets/images/pdf.png'
import TextComponent from "../../components/TextComponent";
import Icon, { IconTypes } from "../../components/Icon";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import TopTabs from "../../components/TopTabs";
import MyRecords from "./MyRecords";
import DoctorRecords from "./DoctorRecords";


const MedicalRecords = () => {
    const navigation = useNavigation()
    const [currDate, setcurrDate] = useState(new Date())
    const [dateModalopen, setdateModalOpen] = useState(false)
    const [openModal, setopenModal] = useState(false)
    const [name, setname] = useState()
    const [type, settype] = useState({ id: 1 })
    const [date, setdate] = useState(null)
    const [doc, setdoc] = useState()


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
            <Header title={'Medical Records'} backIcon />
            <ScrollView>
                <TopTabs
                    components={[
                        {
                            component: () => <MyRecords />,
                            name: "My records",
                            label: "My records"
                        },
                        {
                            component: () => <DoctorRecords />,
                            name: "By Doctors",
                            label: "By Doctors"
                        },
                    ]}
                />

                {/* ---------------------------- MODAL --------------------------------------------------------- */}
                <RNModal
                    animationType={'slide'}
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
        padding: 10
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
        borderRadius: 8,
        elevation: 3,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 3,
        flexDirection: "row",
        alignItems: "center",
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
        fontSize: 14,
        color: Colors.BLACK,
        fontWeight: 500
    },
    text_y: {
        fontSize: 11,
        color: Colors.DDGREY,
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