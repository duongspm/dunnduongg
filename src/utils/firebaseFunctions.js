import {collection, doc, getDocs, orderBy, query, setDoc} from "firebase/firestore";
import { firestore } from "../firebase.config";

//saving new item
export const saveItem = async(data) => {
    await setDoc(doc(firestore,"drinkItems", `${Date.now()}`), data,{
        merge: true,
    });
};

//get all
export const getALlDrinkItems = async () => {
    const items = await getDocs (
        query(collection(firestore, "drinkItems"), orderBy("id","desc"))
    );
    return items.docs.map((doc) => doc.data());
};

//saving email
export const saveEmail = async(data) => {
    await setDoc(doc(firestore,"Email", `${Date.now()}`), data,{
        merge: true,
    });
};



//saving feedback
export const saveFeedback = async(data) => {
    await setDoc(doc(firestore,"feedback", `${Date.now()}`), data,{
        merge: true,
    });
};

//get all feedback
export const getALlFeedBack = async () => {
    const items = await getDocs (
        query(collection(firestore, "feedback"), orderBy("id","desc"))
    );
    return items.docs.map((doc) => doc.data());
};


//saving slide
export const saveslide = async(data) => {
    await setDoc(doc(firestore,"slide", `${Date.now()}`), data,{
        merge: true,
    });
};

//get all slide
export const getALlslide = async () => {
    const items = await getDocs (
        query(collection(firestore, "slide"), orderBy("id","desc"))
    );
    return items.docs.map((doc) => doc.data());
};
//-----------------------------------------//
//saving event
export const saveevent = async(data) => {
    await setDoc(doc(firestore,"event", `${Date.now()}`), data,{
        merge: true,
    });
};

//get all event
export const getALlevent = async () => {
    const items = await getDocs (
        query(collection(firestore, "event"), orderBy("id","desc"))
    );
    return items.docs.map((doc) => doc.data());
};
//-----------------------------------------//

//saving album
export const savealbum = async(data) => {
    await setDoc(doc(firestore,"album", `${Date.now()}`), data,{
        merge: true,
    });
};

//get all album
export const getALlalbum = async () => {
    const items = await getDocs (
        query(collection(firestore, "album"), orderBy("id","desc"))
    );
    return items.docs.map((doc) => doc.data());
};
//-----------------------------------------//
//saving man
export const saveman = async(data) => {
    await setDoc(doc(firestore,"man", `${Date.now()}`), data,{
        merge: true,
    });
};

//get all man
export const getALlman = async () => {
    const items = await getDocs (
        query(collection(firestore, "man"), orderBy("id","desc"))
    );
    return items.docs.map((doc) => doc.data());
};
//-----------------------------------------//
//saving woman
export const savewoman = async(data) => {
    await setDoc(doc(firestore,"woman", `${Date.now()}`), data,{
        merge: true,
    });
};

//get all woman
export const getALlwoman = async () => {
    const items = await getDocs (
        query(collection(firestore, "woman"), orderBy("id","desc"))
    );
    return items.docs.map((doc) => doc.data());
};
//-----------------------------------------//

//-----------------------------------------//
//saving blog
export const saveblog = async(data) => {
    await setDoc(doc(firestore,"blog", `${Date.now()}`), data,{
        merge: true,
    });
};

//get all blog
export const getALlblog = async () => {
    const items = await getDocs (
        query(collection(firestore, "blog"), orderBy("id","desc"))
    );
    return items.docs.map((doc) => doc.data());
};
//-----------------------------------------//