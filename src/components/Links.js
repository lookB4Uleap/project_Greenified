import React from 'react'
import '../component-styles/Links.css'

const Links = ({ links }) => {
    return (
        <div className='LinkContainer'>
            {/* <input type='text' 
            id='link-name' 
            placeholder='Link Name' 
            onChange = {
                (e) => {
                    links[1] = e.target.value
                }
            }
            /> */}
            <input type='text' 
            id='link-addr' 
            placeholder='Link Address' 
            onChange = {
                (e) => {
                    links[2] = e.target.value
                }
            }
            />
        </div>
    )
}

export default Links
