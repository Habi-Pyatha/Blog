import React from 'react'
import { MDBIcon,MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardText,MDBCardTitle,MDBCardBody,MDBCardImage,MDBTypography } from 'mdb-react-ui-kit'
import { useParams,Link} from 'react-router-dom'
import axios from 'axios'
import Badge from '../components/Badge'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'

const Blog = () => {
  const [blog,setBlog]=useState();
  const [relatedPost,setRelatedPost]=useState([])
  const {id}=useParams();
  useEffect(()=>{
    if(id){
      getSingleBlog();
    }
  },[id]);
const getSingleBlog=async()=>{
  const response=await axios.get(`http://localhost:5000/blogs/${id}`);
  const relatedPostData=await axios.get(`http://localhost:5000/blogs/?category=${response.data.category}&_start=0&_end=3`);

  if(response.status===200 || relatedPostData.status===200){
    setBlog(response.data)
    setRelatedPost(relatedPostData.data)
  }else{
    toast.error("Something went wrong")
  }
};

const styleInfo={
  display:"inline",
  marginLeft:"5px",
  float:"right",
  marginTop:"7px"

}
const excerpt =(str)=>{
  if(str.length>50){
      str=str.substring(0,50 )+"..."
  }
  return str
}

  return (
    <>
    <MDBContainer style={{border:"1px solid #d1ebe8"}}>
      <Link to="/">
        <strong style={{float:"left",color:"black"}}>Go Back</strong>
      </Link>
    <MDBTypography tag="h2" className='text-muted mt-2' style={{display:"inline-block"}}> 
      {blog && blog.title}
    </MDBTypography>
    <img src={blog && blog.imageUrl} className='img-fuild rounded'alt={blog && blog.title} style={{width:"100%",maxHeight:"600px"}}/>
      <div style={{marginTop:"20px"}}>
        <div style={{height:"43px",background:"#f6f6f6"}}>
            <MDBIcon 
              style={{float:"left"}}
              className='mt-4'
              far
              icon="calendar-alt"
              size="lg"
            />
            <strong style={{float:"left",marginTop:"10px",marginLeft:"2px"}}>
              {blog && blog.date}
            </strong>
            <Badge styleInfo={styleInfo}>{blog && blog.category}</Badge>
        </div>
        <MDBTypography className='lead md-0'style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
          {blog && blog.description}
        </MDBTypography>
      </div>
      {relatedPost && relatedPost.length>0 &&(
        <>
        {relatedPost.length>1 && <h1>Related Post</h1>}
        <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
          {relatedPost.filter((item)=>item.id!==id).map((item,index)=>(
              <MDBCol key={item.id}>
                <MDBCard>
                  <Link to={`/blog/${item.id}`}>
                    <MDBCardImage
                      src={item.imageUrl}
                      alt={item.title}
                      position="top"
                    />
                  </Link>
                  <MDBCardBody>
                      <MDBCardTitle>{item.title}</MDBCardTitle>
                      <MDBCardText>{excerpt(item.description)}</MDBCardText>
                  </MDBCardBody>                  
                </MDBCard>
              </MDBCol>
          ))}
        </MDBRow>
        </>
      )}
    </MDBContainer>

    </>
    
  )
}

export default Blog
