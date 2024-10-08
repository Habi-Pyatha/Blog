import React from 'react'
import { MDBCard,MDBListGroup,MDBListGroupItem } from 'mdb-react-ui-kit'  //flush at h4 ko muni ko ma
const Category = ({handleCategory,options}) => {
  return (
    <>
    <MDBCard style={{width:"18rem",marginTop:"20px"}}>
        <h4>Categories</h4>
        <MDBListGroup >
            {options.map((item,index)=>{
                 return <MDBListGroupItem key={index} style={{cursor:"pointer"}} onClick={()=>handleCategory(item)}>
                    {item}
                   
                    
                </MDBListGroupItem>
            })}
        </MDBListGroup>

    </MDBCard>
    </>
  )
}

export default Category
