import React, { useState } from 'react'
import "../styles/changeimage.scss"
import { gql, useMutation } from '@apollo/client'
import Loading from './Loading'


const CHANGE_IMAGE = gql`

    mutation ChangeImg($input: changeImageInput){
        changeImage(input: $input){
            image
            username
        }
    }

`
    
const ChangeImage = () => {

    const [image, setImage] = useState("")
    const username = window.localStorage.getItem("username")

    const handleChangeImage = async(e)=>{
        e.preventDefault()
        try{
            const result = await handleSubmit({
                variables: {input: {image:image.name, username:username}}
            })
            if(result){
                console.log(result)
            }
        }catch(err){
            console.log("change image:", err)
        }
    }

    const [handleSubmit, {error, loading}] = useMutation(CHANGE_IMAGE)


  return (
    <div className='changeimage'>
        {loading && <Loading/>}
        <form onSubmit={handleChangeImage}>
            <input type="file" onChange={(e)=> setImage(e.target.files[0])} required/>
            <button type='submit'>Change Image</button>
        </form>
        {error && <h4>Something went Wrong</h4>}
    </div>
  )
}

export default ChangeImage