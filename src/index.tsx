import { NativeModules } from 'react-native';

type UverifyidType = {
  multiply(a: number, b: number): Promise<number>;
};

const { Uverifyid } = NativeModules;

export default Uverifyid as UverifyidType;
