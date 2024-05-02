import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TextRecognition from '@react-native-ml-kit/text-recognition';

const Scanner = () => {

    const onScan = async (imageURL) => {
        const result = await TextRecognition.recognize(imageURL);

        console.log('Recognized text:', result.text);

        for (let block of result.blocks) {
            console.log('Block text:', block.text);
            console.log('Block frame:', block.frame);

            for (let line of block.lines) {
                console.log('Line text:', line.text);
                console.log('Line frame:', line.frame);
            }
        }
    }

    // const UploadImage = () => {
    //     try {
    //         ImagePicker.openPicker({
    //             width: 300,
    //             height: 400,
    //             cropping: true,
    //         }).then(image => {
    //             let splitPath = image?.path?.split("/")
    //             let filename = splitPath[splitPath?.length - 1]
    //             setimage({
    //                 uri: Platform.OS == 'ios' ? image?.path.replace("file://", "/") : image?.path,
    //                 name: filename,
    //                 size: image?.size,
    //                 type: image?.mime,
    //             });
    //         }).catch(e => {
    //             console.log('===>', e);
    //         });
    //     } catch (e) {
    //         console.log('===>', e)
    //     }
    // }

    return (
        <View>
            <Text>Scanner</Text>

            <TouchableOpacity onPress={onOpenImagePicker} style={{backgroundColor:'red' , width: 100}}>
                <Text>Scan</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Scanner

const styles = StyleSheet.create({})