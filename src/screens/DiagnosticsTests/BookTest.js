import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "../../utilities/Colors";
import BgImage from "../../components/BgImage";
import Header from "../../components/Header";
import Input from "../../components/Input";
import RadioButtonRN from 'radio-buttons-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from "react-native-date-picker";
import moment from "moment";
import SuccessModal from "../../components/SuccessModal";
import { useNavigation } from "@react-navigation/native";

const BookTest = (props) => {

    const navigation = useNavigation();
    const routeData = props?.route?.params?.item
    // console.log('---------------', routeData);

    const [name, setname] = useState()
    const [age, setage] = useState()
    const [gender, setgender] = useState()
    const [mobile, setmobile] = useState()
    const [email, setemail] = useState()

    const [currDate, setcurrDate] = useState(new Date())
    const [date, setdate] = useState(null)
    const [dateModalopen, setdateModalOpen] = useState(false)
    const [address, setaddress] = useState()

    const [selectTestDropdown, setselectTestDropdown] = useState(false)
    const [selectedTest, setselectedTest] = useState()
    const [selectTestTypeDropdown, setselectTestTypeDropdown] = useState(false)
    const [selectedTestType, setselectedTestType] = useState()
    const [openModal, setopenModal] = useState(false)



    const onPressBookTest = () => {
        let TestData = {
            patientName: name,
            age: age,
            gender: gender?.label,
            test: routeData ? routeData?.test : selectedTest,
            test_type: selectedTestType?.label,
            address: address,
            date: date,
            mobile_no: mobile,
            email: email
        }
        setopenModal(true)
    }

    const genderOptions = [
        {
            label: 'Male'
        },
        {
            label: 'Female'
        }
    ];

    const testOptions = [
        {
            id: 1,
            label: 'Blood Test',
            price: 1500
        },
        {
            id: 2,
            label: 'Sugar Test',
            price: 500
        },
        {
            id: 3,
            label: 'X-Ray',
            price: 2000
        },
        {
            id: 4,
            label: 'Blood Pressure',
            price: 300
        }];

    const typeOptions = [
        {
            id: 1,
            label: 'I will come to lab'
        },
        {
            id: 2,
            label: 'Take sample from home'
        }];

    return (
        <View style={styles.Container}>
            <BgImage />
            <Header title={'Book a test'} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.sub_view}>

                    <Text style={styles.label}>Patient's Name</Text>
                    <Input
                        placeholder={'Enter name'}
                        value={name}
                        onChangeText={(e) => setname(e)}
                        mainStyle={styles.mainInput} style={styles.subInput} />

                    <Text style={styles.label}>Age</Text>
                    <Input
                        placeholder={'Enter age'}
                        value={age}
                        onChangeText={(e) => setage(e)}
                        mainStyle={styles.mainInput} style={styles.subInput} />

                    <Text style={styles.label}>Gender</Text>
                    <RadioButtonRN
                        data={genderOptions}
                        box={false}
                        style={{ marginBottom: 10 }}
                        selectedBtn={(e) => setgender(e)}
                    />


                    <TouchableOpacity disabled={routeData ? true : false} style={styles.dropdown}
                     onPress={() => setselectTestDropdown(!selectTestDropdown)} >
                        <Text style={styles.textx}>{routeData ? routeData?.test?.label :  selectedTest?.label ? selectedTest?.label : 'Select Test'}</Text>
                        <MaterialIcons name={'arrow-drop-down'} size={23} color={Colors.DGREY} />
                    </TouchableOpacity>
                    {
                        selectTestDropdown ?

                            <View style={styles.optionBox}>
                                {
                                    testOptions?.map((item, index) => {
                                        return (
                                            <TouchableOpacity key={index} style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}
                                            onPress={() => { setselectedTest(item), setselectTestDropdown(false) }}>
                                                <Text style={styles.dropdown_text}>{item?.label}</Text>
                                                <View style={{flexDirection: "row", alignItems: "center"}}> 
                                                <Ionicons name={'pricetag'} size={15} color={Colors.PRIMARY} />
                                                <Text style={styles.dropdown_text}>{item?.price}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            : null
                    }


                    <TouchableOpacity style={styles.dropdown} onPress={() => setselectTestTypeDropdown(!selectTestTypeDropdown)}>
                        <Text style={styles.textx}>{selectedTestType?.label ? selectedTestType?.label : 'Select Test Type'}</Text>
                        <MaterialIcons name={'arrow-drop-down'} size={23} color={Colors.DGREY} />
                    </TouchableOpacity>
                    {
                        selectTestTypeDropdown ?
                            <View style={styles.optionBox}>
                                {
                                    typeOptions?.map((item, index) => {
                                        return (
                                            <TouchableOpacity key={index} onPress={() => { setselectedTestType(item), setselectTestTypeDropdown(false) }}>
                                                <Text style={styles.dropdown_text}>{item?.label}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            : null
                    }

                    {
                        selectedTestType?.id == 2 ?
                            <>
                                <Text style={styles.label}>Address</Text>
                                <Input
                                    placeholder={'Enter full address'}
                                    value={address}
                                    onChangeText={(e) => setaddress(e)}
                                    mainStyle={styles.mainInput} style={styles.subInput} />
                            </>
                            : null
                    }


                    <>
                        <Text style={styles.label}>When ?</Text>
                        <TouchableOpacity onPress={() => setdateModalOpen(true)}>
                            <Input
                                placeholder={'Date'}
                                value={date ? moment(date).format('D MMM , ddd') : 'Date'}
                                editable={false}
                                onChangeText={(e) => setdate(e)}
                                mainStyle={styles.mainInput} style={styles.subInput} />
                        </TouchableOpacity>

                        <DatePicker
                            modal
                            mode="date"
                            date={currDate}
                            open={dateModalopen}
                            onConfirm={(date) => {
                                setdateModalOpen(false)
                                setdate(date)
                            }}
                            onCancel={() => {
                                setdateModalOpen(false)
                            }}
                        />
                    </>

                    <Text style={styles.label}>Mobile Number</Text>
                    <Input
                        placeholder={'Enter number'}
                        value={mobile}
                        onChangeText={(e) => setmobile(e)}
                        keyboardType={'numeric'}
                        mainStyle={styles.mainInput} style={styles.subInput} />

                    <Text style={styles.label}>Email</Text>
                    <Input
                        placeholder={'Enter email'}
                        value={email}
                        onChangeText={(e) => setemail(e)}
                        mainStyle={styles.mainInput} style={styles.subInput} />

                </View>

                <TouchableOpacity style={[styles.button, { marginTop: 10 }]}
                    onPress={onPressBookTest} >
                    <Text style={styles.button_text}>Book</Text>
                </TouchableOpacity>

                <SuccessModal
                    children={
                        <View style={{ alignItems: "center", paddingTop: 15 }}>
                            <Ionicons name={'md-checkmark-done-circle-outline'} color={Colors.PRIMARY} size={80} />

                            <Text style={[styles.label, { fontSize: 25, }]}>Test Booked!</Text>
                            <Text style={styles.modal_message}>Your test has request has been sent successfully. You will be notify when request will accept by the lab</Text>
                        </View>
                    }
                    close={true}
                    text={'OK'}
                    OnClose={() => navigation.navigate('DiagnosticsTests')}
                    visible={openModal} />

            </ScrollView>
        </View>
    )
}

export default BookTest;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    sub_view: {
        backgroundColor: Colors.WHITE,
        elevation: 5,
        borderRadius: 8,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 12
    },
    label: {
        fontSize: 15,
        marginTop: 10,
        fontWeight: "bold",
        color: Colors.BLACK
    },
    mainInput: {
        width: '100%',
        alignSelf: 'center',
        marginBottom: 15,
        marginTop: 8,
        backgroundColor: 'transparent',
        elevation: 0, borderWidth: 1,
        borderColor: Colors.GREY,
        borderRadius: 13
    },
    subInput: {
        backgroundColor: 'transparent',
        fontSize: 14
    },
    dropdown: {
        padding: 8,
        paddingHorizontal: 10,
        backgroundColor: Colors.LIMEBLUE,
        borderRadius: 5,
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
    textx: {
        color: Colors.BLACK,
    },
    optionBox: {
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 10,
        elevation: 5
    },
    dropdown_text: {
        color: Colors.BLACK,
        borderBottomColor: 'rgba(211,211,211, 0.4)',
        textAlign: "center",
        padding: 5,
        borderBottomWidth: 1,
        marginVertical: 5
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
    button_text: {
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: 500
    },
    modal_message: { marginTop: 10, lineHeight: 20, fontSize: 13, textAlign: "center", margin: 26 }
})   
