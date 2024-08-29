import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList, Modal as RNModal } from "react-native";
import { Colors } from "../../../utilities/Colors";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Input from "../../../components/Input";
import DatePicker from 'react-native-date-picker'
import moment from "moment";
import Entypo from 'react-native-vector-icons/Entypo'
import DocumentPicker from 'react-native-document-picker';
import { useNavigation } from "@react-navigation/native";
import Image from "../../../components/Image";
import PDF from '../../../assets/images/pdf.png'
import TextComponent from "../../../components/TextComponent";
import Icon, { IconTypes } from "../../../components/Icon";
import ListEmptyComponent from "../../../components/ListEmptyComponent";
import Header from "../../../components/Header";
import { Fonts } from "../../../utilities/Fonts";
import Button from "../../../components/Button";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../redux/actions/GeneralAction";
import { useTranslation } from "react-i18next";
import { RecordsMiddleware } from "../../../redux/middlewares/RecordsMiddleware";


const Records = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const [currDate, setcurrDate] = useState(new Date())
    const [dateModalopen, setdateModalOpen] = useState(false)
    const [openModal, setopenModal] = useState(false)
    const [name, setname] = useState()
    const [type, settype] = useState()
    const [date, setdate] = useState(null)
    const [doc, setdoc] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchRecordsData()
    }, [])

    const fetchRecordsData = () => {
        dispatch(RecordsMiddleware.getAllRecords())
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
    }

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

    const onDelDoctor = (id) => {
        dispatch(RecordsMiddleware.onDeleteRecord(data))
        .then(() => {
            navigation.goBack()
        }
        )
        .catch(err => console.log('err', err))

}
    const uploadDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf , DocumentPicker.types.docx, DocumentPicker.types.doc],
            });
            
            setdoc({
                uri: res[0]?.uri,
                name: res[0]?.name,
                size: res[0]?.size,
                type: res[0]?.type,
            });

         
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                alert(t('Selection Canceled'));
            } else {
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    const onPressSubmitDoc = () => {
        if (!name) {
            alert('Please enter record name')
        } else if (!doc) {
            alert('Please upload document')
        } else if (!type) {
            alert('Please select type of record')
        }
        else {
            const data = {
                file: doc,
                name: name,
                type: type?.name
            }
            console.log('data : ' + JSON.stringify(data, null ,8));

            dispatch(RecordsMiddleware.onAddRecord(data))
                .then(res => {
                    setopenModal(false)

                })
                .catch(err => {
                    console.log('Error : ' + err);
                })
        }
    }

    return (
        <View style={styles.Container}>
            <ScrollView>
                <Header title={'Records'} back profile />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={SampleDocs}
                    renderItem={renderDocsItem}
                    keyExtractor={item => item?.id}
                    ListEmptyComponent={<ListEmptyComponent text={'no records found'} />}
                />

            </ScrollView>

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



                        <TextComponent style={styles.text_w} text={'Type of record'} />
                        <View style={styles.row}>
                            {
                                Doctypes?.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => settype(item)} key={index}
                                            style={styles.types_options}>
                                            <FontAwesome5 name={item?.icon} color={item?.id == type?.id ? Colors.PRIMARY : Colors.GREY} size={20} />
                                            <TextComponent style={[styles.text_z, { color: item?.id == type?.id ? Colors.PRIMARY : Colors.DGREY }]} text={item?.name} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>

                        <Input
                            label={'Record for'}
                            placeholder={'e.g: Alex'}
                            value={name}
                            onChangeText={(e) => setname(e)}
                            mainStyle={styles.input}
                        />

                        {/* <TextComponent style={styles.text_w} text={'Record created on'} />
                        <Input
                            value={date ? moment(date).format('D MMM, yy') : null}
                            placeholder={'Select Date'}
                            editable={false}
                            onPressRightIcon={() => setdateModalOpen(true)}
                            rightIcon={<Icon name={'date-range'} type={IconTypes.MaterialIcons} color={Colors.GREY} />}
                            mainStyle={styles.input}
                        /> */}

                        <TouchableOpacity style={styles.button} onPress={uploadDocument} >
                            {
                                doc ?
                                    <Icon name={'document-text'} type={IconTypes.Ionicons} color={Colors.PRIMARY} size={40} />
                                    :
                                    <Icon name={'cloud-upload'} type={IconTypes.MaterialCommunityIcons} color={Colors.PRIMARY} size={40} />

                            }
                            <TextComponent style={styles.button_text} text={doc ? doc?.name : 'Upload Document'} numberOfLines={1} />
                        </TouchableOpacity>

                        <Button title={'Save Record'} onPress={onPressSubmitDoc} />
                    </View>
                </View>
            </RNModal>


            <TouchableOpacity style={styles.add_icon} onPress={() => setopenModal(true)}>
                <Icon name={'addfile'} type={IconTypes.AntDesign} color={Colors.WHITE} size={20} />
            </TouchableOpacity>

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
        </View>
    )
}

export default Records;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    row: { flexDirection: "row", alignItems: "center" },
    button: {
        gap: 5,
        borderRadius: 20,
        width: '70%',
        backgroundColor: Colors.WHITE,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        alignSelf: "center",
        marginVertical: 15,
        borderStyle: "dotted",
        borderColor: Colors.PRIMARY,
        borderWidth: 1
    },
    button_text: {
        color: Colors.PRIMARY,
        fontSize: 13,

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
        width: '90%',
        alignSelf: 'center'
    },
    text: {
        color: Colors.WHITE,
        fontSize: 16
    },
    text_w: {
        fontSize: 12,
        fontFamily: Fonts.MEDIUM,
        color: Colors.BLACK,
    },
    text_x: {
        fontSize: 14,
        color: Colors.BLACK,
    },
    text_y: {
        fontSize: 11,
        color: Colors.DDGREY,
    },
    text_z: {
        fontSize: 12,
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
        paddingVertical: 37,
        paddingHorizontal: 15,
        backgroundColor: Colors.WHITE,
        marginTop: '60%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',
        gap: 10
    },
    input: {
        marginVertical: 5
    },
    types_options: {
        alignItems: "center",
        marginLeft: 20,
        marginBottom: 5,
        gap: 3
    },
    cross_icon: {
        position: "absolute",
        right: 10,
        top: 15,
    },
    add_icon: { position: 'absolute', bottom: 30, right: 20, backgroundColor: Colors.PRIMARY, borderRadius: 100, width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }
})