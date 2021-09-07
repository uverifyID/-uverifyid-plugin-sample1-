package com.reactnativeuverifyid;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.text.Text;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.TextRecognizer;
import com.google.mlkit.vision.text.latin.TextRecognizerOptions;

import android.net.Uri;
import java.io.IOException;

@ReactModule(name = UverifyidModule.NAME)
public class UverifyidModule extends ReactContextBaseJavaModule {
    public static final String NAME = "Uverifyid";

    public UverifyidModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }


    // Example method
    // See https://reactnative.dev/docs/native-modules-android
    @ReactMethod
    public void multiply(int a, int b, Promise promise) {
        promise.resolve(a * b);
    }

    public static native int nativeMultiply(int a, int b);

    @ReactMethod
    public void detectText(String imageURL, Callback callback){
        try {
            Uri myUri = Uri.parse(imageURL);
            TextRecognizer recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS);
            recognizer.process(InputImage.fromFilePath(reactContext, myUri))
                    .addOnSuccessListener(new OnSuccessListener<Text>() {
                        @Override
                        public void onSuccess(Text visionText) {
                            String resultText = visionText.getText();
                            callback.invoke(null, resultText);
                        }
                    })
                    .addOnFailureListener(
                            new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception e) {
                                    callback.invoke("MLKit failed to recognize text", null);
                                }
                            });
        }catch (IOException e) {
            callback.invoke("Failed to convert image uri", null);
            e.printStackTrace();
        }
    }
}
