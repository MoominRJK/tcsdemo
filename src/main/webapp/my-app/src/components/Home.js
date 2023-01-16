import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import { CssBaseline } from '@material-ui/core';

import {
    MDBCarousel,
    MDBCarouselItem,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBRow,
    MDBCol,
    MDBContainer,
  } from 'mdb-react-ui-kit';





const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg1.png'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  }));

  export default function Home() {
    return (
        <>
        <MDBCarousel showIndicators showControls fade>
          <MDBCarouselItem
            className='w-100 d-block'
            itemId={1}
            src={`${process.env.PUBLIC_URL}/assets/a1.png`} 
            alt='...'
          >
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </MDBCarouselItem>
          
          <MDBCarouselItem
            className='w-100 d-block'
            itemId={2}
            src={`${process.env.PUBLIC_URL}/assets/a2.png`} 
            alt='...'
          >
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </MDBCarouselItem>
    
          <MDBCarouselItem
            className='w-100 d-block'
            itemId={3}
            src={`${process.env.PUBLIC_URL}/assets/a3.png`} 
            alt='...'
          >
            <h5>Third slide label</h5>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </MDBCarouselItem>
        </MDBCarousel>




    <MDBContainer breakpoint="sm mt-5">
   <h2 className='text-primary text-center'>More Event You Attend, More Points You Get !</h2>
      <MDBRow className='row-cols-1 row-cols-md-4 g-4'>
       
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
             src={`${process.env.PUBLIC_URL}/assets/parkingspot.jpeg`} 
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Special Parking Space</MDBCardTitle>
            <MDBCardText>
              Designated school parking spot for one month.
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter className='bg-success shadow-1-strong'>
            <h6 className= 'text-white text-center'>12th Grade: <br/>Top Accumulator Prize</h6>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://mdbootstrap.com/img/new/standard/city/044.webp'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Special Parking Space</MDBCardTitle>
            <MDBCardText>
              Designated school parking spot for one month.
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter className='bg-success shadow-1-strong'>
            <h6 className= 'text-white text-center'>11th Grade: <br/>Top Accumulator Prize</h6>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://mdbootstrap.com/img/new/standard/city/044.webp'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Special Parking Space</MDBCardTitle>
            <MDBCardText>
              Designated school parking spot for one month.
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter className='bg-success shadow-1-strong'>
            <h6 className= 'text-white text-center'>10th Grade:<br/> Top Accumulator Prize</h6>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://mdbootstrap.com/img/new/standard/city/044.webp'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Special Parking Space</MDBCardTitle>
            <MDBCardText>
              Designated school parking spot for one month.
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter className='bg-success shadow-1-strong'>
            <h6 className= 'text-white text-center'>9th Grade: <br/>Top Accumulator Prize</h6>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      
    </MDBRow>





    <h2 className='text-primary text-center mt-5'>Raffle Prizes Are Drawn Every Quarter!</h2>
    <MDBRow className='row-cols-1 row-cols-md-4 g-4 '>
   
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://mdbootstrap.com/img/new/standard/city/044.webp'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Special Parking Space</MDBCardTitle>
            <MDBCardText>
              Designated school parking spot for one month.
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter className='bg-primary shadow-1-strong'>
            <h6 className= 'text-white text-center'>12th Grade: Raffle Prize</h6>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://mdbootstrap.com/img/new/standard/city/044.webp'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Special Parking Space</MDBCardTitle>
            <MDBCardText>
              Designated school parking spot for one month.
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter className='bg-primary shadow-1-strong'>
            <h6 className= 'text-white text-center'>11th Grade: Raffle Prize</h6>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://mdbootstrap.com/img/new/standard/city/044.webp'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Special Parking Space</MDBCardTitle>
            <MDBCardText>
              Designated school parking spot for one month.
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter className='bg-primary shadow-1-strong'>
            <h6 className= 'text-white text-center'>10th Grade: Raffle Prize</h6>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://mdbootstrap.com/img/new/standard/city/044.webp'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Special Parking Space</MDBCardTitle>
            <MDBCardText>
              Designated school parking spot for one month.
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter className='bg-primary shadow-1-strong'>
            <h6 className= 'text-white text-center'>9th Grade: Raffle Prize</h6>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      
    </MDBRow>
    </MDBContainer>



    </>

      );


    // const classes = useStyles();
    // return (
    //   <div className={classes.root}>
    //     <CssBaseline />
    //     {/* <Header />
    //     <PlaceToVisit /> */}
    //   </div>
    // );
  }

// export default function Home() {
//   const classes = useStyles();
//   const [checked, setChecked] = useState(false);
//   useEffect(() => {
//     setChecked(true);
//   }, []);
//   return (
//     <div className={classes.root} id="header">
//       <Collapse
//         in={checked}
//         {...(checked ? { timeout: 1000 } : {})}
//         collapsedHeight={50}
//       >
//         <div className={classes.container}>
//           <h1 className={classes.title}>
//             Welcome to <br />
//             My<span className={classes.colorText}>Island.</span>
//           </h1>
//           <Scroll to="place-to-visit" smooth={true}>
//             <IconButton>
//               <ExpandMoreIcon className={classes.goDown} />
//             </IconButton>
//           </Scroll>
//         </div>
//       </Collapse>
//     </div>
//   );
// }