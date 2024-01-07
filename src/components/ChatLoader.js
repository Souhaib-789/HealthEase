import React from "react";
import Lottie from 'lottie-react-native';

const ChatLoader = (props) => {
    return (
        <Lottie source={require('../assets/animations/chatLoader.json')}
            autoPlay
            loop
            style={{ width: 140 , height: 120  }}
            
        />
    )
}
export default ChatLoader;