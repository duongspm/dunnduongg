import {React,useEffect} from "react";
import {BiCheckbox,BiEditAlt, BiEraser} from 'react-icons/bi';
import { CiStop1 } from "react-icons/ci";

import {doc, setDoc,collection, getDocs,deleteDoc } from 'firebase/firestore';

import {useState} from 'react';
import { firestore, storage } from '../../../firebase.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import {MdDelete} from 'react-icons/md';
import { getALlslide, saveslide } from '../../../utils/firebaseFunctions';
import { useStateValue } from '../../../context/StateProvider';
import { actionType } from '../../../context/reducer';

function Slide (){
    const [name, setName] = useState("");
    const [slide, setslide] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [{Slide}, dispatch] = useStateValue();
    const uploadImage = (e) => {
        setIsLoading(true);

        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `Slide/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
    
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploadProgress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
            console.log(error);
            toast.danger("Error while uploading : Try again 🙇");
            setTimeout(() => {
                setIsLoading(false);
            }, 4000);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageAsset(downloadURL);
                setIsLoading(false);
                // toast.danger("Image uploaded to successfully 😊");
                setTimeout(() => {
                }, 4000);
                });
            }
        );
    };
        const deleteImage = () => {
            setIsLoading(true);
            const deleteRef = ref(storage, imageAsset);
            deleteObject(deleteRef)
                .then(() => {
                setImageAsset(null);
                setIsLoading(false);
                toast.danger("Image deleted  successfully 😊");
                setTimeout(() => {
                }, 4000);
            })
            .catch((error) => {
                console.log(error);
                // toast.danger("Error while deleting : Try again 🙇");
                setTimeout(() => {
                setIsLoading(false);
                }, 1000);
            });
        };
        
    const saveDetails = () => {
        setIsLoading(true);
        try{
            if((!imageAsset)){
                // toast.danger("Reuired fields can't be empty : Try Again 😟😥");
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
            } else {
                const data = {
                    id : `${Date.now()}`,
                    imageURL : imageAsset,
                }
                saveslide(data);
                setIsLoading(false);

                toast.success("Data upload successfully 😊😊🤑");

                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
                clearData();
                getslides();
            }
        } catch (error){
            console.log(error);
            // toast.danger('Error while uploading : Try Again 😟😥');
            setTimeout(() => {
                setIsLoading(false)
            }, 4000);
        }
        fetchData();
    };
    const clearData = () => {
        setName("");
        setslide("");
        setImageAsset(null);
    }
    const fetchData = async() => {
        await getALlslide().then ((data) => {
            dispatch({
                type : actionType.SET_SLIDE,
                slide : data,
            });
        });
    };

    // slide
    const [slides, setSlides] = useState([]);
    useEffect(() => {
        try{
            getslides()
        }catch(err){
            console.log("loiii"+err);
        }

    },[])
    useEffect (() =>{
        console.log(slides)
    })
    const getslides = () => {
        const slideCollectionRef = collection(firestore, "slide")
        getDocs(slideCollectionRef)
            .then(response => {
                console.log(response)
                const slides = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }))
                setSlides(slides);
            })
            .catch(error => console.log(error.message))
    }
    function deleteSlide(id) {
        const docRef = doc(firestore, 'slide', id)
        deleteDoc(docRef).then(() => console.log('Document delete roi'))
            .catch(error => console.log(error.message))
        //alert(id)
        getslides();
    }
    return(
        <>
        <div id="slide">
            <h2 className="slide__heading">
                Slide image
            </h2>
            <div className="table">
                <table>
                    <tr>
                        <th className="checkbox"><CiStop1></CiStop1></th>
                        <th>Image</th>
                        <th>Active</th>
                    </tr>
                    {/* <tr className="table-items">
                        <td className="checkbox  text-align"><CiStop1></CiStop1></td>
                        <td className=" text-align">a</td>
                        <td className="text-align">
                            <div className="table-active">
                                <a href=""><BiEditAlt></BiEditAlt></a>
                                <a href=""><BiEraser></BiEraser></a>
                            </div>
                        </td>
                    </tr>
                    <tr className="table-items">
                        <td className="checkbox  text-align"><CiStop1></CiStop1></td>
                        <td className=" text-align">a</td>
                        <td className="text-align">
                            <div className="table-active">
                                <a href=""><BiEditAlt></BiEditAlt></a>
                                <a href=""><BiEraser></BiEraser></a>
                            </div>
                        </td>
                    </tr> */}
                    
                    {slides.map((slides, idx) => {
                        return (
                            <tr key={slides.id}>
                                <td className="checkbox  text-align"><CiStop1></CiStop1></td>
                                <td className="text-align">
                                    <img className='table-image w-full h-full object-contain' src={slides.data.imageURL} alt={slides.data.name}></img>
                                </td>
                                <td className="text-align">
                                    <div className="table-active">
                                        <a href=""><BiEditAlt></BiEditAlt></a>
                                        <button onClick={() => deleteSlide(slides.id)}><BiEraser></BiEraser></button>
                                    </div>
                                </td>
                            </tr>)
                        }
                    )}
                </table>
            </div>
            <div className="from-add">
                <div className='image__container'>{/*div nay dung de gioi han hinh anh */}
                    <div className="image__box">
                        {isLoading ? (
                        <Loader />
                        ) : (
                        <>
                        {!imageAsset ? (
                            <label for="dropzone-file" className="lable__image">
                                <div className="upload__image">
                                    <div className="icon__clound">
                                        <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    </div>
                                    <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Nhấp để tải lên </span> hoặc kéo và thả </p>
                                    <p className="mb-2 text-sm text-gray-500 ">Hình ảnh Slide từ bạn</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 1200x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" accept="image/*"
                                onChange={uploadImage}/>
                            </label>
                            ) : (
                                <div className="image__upload--success">
                                    <img
                                    src={imageAsset}
                                    alt=""
                                    className="upload__image--success"
                                    />
                                    <button
                                    type="button"
                                    className="image__btn--delete"
                                    onClick={deleteImage}
                                    >
                                        <MdDelete className="text-white" />
                                    </button>
                                </div>
                                )}
                            </>
                            )}
                    </div> 
                </div>
                <button onClick={saveDetails} type="button" class="btn__submit">Submit</button>
            </div>
        </div>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        </>
    )
}
export default Slide