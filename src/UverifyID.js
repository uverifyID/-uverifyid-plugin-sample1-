import React, { useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Platform,
    ActivityIndicator,
    NativeModules
} from 'react-native';
import PropTypes from 'prop-types';
import CameraView from './components/CameraView';
import Start from './components/Start';
import ScanningMessage from './components/ScanningMessage';
import { jsonToFormData } from './utils/parser';
import { validateLicense } from './utils/network';

export default UverifyID = (props) => {

    /*
        Step:
            0 = start
            1 = selfie
            1.5 = selfie preview
            2 = driving front
            2.5 = driving front preview/validating
            3 = driving back
            4 = verifying
    */
    const [step, setStep] = useState(0)
    const selfieImg = useRef()
    const frontInfo = useRef()
    const frontImage = useRef()
    const barcodeInfo = useRef()
    const [showSpinner, setShowSpinner] = useState(false)
    const scanOption = useRef(4) // scan all by default
    const token = useRef()
    const [frontTextRecogError, setFrontTextRecogError] = useState(false)

    //reset component state
    const reset = () => {
        setStep(0)
        selfieImg.current = null
        frontImage.current = null
        frontInfo.current = null
        barcodeInfo.current = null
        setFrontTextRecogError(false)
    }

    const handleStep = (val) => {
        switch (step) {
            case 1:
                setStep(1.5)
                break
            case 1.5:
                if (val) {
                    setStep(2)
                    selfieImg.current = val
                } else {
                    setStep(1)
                }
                break
            case 2:
                setStep(2.5)
                getLicenseInfo(val)
                break
            case 3:
                setStep(4)
                barcodeInfo.current = val
                verifyDocument()
                break
        }
    }

    const getLicenseInfo = (uri) => {
        setShowSpinner(true)
        NativeModules.Uverifyid.detectText(uri, (err, res) => {
            if (err || res === '') {
                setFrontTextRecogError(true)
                //set this message 'Failed to recognize license info! Ensure that front of your Driver License is in the Frame and take a picture'
                setStep(2)
            } else {
                setFrontTextRecogError(false)
                frontInfo.current = res
                frontImage.current = uri
                setStep(3)
            }
            setShowSpinner(false)
        })
    }

    //check api returned step
    const stepSelection = () => {
        switch (scanOption.current) {
            case 1:
                setStep(3)
                break
            case 2:
                setStep(2)
                break
            case 3:
                setStep(1)
                break
            default:
                setStep(1)
                break
        }
    } 

    const verifyDocument = async () => {
        const formData = jsonToFormData(barcodeInfo.current)
        formData.append('frontDrivingLicenseData', frontInfo.current)
        if (scanOption.current !== 1) {
            //add driving front
            formData.append('front', {
                uri: frontImage.current,
                name: 'license.jpg',
                type: 'image/jpg'
            })
        }

        if (scanOption.current === 3 || scanOption.current === 4){
            //add selfie too
            formData.append('face', {
                uri: selfieImg.current,
                name: 'selfie.jpg',
                type: 'image/jpg'
            })
        }
        
        try {
            const res = await validateLicense(token.current, formData)
            props.onVerifyComplete(res)
            props.onDismiss()
            reset()
        } catch (error) {
            props.onVerifyFailure(error)
            props.onDismiss()
            reset()
        }
        
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={props.visible}
        >
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    {step === 0 &&
                        <Start
                            onClose={props.onDismiss}
                            appKey={props.appKey}
                            appKeyVerified={(res) => {
                                scanOption.current = res.scanType
                                token.current = res.token
                                stepSelection()
                            }}
                            appKeyVerifyFailed={(err)=>{
                                props.onVerifyFailure(err)
                                props.onDismiss()
                            }}
                        />
                    }
                    {(step !== 0 && step !== 4) &&
                        <CameraView
                            textRecognitionError = {frontTextRecogError}
                            onClose={() => {
                                props.onDismiss()
                                reset()
                            }}
                            step={step}
                            onNextStep={(val) => handleStep(val)}
                        />
                    }
                    {step === 4 &&
                        <ScanningMessage
                            onClose={() => {
                                props.onDismiss()
                                reset()
                            }}
                        />
                    }
                    {showSpinner &&
                        <ActivityIndicator
                            style={styles.spinner}
                            size="large"
                            color="#65C47C" />
                    }
                </View>
            </View>
        </Modal>
    )
}

UverifyID.propTypes = {
    onDismiss: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    appKey: PropTypes.string.isRequired,
    onVerifyComplete: PropTypes.func.isRequired,
    onVerifyFailure: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    itemContainer: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 50 : 40,
        borderTopLeftRadius: 20,
        borderTopEndRadius: 20,
        overflow: 'hidden'
    },
    spinner: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }
})