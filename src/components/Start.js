import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import { verifyAppkey } from '../utils/network';

export default Start = (props) => {

    const [loading, setLoading] = useState(false)

    /*
        1 = DL back scan to capture
        2 = DL front and back
        3 = DL front, back and selfie
        4 = DL front, back, selfie and matching result
    */
    const verifyAppKey = async () => {
        setLoading(true)
        try {
            const res = await verifyAppkey(props.appKey)
            props.appKeyVerified(res)
        } catch (error) {
            props.appKeyVerifyFailed(error)
        }
    }

    return (
        <View style={styles.itemContainer}>
            <View style={styles.topContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={props.onClose}>
                    <Text style={{paddingBottom: 10}}>Close</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.uverifyText}>
                We need few info to verify you ID. Please follow the instructions
            </Text>
            {loading &&
                <ActivityIndicator
                    style={{ marginTop: 50, marginBottom: 20 }}
                    size="small"
                    color="#65C47C" />
            }
            {!loading &&
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={verifyAppKey}
                    style={styles.startButton}>
                    <Text style={styles.startBtn}>Start</Text>
                </TouchableOpacity>
            }
            <Text style={styles.uverifyText}>
                Powered by UverifyID
            </Text>
        </View>
    )
}

Start.propTypes = {
    onClose: PropTypes.func.isRequired,
    appKeyVerified: PropTypes.func.isRequired,
    appKeyVerifyFailed: PropTypes.func.isRequired,
    appKey: PropTypes.string.isRequired
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
    },
    startButton: {
        backgroundColor: '#65C47C',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 50,
        marginBottom: 20
    },
    startBtn: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16
    }
})