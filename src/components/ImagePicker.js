import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const OpenImagePicker = (callback, mediaType = 'photo', multiple = false,) => {

    Alert.alert(
        'Options',
        'Select one option to continue',
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Camera',
                style: 'default',
                onPress: async () => {
                    try {
                        var image = await ImagePicker.openCamera({
                            multiple: false,
                            width: 200,
                            height: 200,
                            cropping: true,
                            mediaType: mediaType,
                        });

                        if (image || image.length > 0) {
                            callback(image);
                        }
                    } catch (error) {
                        console.log(error);
                        // Alert.alert('Error while uploading image');
                    }
                },
            },
            {
                text: 'Library',
                style: 'default',
                onPress: async () => {
                    try {
                        var image = await ImagePicker.openPicker({
                            mediaType: mediaType,
                            multiple: multiple,
                            width: 200,
                            height: 200,
                            cropping: true,
                        });
                        if (image || image.length > 0) {
                            callback(image);
                        }
                        // else {
                        //   Alert.alert({
                        //     text: 'Image is not selected',
                        //   });
                        // }
                    } catch (error) {
                        console.log('err ==', error);
                    }
                },
            },
        ],
        { cancelable: true },
    );
};

export default OpenImagePicker;