# react-native-uverifyid

react native plugin for UverifyID SDK

## Installation

```sh
yarn add react-native-uverifyid
```
> **pod install** is required for ios

#### Dependency Installation
This plugin depends on **react-native-camera**. Please follow installation steps for **react-native-camera** if you haven't already - https://react-native-camera.github.io/react-native-camera/docs/installation

## Usage

```js
import Uverifyid from "react-native-uverifyid";

// state to show/hide uverifyID
const [showUverify, setShowUverify] = useState(false)

// component use
<Uverifyid
    onDismiss={() => setShowUverify(false)}
    visible={showUverify}
    appKey="<Your app secret key from developer console>"
    onVerifyComplete={(id) => {
        //Save this ID to your backend.
        //This is used for fetching verification result
        console.log(id)
    }}
    onVerifyFailure={(message) => console.log(message)}
/>
```

## Props
| Props | Type | Usage
|---|---|---
| visible | boolean | Show/hide component
| onDismiss | function | Should to used to hide component of perform other actions
| appKey | string | App secret key provided by uverifyID in developer console
| onVerifyComplete | function | Returns verification ID after successful verification. Can be used to store in backend to fetch verification result later.
| onVerifyFailure | function | Shoulbe be used to alert user that something went wrong

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
