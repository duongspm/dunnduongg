import { async } from "@firebase/util";
import { useState, useEffect } from "react";
import { firestore } from "../firebase.config";

const useStorage = (file) => {
    const [url, setUrl] = useState (null);
   
    useEffect(() => {
        const storageRef = firestore.ref(file.name);

        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        }, (err) => {
            return;
        }, async() => {
            const url = await storageRef.getDowloadURL();
            setUrl(url);
        })
    }, [file]);
    return {url}
}
export default useStorage