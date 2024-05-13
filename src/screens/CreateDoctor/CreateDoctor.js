import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Platform, FlatList, Modal as RNMODAL } from "react-native";
import Header from "../../components/Header";
import { Colors } from "../../utilities/Colors";
import Input from "../../components/Input";
import ImagePicker from 'react-native-image-crop-picker';
import SuccessModal from "../../components/SuccessModal";
import { useNavigation } from "@react-navigation/native";
import TextComponent from "../../components/TextComponent";
import Button from "../../components/Button";
import Icon, { IconTypes } from "../../components/Icon";
import { Fonts } from "../../utilities/Fonts";
import moment from "moment";
import Dropdown from "../../components/Dropdown";
import FormModal from "../../components/FormModal";
import { useDispatch } from "react-redux";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import DatePicker from "react-native-date-picker";

const CreateDoctor = (props) => {

    const routeData = props?.route?.params
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [docName, setdocName] = useState()
    const [fees, setfees] = useState()
    const [experience, setexperience] = useState()
    const [image, setimage] = useState()
    const [about, setabout] = useState()
    const [specialization, setspecialization] = useState()
    const [selectedDay, setselectedDay] = useState();
    const [error, seterror] = useState(false)

    const [openAvailabilityModal, setopenAvailabilityModal] = useState(false)
    const [openModal, setopenModal] = useState(false)

    const [startTime, setStartTime] = useState(null);
    const [openStartTimeModal, setopenStartTimeModal] = useState(false)

    const [currDate, setcurrDate] = useState(new Date())
    const [endTime, setEndTime] = useState(null);
    const [openEndTimeModal, setopenEndTimeModal] = useState(false)
    const [TimeSlots, setTimeSlots] = useState();
    const [refresh, setRefresh] = useState(false)

    const Days = [
        {
            id: 1,
            name: 'Mon'
        },
        {
            id: 2,
            name: 'Tue'
        },
        {
            id: 3,
            name: 'Wed'
        },
        {
            id: 4,
            name: 'Thur'
        },

        {
            id: 5,
            name: 'Fri'
        },

        {
            id: 6,
            name: 'Sat'
        },

        {
            id: 7,
            name: 'Sun'
        }]

    const specializationsList = [
        {
            id: 1,
            name: 'Cardiologist',
            value: 'Cardiologist'
        },
        {
            id: 2,
            name: 'Dentist',
            value: 'Dentist'
        },
        {
            id: 3,
            name: 'Dermatologist',
            value: 'Dermatologist'
        },
    ]

    console.log(TimeSlots);
    const UploadImage = () => {
        try {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => {
                let splitPath = image?.path?.split("/")
                let filename = splitPath[splitPath?.length - 1]
                setimage({
                    uri: Platform.OS == 'ios' ? image?.path.replace("file://", "/") : image?.path,
                    name: filename,
                    size: image?.size,
                    type: image?.mime,
                });
            }).catch(e => {
                console.log('===>', e);
            });
        } catch (e) {
            console.log('===>', e)
        }
    }

    const renderDaysCard = ({ item, index }) => {
        let isExits = selectedDay?.id == item?.id
        let isAlreadyBooked = TimeSlots?.find(e => e?.day?.id == item?.id)
        return (
            <TouchableOpacity key={index} style={[styles.slot_box,
            { backgroundColor: isExits ? Colors.PRIMARY : Colors?.LIGHT }]}
                onPress={() => {
                    if (isAlreadyBooked) {
                        seterror('This day is already booked')
                        setselectedDay(item)
                    } else {
                        seterror(null)
                        setselectedDay(item)
                    }
                }}>
                <TextComponent style={{ color: isExits ? Colors.WHITE : Colors.PRIMARY, fontSize: 10, fontFamily: Fonts.MEDIUM }} text={item?.name} />
            </TouchableOpacity>
        )
    }

    const onConfirmStartTime = (selectedDate) => {
        setStartTime(selectedDate);
        setEndTime(null);
        setopenStartTimeModal(false)
    };

    const onConfirmEndTime = (selectedDate) => {
        setEndTime(selectedDate);
        setopenEndTimeModal(false)
    };


    const generateTimeSlots = () => {
        if (!selectedDay) {
            seterror('Please select a day first')
        }
        else if (selectedDay && (!startTime || !endTime)) {
            seterror('Please select start and end time')
        }
        else {
            setopenAvailabilityModal(false)
            // const slots = [];
            // let currentTime = new Date(startTime);

            // while (currentTime < endTime) {
            //     const slotStartTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            //     currentTime.setMinutes(currentTime.getMinutes() + 30);
            //     const slotEndTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            //     slots.push(`${slotStartTime} - ${slotEndTime}`);
            // }
            let finalSlot = [];
            finalSlot.push({ day: selectedDay, startTime: startTime, endTime: endTime })
            setTimeSlots(TimeSlots ? [...TimeSlots, ...finalSlot] : finalSlot)

            console.log(finalSlot);
            setStartTime(null)
            setEndTime(null)
            setselectedDay(null)
        }
    };

    return (
        <View style={styles.Container}>
            <Header title={(routeData?.screenType == 'edit' ? 'Edit' : 'Create') + ' a doctor'} back />
            <ScrollView style={{ flex: 1 }}>
                <TouchableOpacity style={styles.uploaded_image} onPress={UploadImage}>
                    {
                        image ?
                            <Image source={{ uri: image?.uri }} style={styles.uploaded_image} />
                            :
                            <>
                                <Icon type={IconTypes.Feather} name={'plus'} size={30} color={Colors.PRIMARY} />
                                <TextComponent style={{ color: Colors.PRIMARY, fontSize: 12 }} text={'Add Image'} />
                            </>
                    }
                </TouchableOpacity>


                <Input
                    label={'Doctor Name'}
                    placeholder={'Enter doctor name'}
                    value={docName}
                    onChangeText={(e) => setdocName(e)}
                    mainStyle={styles.mainInput} parentStyle={styles.input_parent_style} />

                <View style={styles.wide_row}>
                    <TextComponent text={'Specialization'} style={styles.label} />
                </View>
                <Dropdown
                    placeholder={'Select specialization'}
                    array={specializationsList}
                    state={specialization}
                    setState={(e) => setspecialization(e)}
                    style={{ width: '90%', marginBottom: 10 }} />

                <Input
                    label={'Fees (per slot)'}
                    placeholder={'Enter fees'}
                    value={fees}
                    onChangeText={(e) => setfees(e)}
                    keyboardType={'phone-pad'}
                    mainStyle={styles.mainInput} parentStyle={styles.input_parent_style} />

                <Input
                    label={'Experience (in years)'}
                    placeholder={'Enter experience'}
                    value={experience}
                    keyboardType={'phone-pad'}
                    onChangeText={(e) => setexperience(e)}
                    mainStyle={styles.mainInput} parentStyle={styles.input_parent_style} />

                <Input
                    label={'About'}
                    placeholder={'Enter about'}
                    value={about}
                    multiline
                    numberOfLines={5}
                    onChangeText={(e) => setabout(e)}
                    style={{ textAlignVertical: 'top' }}
                    mainStyle={styles.mainInput} parentStyle={styles.input_parent_style} />


                <View style={styles.wide_row}>
                    <TextComponent text={'Set Availability'} style={styles.label} />
                    <TouchableOpacity onPress={() => setopenAvailabilityModal(true)}>
                        <Icon name={'calendar'} type={IconTypes.Ionicons} size={20} color={Colors.PRIMARY} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={TimeSlots}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.summary}>
                            <View style={styles.row}>
                                <Icon name={'clockcircleo'} type={IconTypes.AntDesign} size={18} color={Colors.PRIMARY} />
                                <TextComponent text={item?.day?.name} style={styles.text} />
                            </View>
                            <View key={index} style={[styles.slot_box, { width: 130 }]} >
                                <TextComponent style={styles.textx} text={moment(item?.startTime, 'hh:mm').format('LT') + ' - ' + moment(item?.endTime, 'hh:mm').format('LT')} />
                            </View>
                            <TouchableOpacity onPress={() => {
                                let temp = TimeSlots;
                                temp.splice(index, 1)
                                setTimeSlots(temp)
                                setRefresh(!refresh)
                            }
                            }>
                                <Icon name={'close'} type={IconTypes.AntDesign} size={15} color={Colors.PRIMARY} />
                            </TouchableOpacity>
                        </View>
                    )}
                    extraData={refresh}
                    ListEmptyComponent={<ListEmptyComponent short text={'no availability found'} />}
                />

                <Button title={routeData?.screenType == 'edit' ? 'Save' : 'Create'} onPress={() => setopenModal(true)} style={styles.button} />
            </ScrollView>


            {/* ------------------ SETTING AVAILABILITY MODAL ------------------------------- */}

            <FormModal
                visible={openAvailabilityModal}
                setOpen={setopenAvailabilityModal}
                onClose={() => setopenAvailabilityModal(false)}
            >
                <View style={{ padding: 15 }}>
                    <TextComponent text={'Select Day'} style={styles.label} />
                    <FlatList
                        data={Days}
                        horizontal
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderDaysCard}
                        style={{ alignSelf: 'center' }}
                    />
                    {
                        !!error &&
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginVertical: 3, alignSelf: 'center' }}>
                            <Icon name='alert-triangle' type={IconTypes.Feather} size={12} color={Colors.RED} />
                            <TextComponent text={error} style={{ fontSize: 10, color: Colors?.RED }} />
                        </View>
                    }

                    <TextComponent text={'Choose TimeSlots'} style={styles.label} />

                    <View style={styles.wide_row}>
                        <TouchableOpacity style={styles.select_time_btn} onPress={() => {
                            if (!selectedDay || !!error) {
                                seterror('Please select a day first')
                            }
                             else {
                                setopenStartTimeModal(true)
                            }
                        }}>
                            <Icon name={'clockcircleo'} type={IconTypes.AntDesign} color={Colors.PRIMARY} size={15} />
                            <TextComponent text={startTime ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Start Time'} style={styles.textx} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.select_time_btn} onPress={() => {
                            if (!startTime) {
                                seterror('Please select start time first')
                                return
                            } setopenEndTimeModal(true)
                        }}>
                            <Icon name={'clockcircleo'} type={IconTypes.AntDesign} color={Colors.PRIMARY} size={15} />
                            <TextComponent text={endTime ? endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'End Time'} style={styles.textx} />
                        </TouchableOpacity>
                    </View>
                </View>


                <Button title={'Add'} onPress={generateTimeSlots} style={{ marginTop: 5 }} />
            </FormModal>


            {/* ------------------ TIME PICKERS ------------------------------- */}

            <DatePicker
                modal
                mode="time"
                date={currDate}
                open={openStartTimeModal}
                onConfirm={onConfirmStartTime}
                onCancel={() => {
                    setopenStartTimeModal(false)
                }}
            />

            <DatePicker
                modal
                minimumDate={startTime ? startTime : new Date()}
                mode="time"
                date={currDate}
                open={openEndTimeModal}
                onConfirm={onConfirmEndTime}
                onCancel={() => {
                    setopenEndTimeModal(false)
                }}
            />



            {/* ------------------ SUCCESS MODAL ------------------------------- */}


            <SuccessModal
                children={
                    <View style={{ alignItems: "center" }}>
                        <View style={styles.thumb_bg}>
                            <Icon type={IconTypes.FontAwesome} name={'check'} color={Colors.PRIMARY} size={50} />
                        </View>
                        <TextComponent text={routeData?.screenType == 'edit' ? 'Changes Saved!' : 'Doctor Added !'} style={styles.text} />
                        <TextComponent style={styles.modal_message} text={`Your doctor has been ${routeData?.screenType == 'edit' ? 'saved' : 'added'} to your hospital's doctors list.`} />
                    </View>
                }
                OnClose={() => navigation.goBack()}
                close={true}
                visible={openModal} />

        </View>
    )
}

export default CreateDoctor;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    label: { fontSize: 12, fontFamily: Fonts.MEDIUM, marginVertical: 5, },
    input_parent_style: {
        marginVertical: 10,
        alignSelf: 'center'
    },
    wide_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        width: '90%',
        alignSelf: 'center'
    },
    text: {
        fontSize: 16,
        color: Colors?.PRIMARY,
        marginVertical: 2,
        fontFamily: Fonts?.SEMIBOLD
    },
    select_time_btn:
        { flexDirection: 'row', justifyContent: 'center', width: '45%', gap: 10, alignItems: 'center', backgroundColor: Colors.LIGHT, borderRadius: 10, padding: 10 },
    slot_box: {
        backgroundColor: Colors.LIGHT,
        width: 70,
        paddingVertical: 8,
        paddingHorizontal: 3,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        margin: 5
    },
    mainInput: {
        paddingVertical: 0,
        width: '90%',
        borderRadius: 10,
    },

    Days_view: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 10
    },
    image_upload_view: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20
    },
    uploaded_image: {
        width: 120,
        height: 120,
        borderRadius: 15,
        marginVertical: 10,
        alignSelf: "center",
        backgroundColor: Colors?.LIGHT,
        justifyContent: "center",
        alignItems: "center",

    },
    button: {
        marginVertical: 20
    },
    thumb_bg: {
        backgroundColor: Colors?.LIGHT,
        width: 120,
        height: 120,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 15
    },
    modal_message: {
        marginTop: 10,
        lineHeight: 20,
        fontSize: 13,
        textAlign: "center",
        margin: 26
    },
    flexA: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textx: {
        fontSize: 10,
        color: Colors?.PRIMARY
    },
    summary: {
        backgroundColor: Colors?.WHITE,
        elevation: 3,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        marginHorizontal: 3,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center'
    }
})