export const parseRawPdf417 = (rawString) => {
    let dataToMap = {
        'DAI': "addressCity", 'DAJ': "addressState",
        'DAG': "addressStreet", 'DAK': "addressZip",
        'DBB': "birthDate", 'DCF': "documentType",
        'DBA': "expiryDate", 'DCT': "firstName",
        'DBC': "gender", 'DCG': "issuingCountry",
        'DBD': "issuingDate", 'DCS': "lastName",
        'DAQ': "licenseNumber", 'DAD': "middleName",
        'DAC': "firstName"
    }

    let dict = {}

    let separatedArray = rawString.split('\n')
    for (let item of separatedArray) {
        if (item.length > 3) {
            const hasType = dataToMap[`${item.slice(0, 3)}`]
            if (hasType) {
                dict[`${hasType}`] = item.slice(3).trim()
            }
        }
    }
    return dict
}

export const jsonToFormData = (json) => {
    var form_data = new FormData();

    for (let key in json) {
        form_data.append(key, json[key])
    }

    return form_data;
}