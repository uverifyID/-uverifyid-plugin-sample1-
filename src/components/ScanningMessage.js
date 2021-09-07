import React, { useRef } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Animated
} from 'react-native';
import PropTypes from 'prop-types';

export default ScanningMessage = (props) => {

    const fadeAnim = useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 750,
                    useNativeDriver: false
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 750,
                    useNativeDriver: false
                })
            ])
        ).start()
    }, [fadeAnim])

    return (
        <View style={styles.itemContainer}>
            <View style={styles.topContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={props.onClose}>
                    <Text style={{paddingBottom: 10}}>Close</Text>
                </TouchableOpacity>
            </View>
            <Animated.View
                style={{
                    opacity: fadeAnim
                }}
            >
                <Text style={styles.uverifyText}>
                    Verifying... Please wait!
                </Text>
            </Animated.View>
            <ActivityIndicator
                style={{ marginTop: 50, marginBottom: 20 }}
                size="small"
                color="#65C47C" />
            <Text style={styles.uverifyText}>
                Powered by UverifyID
            </Text>
        </View>
    )
}

ScanningMessage.propTypes = {
    onClose: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopEndRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    closeImage: {
        height: 15,
        width: 15
    },
    topContainer: {
        position: 'absolute',
        right: 15,
        top: 15
    },
    uverifyText: {
        fontSize: 16,
        textAlign: 'center'
    }
})