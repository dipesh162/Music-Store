'use client'
import axios from "axios";
import { useState } from "react";
import  toLowercase  from '../helpers/front-end/toLowercase'

export type FormDataType = {
    name: string;
    brand: string;
    category: string;
    subCategory: string;
    description: string;
    price: number;
    ratings: number;
    images: string[]  
}

export default function AddProduct(){
    const [previewImageSources,setPreviewImageSources] = useState([])

    let initialFormValues:FormDataType = {
        name: '',
        brand: '',
        category: '',
        subCategory: '',
        description: '',
        price: 0,
        ratings: 0,
        images: []
    }
    const [formData, setFormData] = useState<FormDataType>(initialFormValues)

    // Convert Image into base64 String to show preview of an image
    const convertImgToBase64 = async (e:any) =>{
        // Convert the FileList into an array and iterate
        let files = Array.from(e.target.files).map((file: any) => {

            // Define a new file reader
            let reader = new FileReader();

            // Create a new promise
            return new Promise(resolve => {
                reader.readAsDataURL(file)
                // Resolve the promise after reading file
                reader.onload = () => resolve(reader.result);

            });

        });

        // At this point you'll have an array of results
        let res:any = await Promise.all(files);
        console.log(res)
        setPreviewImageSources(res)
        setFormData({
            ...formData,
            images: res
        })
    }

    const handleFileEvent = async (e: any) =>{
        convertImgToBase64(e)
    }


    const handleImageUpload = async () =>{

        return new Promise(async (resolve, reject)=>{
            const uploadFormData = new FormData();
            let uploadedImgSources: string[] = []

            let imgs = formData.images
            for(let image of imgs){
                uploadFormData.append('file', image);
                uploadFormData.append('upload_preset','wp4anihr'); 

                try {
                    const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
                    uploadFormData
                    );
                    uploadedImgSources = [...uploadedImgSources, response.data.secure_url]
                } catch (error) {
                    alert('Error Saving Images on cloudinary')
                    reject('Error Saving Images on cloudinary')
                    console.error(error);
                }
            }
            resolve(uploadedImgSources)
        })
    }
    
    const handleSumbit = async (e: any) =>{
        e.preventDefault()
        console.log(formData)

        const imageUploadResponse = await handleImageUpload()
        if(imageUploadResponse){
            try {
                const res = await axios.post("/api/product/add", {
                    ...formData,
                    brand: toLowercase(formData.brand),
                    category: toLowercase(formData.category).replaceAll(' ','-'),
                    subCategory: (toLowercase(formData.subCategory)).replaceAll(' ','-'),
                    images: imageUploadResponse
                });
                if(res.data.success){
                    console.log(res)
                    alert('Product added successfully')
                    setFormData(initialFormValues)
                }
            } catch (error) {
                alert('Error Saving Details of product')
                console.log(error)
            }
        }
    }

    return(
        <>
            <form className="flex flex-col items-center" onSubmit={handleSumbit}>
                <div className="flex justify-center gap-2">
                    <label className="text-black flex-1" htmlFor="name">Name:</label>
                    <input 
                        className="border-[#000000] flex-2 border-[1px]" 
                        type="text" 
                        name='name'
                        onChange={(e)=>{
                            setFormData({...formData,name: e.target.value})
                        }}
                        value={formData.name}
                    />
                </div>
                <div className="flex justify-center gap-2">
                    <label className="text-black flex-1" htmlFor="brand">Brand:</label>
                    <input 
                        className="border-[#000000] flex-2 border-[1px]" 
                        type="text" 
                        name='brand'
                        onChange={(e)=>{
                            setFormData({...formData,brand: e.target.value})
                        }}
                        value={formData.brand}
                    />
                </div>
                <div className="flex justify-center gap-2">
                    <label className="text-black flex-1" htmlFor="category">Category:</label>
                    <input 
                        className="border-[#000000] flex-2 border-[1px]" 
                        type="text" 
                        name='category'
                        onChange={(e)=>{
                            setFormData({...formData,category: e.target.value})
                        }}
                        value={formData.category}
                    />
                </div>
                <div className="flex justify-center gap-2">
                    <label className="text-black flex-1" htmlFor="subCategory">SubCategory:</label>
                    <input 
                        className="border-[#000000] flex-2 border-[1px]" 
                        type="text" 
                        name='subCategory'
                        onChange={(e)=>{
                            setFormData({...formData,subCategory: e.target.value})
                        }}
                        value={formData.subCategory}
                    />
                </div>
                <div className="flex justify-center gap-2">
                    <label className="text-black flex-1" htmlFor="description">Description:</label>
                    <input 
                        className="border-[#000000] flex-2 border-[1px]" 
                        type="text" 
                        name='description'
                        onChange={(e)=>{
                            setFormData({...formData,description: e.target.value})
                        }}
                        value={formData.description}
                    />
                </div>
                <div className="flex justify-center gap-2">
                    <label className="text-black flex-1" htmlFor="price">Price:</label>
                    <input 
                        className="border-[#000000] flex-2 border-[1px]" 
                        type="number" 
                        name='price'
                        onChange={(e)=>{
                            setFormData({...formData, price: Number(e.target.value)})
                        }}
                        value={formData.price || ''} 
                    />
                </div>
                <div className="flex justify-center gap-2">
                    <label className="text-black flex-1" htmlFor="ratings">Ratings:</label>
                    <input 
                        className="border-[#000000] flex-2 border-[1px]" 
                        type="number" 
                        name='ratings'
                        onChange={(e)=>{
                            setFormData({...formData,ratings: Number(e.target.value)})
                        }}
                        value={formData.ratings || ''}
                    />
                </div>
                <div className="flex justify-center gap-2">
                    <label className="text-black flex-1" htmlFor="Files">Files:</label>
                    <input 
                        className="border-[#000000] flex-2 border-[1px]" 
                        type="file" 
                        multiple
                        accept="image/*"
                        name='Files'
                        onChange={handleFileEvent}
                    />
                </div>
                <button className="mt-2 bg-[red] py-2 px-3 rounded-md text-white">Submit</button>

                {/* {imgP.length && 
                    imgP.map((img)=>(
                        <img src={img}></img>
                    ))
                } */}
            </form>
        </>
    )
}