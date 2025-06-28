import { Link } from "expo-router";
import { useContext } from 'react';
import { Text, View } from "react-native";
import { GenStyles, GlobalContext } from "./_layout";

const Details = () => {
    const GC = useContext(GlobalContext);
    console.log(" GV is ", GC);
    return (
        <View>
            <Text style={GenStyles.logo}>
                Here
            </Text>
            <Text>Go back</Text><Link href="/">Home</Link>
        </View>
    );
}

export default Details;