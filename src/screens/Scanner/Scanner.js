import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Share } from "react-native";
import { Colors } from "../../utilities/Colors";
import TextComponent from "../../components/TextComponent";
import { Fonts } from "../../utilities/Fonts";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Icon, { IconTypes } from "../../components/Icon";
import Image from "../../components/Image";
import OpenImagePicker from "../../components/ImagePicker";
import TextRecognition from "@react-native-ml-kit/text-recognition";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/actions/GeneralAction";
import FormModal from "../../components/FormModal";
import Clipboard from "@react-native-clipboard/clipboard";
import Tts from 'react-native-tts';

const Scanner = () => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [text, setText] = useState();
    const [result, setResult] = useState(false);


    const onScan = async (imageURL) => {
        const result = await TextRecognition.recognize(imageURL);
        setText(result.text);
        if (result.text) {
            setResult(true);
            Tts.getInitStatus().then(() => {
                Tts.speak(result.text);
            }, (err) => {
                if (err.code === 'no_engine') {
                    Tts.requestInstallEngine();
                }
            });
            // for (let block of result.blocks) {
            //     // console.log('Block text:', block.text);
            //     // console.log('Block frame:', block.frame);
            //     for (let line of block.lines) {
            //         // console.log('Line text:', line.text);
            //         // console.log('Line frame:', line.frame);
            //     }
            // }
        }
        else {
            Tts.speak('No results found');
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
        try {
            Share.share({
                message: text
            });
        } catch (error) {
            dispatch(showAlert({ message: error.message }));
        }
    }

    const onCopyToClipboard = () => {
        Clipboard.setString(text);
        alert('Text copied to clipboard')
    };

    return (
        <View style={styles.Container}>
            <ScrollView>
                <Header title={"Scanner"} />

                <Icon name={"scan"} type={IconTypes.Ionicons} color={Colors.PRIMARY} size={170} style={styles.scan_icon} />
                <Icon name={"drug-pack"} type={IconTypes.Fontisto} color={Colors.PRIMARY} size={50} style={styles.med_icon} />

                <TextComponent style={styles.headingy} text={"Recognize your medicine by scanning its image"} />
                <Button onPress={onUploadImage} title={"SCAN"} style={styles.button} />

            </ScrollView>



            <FormModal
                visible={result}
                onClose={() => { setResult(false), setImage(null), setText(null) }}
            >
                <View style={{ padding: 10 }}>
                    <View style={styles.image_container}>
                        <Image source={{ uri: image?.uri }} style={styles.image} resizeMode='cover' />
                    </View>
                    <TextComponent text={text} style={styles.output_text} />
                    <View style={styles.row}>
                        <Button onPress={onCopyToClipboard} title={"Copy"} style={styles.button} />
                        <TouchableOpacity onPress={onShareMedicine} style={styles.share_button}>
                            <Icon name={'share-outline'} type={IconTypes.Ionicons} size={20} color={Colors.PRIMARY} />
                        </TouchableOpacity>
                    </View>
                </View>
            </FormModal>
        </View>
    )
}

export default Scanner;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    image_container: { backgroundColor: Colors.WHITE, elevation: 5, borderRadius: 8, width: 220, height: 220, padding: 5, marginTop: 30, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
    image: { width: '100%', height: '100%', borderRadius: 10 },
    output_text: { alignSelf: 'center', width: '80%', textAlign: 'center', color: Colors.PRIMARY, fontSize: 16, fontFamily: Fonts.SEMIBOLD, marginTop: 30 },
    share_button: { alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.LIGHT, borderWidth: 1, borderColor: Colors.PRIMARY, borderRadius: 8, width: 43, height: 47 },
    scan_icon: { position: 'absolute', top: 100, alignSelf: 'center', marginVertical: 100 },
    med_icon: { alignSelf: 'center', marginTop: 200 },
    heading: {
        fontSize: 20,
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
    button: {
        marginVertical: 20,
        alignSelf: "center",
        width: '60%',
    }
})