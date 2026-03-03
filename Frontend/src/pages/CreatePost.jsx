import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const navigate = useNavigate();


    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log("Form submitted");
        const formData = new  FormData(e.target);
        await axios.post('http://localhost:8000/create-post',formData)
       .then((res)=>{
        console.log(res.data);
         navigate('/feed');
       })
       .catch((err)=>{
        console.log(err);
       })
    }
    return (
        <>
            <section className='create-post-section'>
                <h1>Create Post</h1>
                <form onSubmit={handleSubmit}>
                    <input type='file' accept='image/*' name='image'   />
                    <input type='text' name='caption' placeholder='Caption' required />
                    <button type='submit'>Submit</button>
                </form>
            </section></>
    )
}

export default CreatePost