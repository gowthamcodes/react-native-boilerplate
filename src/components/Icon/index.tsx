import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Zocial from "react-native-vector-icons/Zocial";
import { IconProps as RNVIconProps } from 'react-native-vector-icons/Icon'

interface IconProps extends RNVIconProps {
    type: "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "Fontisto" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial"
}

export const Icon: React.FC<IconProps> = (
    {
        type,
        ...props
    }
) => {
    if (type === "AntDesign") {
        return <AntDesign {...props} />
    } else if (type === "Entypo") {
        return <Entypo {...props} />
    } else if (type === "EvilIcons") {
        return <EvilIcons {...props} />
    } else if (type === "Feather") {
        return <Feather {...props} />
    } else if (type === "FontAwesome") {
        return <FontAwesome {...props} />
    } else if (type === "FontAwesome5") {
        return <FontAwesome5 {...props} />
    } else if (type === "Fontisto") {
        return <Fontisto {...props} />
    } else if (type === "Foundation") {
        return <Foundation {...props} />
    } else if (type === "Ionicons") {
        return <Ionicons {...props} />
    } else if (type === "MaterialCommunityIcons") {
        return <MaterialCommunityIcons {...props} />
    } else if (type === "MaterialIcons") {
        return <MaterialIcons {...props} />
    } else if (type === "Octicons") {
        return <Octicons {...props} />
    } else if (type === "SimpleLineIcons") {
        return <SimpleLineIcons {...props} />
    } else if (type === "Zocial") {
        return <Zocial {...props} />
    } else {
        return <></>
    }
}
