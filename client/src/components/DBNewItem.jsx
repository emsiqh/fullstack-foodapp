import React, { useState } from 'react';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { categories } from '../utils/fakeData';
import { Spinner } from '../components';
import { FaCloudUploadAlt, MdDelete } from '../assets/icons';
import { storage } from '../config/firebase.config';
import { alertDanger, alertNull, alertSuccess } from '../context/actions/alertActions';
import { buttonClick } from '../animations';
import { addNewProduct, getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';

const DBNewItem = () => {
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(null);
    const [imageDownloadURL, setImageDownloadURL] = useState(null);

    const alert = useSelector((state) => state.alert);
    const dispatch = useDispatch();

    const uploadImage = async (e) => {
        try {
            setIsLoading(true);
            const imageFile = e.target.files[0];
            const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);
            uploadTask.on('state_changed', (snapshot) => {
                setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            });
            await uploadTask;
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setImageDownloadURL(downloadURL);
            setIsLoading(false);
            setProgress(null);
            dispatch(alertSuccess('Image uploaded successfully'));
        } catch (error) {
            dispatch(alertDanger(`Error uploading image: ${error}`));
        } finally {
            setTimeout(() => {
                dispatch(alertNull());
            }, 3000);
        }
    };

    const deleteImage = async () => {
        setIsLoading(true);
        const deleteRef = ref(storage, imageDownloadURL);
        try {
            await deleteObject(deleteRef);
            setImageDownloadURL(null);
            setIsLoading(false);
            dispatch(alertSuccess('Delete image successfully'));
        } catch (error) {
            dispatch(alertDanger(`Error deleting image: ${error}`));
        } finally {
            setTimeout(() => {
                dispatch(alertNull());
            }, 3000);
        }
    };

    const submitNewData = async () => {
        const data = {
            product_name: itemName,
            product_category: category,
            product_price: price,
            imageURL: imageDownloadURL,
        };
        await addNewProduct(data);
        dispatch(alertSuccess('New item added successfully'));
        setImageDownloadURL(null);
        setItemName('');
        console.log(itemName);
        setPrice('');
        setCategory(null);
        setTimeout(() => {
            dispatch(alertNull());
        }, 3000);
        getAllProducts().then((data) => {
            dispatch(setAllProducts(data));
        });
    };

    return (
        <div className='flex items-center justify-center pt-6 w-full flex-col px-24'>
            <div className='border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4'>
                <InputValueField
                    type='text'
                    placeHolder='Item name here'
                    stateFunc={setItemName}
                    value={itemName}
                />

                <div className='flex flex-wrap items-center justify-around gap-3'>
                    {
                        categories && categories.map((data) => (
                            <p
                                key={data.id}
                                onClick={() => setCategory(data.category)}
                                className={`px-4 py-3 rounded-md text-lg text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${category === data.category ? 'bg-red-400 text-primary' : 'bg-transparent'}`}
                            >
                                {data.title.replace(/^\w/, c => c.toUpperCase())}
                            </p>
                        ))
                    }
                </div>

                {/* Price */}
                <InputValueField
                    type='number'
                    placeHolder='Item price here'
                    stateFunc={setPrice}
                    value={price}
                />

                {/* Image upload */}
                <div className='w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
                    {
                        isLoading ?
                            <div className='w-full h-full flex flex-col items-center justify-evenly px-24'>
                                <Spinner />
                            </div> : (
                                <>
                                    {!imageDownloadURL ? (
                                        <>
                                            <label>
                                                <div className='flex flex-col items-center justify-center h-full w-full cursor-pointer'>
                                                    <div className='flex flex-col items-center justify-center cursor-pointer'>
                                                        <p className='font-bold text-4xl'>
                                                            <FaCloudUploadAlt className='-rotate-0' />
                                                        </p>
                                                        <p className='text-lg text-textColor'>
                                                            Click to upload an image
                                                        </p>
                                                    </div>
                                                </div>
                                                <input
                                                    type='file'
                                                    name='upload-image'
                                                    accept='image/*'
                                                    onChange={uploadImage}
                                                    className='w-0 h-0'
                                                />
                                            </label>
                                        </>
                                    ) : (
                                        <>
                                            <div className="relative h-full overflow-hidden rounded-md">
                                                <motion.img
                                                    whileHover={{ scale: 1.15 }}
                                                    src={imageDownloadURL}
                                                    alt="uploaded image"
                                                    className="w-full h-full object-cover"
                                                />
                                                <motion.button
                                                    {...buttonClick}
                                                    type="button"
                                                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                                                    onClick={deleteImage}
                                                >
                                                    <MdDelete className="-rotate-0" />
                                                </motion.button>
                                            </div>
                                        </>
                                    )}
                                </>
                            )
                    }
                </div>

                {/* button */}
                <motion.button
                    onClick={submitNewData}
                    {...buttonClick}
                    className='w-9/12 py-2 rounded-md bg-red-400 text-primary hover:bg-red-500 cursor-pointer'
                >
                    Save
                </motion.button>
            </div>
        </div>
    )
};

export const InputValueField = ({ type, placeHolder, stateValue, stateFunc, }) => {
    return (
        <>
            <input
                type={type}
                placeholder={placeHolder}
                value={stateValue}
                onChange={(e) => stateFunc(e.target.value)}
                className='w-full px-4 py-3 bg-cardOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-200'
            />
        </>
    )
};

export default DBNewItem;