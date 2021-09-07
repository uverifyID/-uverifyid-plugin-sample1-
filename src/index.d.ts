declare module "react-native-uverifyid" {
    import type { ComponentType } from "react";

    export type UverifyidProps = {
        onDismiss: () => void,
        visible: boolean,
        appKey: string,
        onVerifyComplete: (successId: string) => void,
        onVerifyFailure: (message: string) => void
    };

    const Uverifyid: ComponentType<UverifyidProps>;
    export default Uverifyid;
}