import React from 'react';
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';

export default function Footer() {
  var style = {
    backgroundColor: "black",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}
  return (

    <div className='mt-5 bg-black text-white' >

       <footer className='bg-black'>
       <div style={phantom} />
        <MDBFooter style={style}  className='text-center mt-10 text-lg-left'>
            <div className='text-center p-3 mb-3' >
                &copy; {new Date().getFullYear()} Copyright:{' '}
                
                [SEAS] School Event Award System
                
            </div>
            </MDBFooter>
        </footer>

    </div>
  );
}

