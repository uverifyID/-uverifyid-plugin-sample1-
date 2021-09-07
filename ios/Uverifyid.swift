import Foundation
import UIKit
import Vision

@objc(Uverifyid)
class Uverifyid: NSObject {

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }
    
    @objc static func requiresMainQueueSetup() -> Bool {
      return false
    }
    
    @objc
    func detectText(_ imageURL: String, callback: @escaping RCTResponseSenderBlock) {
      
      if #available(iOS 13.0, *) {
        
        guard let url = URL(string: imageURL) else { return }
        let requestHandler = VNImageRequestHandler(url: url, options: [:])
        
        let request = VNRecognizeTextRequest  { (request, error) in
          if let error = error {
            callback(["MLKit failed to recognize text", NSNull()])
            print(error)
            return
          }
          
          guard let observations = request.results as? [VNRecognizedTextObservation] else {
            callback(["MLKit failed to recognize text", NSNull()])
            return
          }
          
          var callbackInvoked = false
          var fullText = ""
          for currentObservation in observations {
            let topCandidate = currentObservation.topCandidates(1)
            if let recognizedText = topCandidate.first {
              callbackInvoked = true
              fullText = fullText + "\n" + recognizedText.string
            }
          }
          
          if (callbackInvoked == false) {
            callback(["Not a driver license", NSNull()])
          } else {
            //          print(fullText)
            callback([NSNull(), fullText])
          }
        }
        request.recognitionLevel = .accurate
        
        try? requestHandler.perform([request])
      } else {
        // Fallback on earlier versions
        callback(["MLKit failed to recognize text - OS version is less than 13.0", NSNull()])
      }
    }
}
