import React from 'react'

const Footer = () => {
    const year = (new Date()).getFullYear();
    return (
        <footer className='Footer'>
            &copy; Greenified {year}
        </footer>
    )
}

export default Footer
