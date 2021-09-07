
const url = 'http://demo.uverifyid.com'
const endPoint =  new URL('/api/v1/mobilesdk', url)
const validate = new URL('/validate', endPoint)
const scanDrivingLicense = new URL('/scandrivinglicense', endPoint)

export const verifyAppkey = async(appKey) => {
    try {
        let response = await fetch(validate,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    SDKKey: appKey
                })
            })
            if (response.status === 200) {
                const resBody = await response.json()
                return {
                    token: resBody.ClientResponse.access_token,
                    scanType: resBody.ScanTypeID
                }
            } else {
                throw 'App key verification failed'
            }
    } catch (error) {
        throw 'App key verification failed'
    }
}

export const validateLicense = async(token, formData) => {
    try {
        let response = await fetch(scanDrivingLicense,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
            if (response.status === 200) {
                const resBody = await response.json()
                return resBody
            } else {
                // const resBody = await response.json()
                throw 'ID Verification failed'
            }
    } catch (error) {
        throw 'ID Verification failed'
    }
}