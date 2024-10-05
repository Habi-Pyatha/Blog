import React, { useState } from 'react'
import {MDBValidation,MDBInput,MDBBtn} from "mdb-react-ui-kit"
import axios from "axios"
import { toast } from 'react-toastify'
// import '../components/style/addEditBlog.css'
import { useNavigate } from 'react-router-dom'

// process.env.REACT_APP_UPLOAD_PRESET
const initialState={
    title:"",
    description:"",
    category:"",
    imageUrl:""
}
const options=["Travel","Fashain","Fitness","Sports","Food","Tech"]



const AddEditBlog = () => {
    const[formValue,setFormValue]=useState(initialState);
    const[categoryErrMsg,setCategoryErrMsg]=useState(null);
    const{title,description,category,imageUrl}=formValue;
    const navigate=useNavigate();
    const getDate=()=>{
        let today=new Date();
        let dd=String(today.getDate()).padStart(2,"0")
        let mm=String(today.getMonth()+1).padStart(2,"0")
        let yyyy=today.getFullYear();

        today=mm+'/'+dd+"/"+yyyy;
        return today;
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!category){
            setCategoryErrMsg("Please select a category");
        }
        if(title && description && imageUrl &&category){
            const currentDate=getDate();
            const updatedBlogData={...formValue,date:currentDate};
            const response=await axios.post("http://localhost:5000/blogs",updatedBlogData)
            if(response.status==201){
                toast.success("Blog Created Successfully")
                
            }
            else{
                toast.error("Something went wrong")
            }
            setFormValue({title:"",description:"",category:"",imageUrl:""});
            navigate("/");
        }
    }
    const onInputChange=(e)=>{
        let {name,value}=e.target;
        setFormValue({...formValue,[name]:value} )
    }
    const onUploadImage=(file)=>{
        // console.log("file",file);
        const formData=new FormData();
        formData.append("file",file);
        formData.append("upload_preset",process.env.REACT_APP_UPLOAD_PRESET);
        // console.log(process.env.REACT_APP_CLOUD_NAME);
        
        // axios.post(`http://api.cloudnary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,formData)
        axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, formData)

        .then((response)=>{
            toast.info("Image Uploaded Sucessfully")
            setFormValue({...formValue,imageUrl:response.data.url})
            
        })
        .catch((err)=>{
            toast.error("Something went wrong")
        })
        
        
    }
    const onCategoryChange=(e)=>{
        setCategoryErrMsg(null);
        setFormValue({...formValue,category:e.target.value} )
    }

  return (
    <>
        <MDBValidation className='row g-3' style={{marginTop:"100px"}} noValidate onSubmit={handleSubmit}>
                <p className='fs-2 fw-bold'>Add Blog</p>
                <div className='form-one'
                    style={{
                        margin: "auto",
                        padding: "15px",
                        maxWidth: "400px",
                        alignContent: "center",
                    }}
                >
                    <MDBInput value={title || ""} name="title" type="text" onChange={onInputChange} required label="Title" validation="please provide a title"/><br />
                    {/* <MDBInput value={description ||""} name="description" type='textarea' onChange={onInputChange} required label="description"  rows={4} validation="please provide a description"/><br /> */}
                    <MDBInput 
    value={description || ""} 
    name="description" 
    type="textarea" // Change type to 'textarea'
    onChange={onInputChange} 
    required 
    label="Description" 
    rows={4} // Specify number of rows
    validation="Please provide a description"
/>
<br />

                    <MDBInput   type="file" onChange={(e)=>onUploadImage(e.target.files[0])} required  /><br />
                    <select className="categoryDropDown" onChange={onCategoryChange} value={category}>
                        <option value="">Please Select Category</option>
                        {options.map((option,index)=>(
                            <option value={option||""} key={index}>{option}</option>
                        ))}
                    </select>
                    {categoryErrMsg && (
                        <div className="categoryErrorMsg ">{categoryErrMsg}</div>
                    )}
                <br/>
                <br/>
                <MDBBtn type='submit'style={{marginRight:"20px"}}>Add</MDBBtn>
                <MDBBtn color="danger" style={{marginRight:"10px"}} onClick={()=>navigate("/")}>Go Back</MDBBtn>
                </div>

        </MDBValidation>
    </>
  )
}

export default AddEditBlog
