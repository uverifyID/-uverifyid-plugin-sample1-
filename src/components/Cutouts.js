import React, { useRef } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
    Text
} from 'react-native';
import PropTypes from 'prop-types';

export default Cutouts = (props) => {

    const scanAnim = useRef(new Animated.Value(20)).current

    const animate = useRef(Animated.loop(
        Animated.sequence([
            Animated.timing(scanAnim, {
                toValue: width - 20,
                duration: 1000,
                useNativeDriver: false
            }),
            Animated.timing(scanAnim, {
                toValue: 20,
                duration: 1000,
                useNativeDriver: false
            })
        ])
    )).current

    if (props.type === 3) {
        animate.start()
    } else {
        animate.stop()
    }

    const _cameraTitle = () => {
        if (props.textRecognitionError) {
            return 'Failed to recognize license info! Ensure that front of your Driver License is in the Frame and take a picture'
        }
        if (props.type === 1) {
            return 'Take selfie'
        } else if (props.type === 2) {
            return 'Ensure that front of your Driver License is in the Frame and take a picture'
        } else if (props.type === 3) {
            return 'Ensure that bar code on the back of the Driver License is in the frame'
        }
        return ''
    }

    return (
        <View style={styles.boxCont}>
            <Text style={styles.captureText}>{_cameraTitle()}</Text>
            {props.type === 1 &&
                <>
                    <View style={styles.circle} />
                </>
            }
            {props.type === 2 &&
                <>
                    <View style={styles.topBox} />
                    <View style={styles.box} />
                    <View style={styles.topBox} />
                </>
            }
            {props.type === 3 &&
                <>
                    <View style={styles.boxTwo} />
                    <View style={styles.barcodeLeftView} />
                    <View style={styles.barcodeRightView} />
                    <View style={[styles.boxTwo, {bottom: 0}]} />
                    <Animated.View style={[
                        styles.scanAnimView,
                        { left: scanAnim }
                    ]} />
                </>
            }
        </View>
    )
}

Cutouts.propTypes = {
    type: PropTypes.number.isRequired,
    textRecognitionError: PropTypes.bool.isRequired
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    boxCont: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    circle: {
        position: 'absolute',
        top: -width / 2 + 80,
        left: -width / 2 + 50,
        right: -width / 2 + 50,
        bottom: -width / 2 + 80,
        backgroundColor: 'transparent',
        borderWidth: width / 2,
        borderRadius: height,
        borderColor: 'black',
        opacity: 0.7,
    },
    topBox: {
        opacity: 0.7,
        backgroundColor: 'black',
        flex: 1
    },
    box: {
        height: width * 0.8
    },
    boxTwo: {
        position: 'absolute',
        height: height / 2 - 100,
        width: width - 40,
        left: 20,
        right: 20,
        backgroundColor: 'black',
        opacity: 0.7,
    },
    barcodeLeftView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        height: height,
        left: 0,
        width: 20,
        backgroundColor: 'black',
        opacity: 0.7,
    },
    barcodeRightView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        height: height,
        width: 20,
        right: 0,
        backgroundColor: 'black',
        opacity: 0.7,
    },
    scanAnimView: {
        width: 1,
        backgroundColor: 'red',
        position: 'absolute',
        top: height / 2 - 100,
        bottom: height / 2 - 100
    },
    captureText: {
        position: 'absolute',
        fontSize: 16,
        textAlign: 'center',
        left: 20,
        right: 20,
        top: 50,
        color: 'white',
        elevation: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 5,
        fontWeight: '600',
        zIndex: 10
    }
})