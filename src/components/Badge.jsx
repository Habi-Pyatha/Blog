import { MDBBadge } from 'mdb-react-ui-kit'
import React from 'react'

const Badge = ({children,styleInfo}) => {
    const colorKey={
        Fashion:'primary',
        Travel:'success',
        Fitness:'danger',
        Food:'warning',
        Tech:'info',
        Sports:'dark'
    }
  return (
    <div>
        <h5 style={styleInfo}>
            <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
        </h5>
    </div>
  )
}

export default Badge
