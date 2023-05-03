import {React,useEffect} from "react";
import {doc, setDoc,collection, getDocs,deleteDoc } from 'firebase/firestore';
import {BiCheckbox,BiEditAlt, BiEraser} from 'react-icons/bi';

import {useState} from 'react';
import { firestore, storage } from '../../../firebase.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { CiStop1 } from "react-icons/ci";

import {MdDelete} from 'react-icons/md';
import { getALlevent, saveevent } from '../../../utils/firebaseFunctions';
import { useStateValue } from '../../../context/StateProvider';
import { actionType } from '../../../context/reducer';

function Event (){
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [day, setDay] = useState("");
    const [hour, setHour] = useState("");
    const [ggmap, setGgmap] = useState("");

    const [event, setEvent] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [{Event}, dispatch] = useStateValue();
    const uploadImage = (e) => {
        setIsLoading(true);

        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `Event/${Date.now()}-${imageFile.name}`);
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
                toast.danger("Image Event uploaded to successfully 😊");
                setTimeout(() => {
                }, 2000);
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
                toast.danger("Image event deleted  successfully 😊");
                setTimeout(() => {
                }, 2000);
            })
            .catch((error) => {
                console.log(error);
                toast.danger("Error while deleting : Try again 🙇");
                setTimeout(() => {
                setIsLoading(false);
                }, 1000);
            });
        };
        
    const saveDetails = () => {
        setIsLoading(true);
        try{
            if((!imageAsset && !name)){
                toast.danger("Reuired fields can't be empty : Try Again 😟😥");
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
            } else {
                const data = {
                    id : `${Date.now()}`,
                    imageURL : imageAsset,
                    name: name,
                    address: address,
                    day:day,
                    hour:hour,
                    ggmap:ggmap,
                }
                saveevent(data);
                setIsLoading(false);

                toast.success("Data upload successfully 😊😊🤑");

                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
                clearData();
                getevents();
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
        setEvent("");
        setImageAsset(null);
    }
    const fetchData = async() => {
        await getALlevent().then ((data) => {
            dispatch({
                type : actionType.SET_EVENT,
                event : data,
            });
        });
    };

    // slide
    const [events, setEvents] = useState([]);
    useEffect(() => {
        try{
            getevents()
        }catch(err){
            console.log("loiii"+err);
        }

    },[])
    useEffect (() =>{
        console.log(events)
    })
    const getevents = () => {
        const eventCollectionRef = collection(firestore, "event")
        getDocs(eventCollectionRef)
            .then(response => {
                console.log(response)
                const events = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }))
                setEvents(events);
            })
            .catch(error => console.log(error.message))
    }
    function deleteEvent(id) {
        const docRef = doc(firestore, 'event', id)
        deleteDoc(docRef).then(() => console.log('Document delete roi'))
            .catch(error => console.log(error.message))
        //alert(id)
        getevents();
    }
    return (
        <div id="event">
            <h2>Event - Sự kiện cưới</h2>
            <div className="event__container">
                <div className="event__top">
                    <table className="table__event">
                        <tr>
                            <th></th>
                            <th>
                                Image
                            </th>
                            <th>
                                Name
                            </th>
                            <th>Address</th>
                            <th>Day</th>
                            <th>Hour</th>
                            <th>GGmap</th>
                            <th>Active</th>
                        </tr>
                        {events.map((events, idx) => {
                        return (
                            <tr className="table__list" key={events.id}>
                                <td className="checkbox  text-align"><CiStop1></CiStop1></td>
                                <td className="text-align">
                                    <img className='table-image w-full h-full object-contain' src={events.data.imageURL} alt={events.data.name}></img>
                                </td>
                                <td className="text-align">{events.data.name}</td>
                                <td className="text-align">{events.data.address}</td>
                                <td className="text-align">{events.data.day}</td>
                                <td className="text-align">{events.data.hour}</td>
                                <td className="text-align">{events.data.ggmap}</td>

                                <td className="text-align">
                                    <div className="table-active">
                                        <button onClick={() => deleteEvent(events.id)}><BiEraser></BiEraser></button>
                                    </div>
                                </td>
                            </tr>)
                        }
                    )}
                    </table>
                </div>
                <div className="event__bottom">
                    <div className="event__left">
                        <div className="event__add__img">
                            <span>Image</span>
                            <div className="event--image">
                                <div className="from-add">
                                    <div className='image__container'>{/*div nay dung de gioi han hinh anh */}
                                        <div className="image__box--small">
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
                                                        <p className="mb-2 text-sm text-gray-500 ">Hình ảnh từ bạn</p>
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
                                    <button  onClick={saveDetails} type="button">
                                        <div class="svg-wrapper-1">
                                            <div class="svg-wrapper">
                                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                                            </svg>
                                            </div>
                                        </div>
                                        <span>Send</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="event__right">
                        <div className="event__add__text">
                            <span>Name</span>
                            <input value={name} onChange={(e) => setName(e.target.value)}  class="input" name="text" placeholder="Name..." type="search"/>
                        </div>
                        <div className="event__add__text">
                            <span>Address</span>
                            <input value={address} onChange={(e) => setAddress(e.target.value)}  class="input" name="text" placeholder="Address..." type="search"/>
                        </div>
                        <div className="event__add__text">
                            <span>Day</span>
                            <input value={day} onChange={(e) => setDay(e.target.value)}  class="input" name="text" placeholder="Day..." type="search"/>
                        </div>
                        <div className="event__add__text">
                            <span>Hour</span>
                            <input value={hour} onChange={(e) => setHour(e.target.value)}  class="input" name="text" placeholder="Hour..." type="search"/>
                        </div>
                        <div className="event__add__text">
                            <span>Link GGmap</span>
                            <input value={ggmap} onChange={(e) => setGgmap(e.target.value)}  class="input" name="text" placeholder="Link GGmap..." type="search"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Event