import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import PropTypes from 'prop-types';

export default CaptureView = (props) => {

    return (
        <View style={styles.itemContainer}>
            {props.step === 1.5 &&
                <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 15 }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={props.onRetry}>
                        <Text style={styles.text}>Retry</Text>
                    </TouchableOpacity>
                </View>
            }
            {(props.step === 1 || props.step === 2) &&
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={props.onCapture}
                        style={styles.captureContainer}>
                        <View style={styles.captureView} />
                    </TouchableOpacity>
                </View>
            }
            {props.step === 1.5 &&
                <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 15 }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={props.onUse}>
                        <Text style={styles.text}>Use</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

CaptureView.propTypes = {
    onRetry: PropTypes.func.isRequired,
    onUse: PropTypes.func.isRequired,
    onCapture: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'gray',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        minHeight: 60,
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    },
    captureView: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20
    },
    captureContainer: {
        borderWidth: 3,
        borderRadius: 26,
        padding: 2,
        borderColor: 'white'
    }
})