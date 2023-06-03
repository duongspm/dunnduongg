import {Route, Routes, Link} from 'react-router-dom';
import '../assets/style.css';
import {Link as Linkk} from 'react-scroll';
import {React,useEffect} from "react";
import {doc, setDoc,collection, getDocs,deleteDoc } from 'firebase/firestore';
import {BiCheckbox,BiEditAlt, BiEraser} from 'react-icons/bi';

import {useState} from 'react';
import { firestore, storage } from '../../../firebase.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../admin/Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { CiStop1 } from "react-icons/ci";
import {MdDelete} from 'react-icons/md';
import { getALlblog, saveblog } from '../../../utils/firebaseFunctions';
import { useStateValue } from '../../../context/StateProvider';
import { actionType } from '../../../context/reducer';

function Blog(){
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [title, setTitle] = useState("");

    const [blog, setblog] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [{Blog}, dispatch] = useStateValue();
    const uploadImage = (e) => {
        setIsLoading(true);

        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `Blog/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
    
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploadProgress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
            console.log(error);
            toast.success("❌❌❌ Error while uploading : Try again 💀💀 🙇");
            setTimeout(() => {
                setIsLoading(false);
            }, 4000);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageAsset(downloadURL);
                setIsLoading(false);
                toast.success("Image Blog uploaded to successfully 😊");
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
                toast.success("Image blog deleted  successfully 😊");
                setTimeout(() => {
                }, 4000);
            })
            .catch((error) => {
                console.log(error);
                toast.success("❌❌❌ Error while deleting : Try again 💀💀 🙇");
                setTimeout(() => {
                setIsLoading(false);
                }, 1000);
            });
        };
        
    const saveDetails = () => {
        setIsLoading(true);
        try{
            if((!imageAsset)){
                toast.success("Reuired fields can't be empty : Try Again 💀💀 😟😥");
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
            } else {
                const data = {
                    id : `${Date.now()}`,
                    name: name,
                    desc: desc,
                    title: title,
                    imageURL : imageAsset,
                }
                saveblog(data);
                setIsLoading(false);

                toast.success("Data blog upload successfully 😊😊🤑");

                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
                clearData();
                getblogs();
            }
        } catch (error){
            console.log(error);
            toast.success('❌❌❌ Error while uploading : Try Again 💀💀 😟😥');
            setTimeout(() => {
                setIsLoading(false)
            }, 4000);
        }
        fetchData();
    };
    const clearData = () => {
        setName("");
        setDesc("");
        setTitle("");
        setblog("");
        setImageAsset(null);
    }
    const fetchData = async() => {
        await getALlblog().then ((data) => {
            dispatch({
                type : actionType.SET_BLOG,
                blog : data,
            });
        });
    };

    // blog
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        try{
            getblogs()
        }catch(err){
            console.log("loiii"+err);
        }

    },[])
    useEffect (() =>{
        console.log(blogs)
    })
    const getblogs = () => {
        const blogCollectionRef = collection(firestore, "blog")
        getDocs(blogCollectionRef)
            .then(response => {
                console.log(response)
                const blogs = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }))
                setBlogs(blogs);
            })
            .catch(error => console.log(error.message))
    }
    function deleteBlog(id) {
        const docRef = doc(firestore, 'Blog', id)
        deleteDoc(docRef).then(() => console.log('Document delete roi'))
            .catch(error => console.log(error.message))
        // alert(id)
        getblogs();
    }

    return (
        <div className="blog__box">
            <div className="blog__list">
            {blogs.map((blogs, idx) => {
                return (
                    <div key={blogs.id} className="blog__items">
                        <div className="blog__img">
                            <img src={blogs.data.imageURL} alt={blogs.data.name} />
                        </div>
                        <div className="blog__content">
                            <div className="blog__name">
                                <p>{blogs.data.name}</p>
                            </div>
                            <div className="blog__title">
                                <p>{blogs.data.title}</p>
                            </div>
                            <div className="blog__desc">
                                <p>{blogs.data.desc}</p>
                            </div>
                        </div>
                    </div>
                )}
            )}
            </div>

            <div className="blog__heading">
                <p>Add Blog</p>
            </div>
            <div id='blog-add' className="blog__add">
                <div className="blog__add__left">
                    <div class="input-group">
                        <label class="label">Name Blog *</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} autocomplete="off" name="name" id="name" class="input" type="text" />
                    </div>
                    
                    <div class="input-group">
                        <label class="label">Title Blog</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} autocomplete="off" name="title" id="title" class="input" type="text" />
                    </div>

                    <div class="input-group">
                        <label class="label">Description Blog *</label>
                        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} autocomplete="off" name="desc" id="desc" class="input" type="text" />
                    </div>
                </div>
                <div className="blog__add__img">
                    <div className="from-add">
                        <div className='image__container'>{/*div nay dung de gioi han hinh anh */}
                            <div className="image__box--small">
                                {isLoading ? (
                                <Loader />
                                ) : (
                                <>
                                {!imageAsset ? (
                                    <label for="dropzone-file-blog" className="lable__image">
                                        <div className="upload__image">
                                            <div className="icon__clound">
                                                <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                            </div>
                                            <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Nhấp để tải lên </span> hoặc kéo và thả </p>
                                            <p className="mb-2 text-sm text-gray-500 ">Hình ảnh từ bạn</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 1200x400px)</p>
                                        </div>
                                        <input id="dropzone-file-blog" type="file" className="hidden" accept="image/*"
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
            <ToastContainer />
        </div>
    )
}
export default Blog