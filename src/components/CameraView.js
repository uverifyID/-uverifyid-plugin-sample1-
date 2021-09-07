import React, { useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';
import CaptureView from './CaptureView';
import Cutouts from './Cutouts';
import { parseRawPdf417 } from '../utils/parser';

export default CameraView = (props) => {

    const camera = useRef()
    const [flash, setFlash] = useState('off')
    const [previewImage, setPreviewImage] = useState(null)
    const processingCode = useRef(false)
    const cameraProcessing = useRef(false)

    const capture = async () => {
        if (camera && camera.current && !cameraProcessing.current) {
            cameraProcessing.current = true
            const options = {
                quality: 1,
                fixOrientation: true,
                orientation: RNCamera.Constants.Orientation.auto
            };
            const data = await camera.current.takePictureAsync(options);
            cameraProcessing.current = false
            setPreviewImage(data.uri)
            if (props.step === 2) {
                props.onNextStep(data.uri)
            } else {
                props.onNextStep()
            }
        }
    }

    const useSelfie = (retry = false) => {
        if (retry === true) {
            props.onNextStep()
        } else {
            props.onNextStep(previewImage)
        }
        setPreviewImage(null)
    }

    const showCamera = () => {
        return (
            props.step === 1
            || props.step === 2
            || props.step === 3
        )
    }

    const _handleBarcode = (code) => {
        if (processingCode.current === true || props.step !== 3) {
            return
        }
        processingCode.current = true
        if (code.data) {
            const licenseBackInfo = parseRawPdf417(code.data)
            props.onNextStep(licenseBackInfo)
        }
        processingCode.current = false
    }

    return (
        <View style={styles.itemContainer}>
            <View style={styles.topContainer}>
                {props.step !== 1.5 && props.step !== 2.5 &&
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => flash === 'off' ? setFlash('torch') : setFlash('off')}>
                        <Image
                            source={
                                flash === 'on'
                                    ? require('../img/flash-on.png')
                                    : require('../img/flash-off.png')
                            }
                            style={styles.closeImage}
                        />
                    </TouchableOpacity>
                }
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={props.onClose}>
                    <Image
                        source={require('../img/close.png')}
                        style={styles.closeImage}
                    />
                </TouchableOpacity>
            </View>
            {showCamera() &&
                <>
                    <RNCamera
                        // ["640x480", "Photo", "High", "3840x2160", "352x288", "1280x720", "Medium", "Low", "None", "1920x1080"]
                        // pictureSize={"Medium"}
                        ref={ref => {
                            camera.current = ref;
                        }}
                        type={props.step === 1 ? 'front' : 'back'}
                        captureAudio={false}
                        flashMode={flash}
                        style={{ flex: 1 }}
                        barCodeTypes={[RNCamera.Constants.BarCodeType.pdf417]}
                        onBarCodeRead={(code) => _handleBarcode(code)}
                    />
                    <Cutouts textRecognitionError={props.textRecognitionError} type={props.step} />
                </>
            }
            {showCamera() === false &&
                <Image
                    source={{ uri: previewImage }}
                    style={styles.imagePreview}
                    resizeMode='contain'
                />
            }
            {(props.step !== 2.5 && props.step !== 3) &&
                <CaptureView
                    step={props.step}
                    onRetry={() => useSelfie(true)}
                    onUse={useSelfie}
                    onCapture={capture}
                />
            }
        </View>
    )
}

CameraView.propTypes = {
    onClose: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    onNextStep: PropTypes.func.isRequired,
    textRecognitionError: PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        backgroundColor: 'black',
        borderTopLeftRadius: 20,
        borderTopEndRadius: 20
    },
    closeImage: {
        height: 25,
        width: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        padding: 15
    },
    topContainer: {
        position: 'absolute',
        right: 15,
        top: 15,
        left: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10
    },
    imagePreview: {
        flex: 1,
        backgroundColor: 'black'
    }
})