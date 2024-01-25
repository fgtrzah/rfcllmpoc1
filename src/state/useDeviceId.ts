import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import { useEffect, useState } from 'react';


export default function useDeviceId(){

    const [fingerPrintInstance,setFingerPrintInstance]=useState();
    const [deviceId,setDeviceId]=useState();

    useEffect(()=>{
        const fpPromise = FingerprintJS.load({
            token: process.env.REACT_APP_FINGERPRINT_BROWSER_TOKEN
        })
        setFingerPrintInstance(fpPromise)
    },[])

    useEffect(()=>{
        if(fingerPrintInstance){
            getFingerPrintInfo()
        }
    },[fingerPrintInstance])

    const getFingerPrintInfo=()=>{
        fingerPrintInstance
        .then(fp => fp.get())
        .then(result => setDeviceId(result.visitorId))
    }
     return { deviceId }
}
