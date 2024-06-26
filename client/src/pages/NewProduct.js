import React, { useState } from 'react'
import './newProduct.css'
import axios from '../axios'
import {Button} from 'react-bootstrap'
import { useCreateProductMutation } from '../services/appApi'
import { useNavigate } from 'react-router-dom'

export default function NewProduct() {
    const [name,setName] = useState('')
    const [description,setDescritpion] = useState('')
    const [price,setPrice] = useState('')
    const [category,setCategeory] = useState('')
    const [images,setImages] = useState([])
    const [imgToRemove,setImgToRemove] = useState(null)
    const navigate = useNavigate()
    const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();
     function openWidget(){
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: process.env.REACT_APP_CLOUD,
                uploadPreset: process.env.REACT_APP_PRESET,
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        createProduct({ name, description, price, category, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }
    const handleRemoveImg = (image) => {
        setImgToRemove(image.public_id);
        axios
            .delete(`/images/${image.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== image.public_id));
            })
            .catch((e) => console.log(e));
    }
  return (
    <div className='new-product'>
        <form onSubmit={handleSubmit} className='new-product-form'>
            <input type="text" name="" id=""  placeholder='Name' onChange={e => setName(e.target.value)}/>
            <input type="text" name="" id=""  placeholder='Description' onChange={e => setDescritpion(e.target.value)}/>
            <input type="text" name="" id=""  placeholder='Price in INR' onChange={e => setPrice(e.target.value)}/>
            <select name="" id="" onChange={e => setCategeory(e.target.value)}>
                <option selected disabled>--Select One--</option>
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="diary">Diary</option>
                <option value="millets">Millets</option>
                <option value="fertilizers">Fertilizers</option>
            </select>
            <Button type="button" onClick={openWidget}>Upload Images</Button>
            <Button type="submit">Create Product</Button>
        </form>
        <div className='img-preview'>
            {images.map(image => {
                return (
                    <div>
                    <img src={image.url} alt="" style={{width: "175px",height: "175px"}} />
                    {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                    </div>
                )
            })}
        </div>
    </div>
  )
}
