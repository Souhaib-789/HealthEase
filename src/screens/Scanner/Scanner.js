import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "../../utilities/Colors";
import TextComponent from "../../components/TextComponent";
import { Fonts } from "../../utilities/Fonts";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Icon, { IconTypes } from "../../components/Icon";
import Image from "../../components/Image";
import OpenImagePicker from "../../components/ImagePicker";
import TextRecognition from "@react-native-ml-kit/text-recognition";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/actions/GeneralAction";

const Scanner = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [heading, setHeading] = useState(null);
    const [text, setText] = useState();
    const [result, setResult] = useState(false);


    console.log('====================================');
    console.log('Heading:', heading);
    console.log('Text:', text);
    console.log('====================================');

    
    const onScan = async (imageURL) => {
        const result = await TextRecognition.recognize(imageURL);
        console.log('Recognized text:', result.text);
        if (result.text) {
            setResult(true);

            for (let block of result.blocks) {
                // console.log('Block text:', block.text);
                // console.log('Block frame:', block.frame);

                for (let line of block.lines) {
                    // console.log('Line text:', line.text);
                    // console.log('Line frame:', line.frame);
                }
            }
        }
        else {
            setResult(false);
            console.log('No text found');
            dispatch(showAlert({ message: 'No results found !' }));
        }
    }

    const onUploadImage = () => {
        OpenImagePicker((res) => {
            let imgName = res.path.split('/').pop();
            let imgObj = {
                uri: res.path,
                type: res.mime,
                name: imgName
            }
            setImage(imgObj)
            onScan(imgObj.uri);
        }, 'photo')
    }

    const onShareMedicine = () => {
        console.log('Shared');
    }

    return (
        <View style={styles.Container}>
            <ScrollView>
                <Header title={"Scanner"} />

                {
                    result ? (
                        <>
                            <View style={{ backgroundColor: Colors.WHITE, elevation: 5, borderRadius: 5, width: 180, height: 180, marginTop: 80, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: image?.uri }} style={{ width: 160, height: 160, borderRadius: 10 }} resizeMode='cover' />
                            </View>

                            <TouchableOpacity onPress={() => { setResult(false), setImage(null), setHeading(null), setText(null) }} style={{ position: 'absolute', top: 120, right: 80 }}>
                                <Icon name='circle-with-cross' type={IconTypes.Entypo} color={Colors.RED} size={30} />
                            </TouchableOpacity>
                        </>
                    )
                        :
                        (
                            <>
                                <Icon name={"scan"} type={IconTypes.Ionicons} color={Colors.PRIMARY} size={170} style={{ position: 'absolute', top: 100, alignSelf: 'center', marginVertical: 100 }} />
                                <Icon name={"drug-pack"} type={IconTypes.Fontisto} color={Colors.PRIMARY} size={50} style={{ alignSelf: 'center', marginTop: 200 }} />
                            </>
                        )
                }
                {
                    result ? (
                        <>
                            <TextComponent text={heading} style={{ alignSelf: 'center', width: '80%', textAlign: 'center', color: Colors.PRIMARY, fontSize: 16, fontFamily: Fonts.SEMIBOLD, marginTop: 30 }} />
                            <TextComponent text={text} style={styles.text} />

                            <View style={styles.row}>
                                <Button onPress={onUploadImage} title={"Copy"} style={styles.button} />
                                <TouchableOpacity onPress={onShareMedicine} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.LIGHT, borderWidth: 1, borderColor: Colors.PRIMARY, borderRadius: 8, width: 43, height: 47 }}>
                                    <Icon name={'share-outline'} type={IconTypes.Ionicons} size={20} color={Colors.PRIMARY} />
                                </TouchableOpacity>
                            </View>

                        </>

                    )
                        :
                        (
                            <>
                                <TextComponent style={styles.headingy} text={"Recognize your medicine by scanning its image"} />
                                <Button onPress={onUploadImage} title={"SCAN"} style={styles.button} />
                            </>
                        )
                }
            </ScrollView>
        </View>
    )
}

export default Scanner;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    heading: {
        fontSize: 20,
    },
    headingx: {
        fontSize: 20,
        color: Colors.PRIMARY,
        fontFamily: Fonts?.SEMIBOLD
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        alignSelf: 'center',
    },
    text: {
        fontSize: 14,
        alignSelf: 'center',
    },
    headingy: {
        marginTop: '60%',
        fontSize: 14,
        width: '70%',
        alignSelf: "center",
        textAlign: "center",
    },
    heading_container: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 70,
    },
    button: {
        marginVertical: 20,
        alignSelf: "center",
        width: '60%',
        // borderRadius: 60,
    }
})