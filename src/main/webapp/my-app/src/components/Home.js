import React, { useEffect, useState, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import { CssBaseline } from '@material-ui/core';
import {Redirect, withRouter} from "react-router-dom";
import axios from 'axios';

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
    MDBBadge,
  } from 'mdb-react-ui-kit';

class Home extends Component {
    state = {
      data : [] 
  }


componentDidMount =  () => {
    this.getAllPrizes();
}

  getAllPrizes = async () =>{

    const response = await axios.get(`/allPrize`, {
        headers : {
             authorization : 'Bearer ' + localStorage.getItem('jwtToken')
        }
    }).catch(err => {
        console.log(err);


        //this.props.history.push('/notFound404');
    });
    
    this.setState({
        data: response.data.filter(prize => prize.year === 2023) ,
    })

}


 useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg1.png'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  }));

  render() {
    const {data} = this.state;
    return (
        <>
        <MDBCarousel showIndicators showControls fade>
          <MDBCarouselItem
            className='w-100 d-block'
            itemId={1}
            src={`${process.env.PUBLIC_URL}/assets/a3.png`} 
            alt='...'
          >
            {/* <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </MDBCarouselItem>
          
          <MDBCarouselItem
            className='w-100 d-block'
            itemId={2}
            src={`${process.env.PUBLIC_URL}/assets/a2.png`} 
            alt='...'
          >
            {/* <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </MDBCarouselItem>
    
          <MDBCarouselItem
            className='w-100 d-block'
            itemId={3}
            src={`${process.env.PUBLIC_URL}/assets/a1.png`} 
            alt='...'
          >
            {/* <h5>Third slide label</h5>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
          </MDBCarouselItem>
        </MDBCarousel>




    <MDBContainer breakpoint="sm mt-5">
    <div className='text-center' >
      <h3 className='text-white'>The More Events You Attend, The More Points You Get !</h3>
    </div>
          
    <MDBRow className='row-cols-1 row-cols-md-4 g-4'>
                  {data.map((item) => (
              
                          <MDBCol className='mb-2'>
                              <MDBCard className='h-100'>
                              <MDBCardImage
                                  src={`${process.env.PUBLIC_URL}/assets/prize/${item.imageUrl}`} 
                                  alt='...'
                                  position='top'
                              />
                              <MDBCardBody>
                                  <MDBCardTitle>{item.name}</MDBCardTitle>
                                  <MDBCardText>
                                  {item.description}
                                  </MDBCardText>
                              
                              </MDBCardBody>
                              <p className='fw-bold mb-1'>
                                  <MDBBadge pill light className= 'ml-4 ms-2 center' color='warning'>
                                              {item.type}
                                          </MDBBadge></p>
                              <MDBCardFooter className={`${item.awardType === "Top" ? 'bg-success shadow-1-strong': 'bg-primary shadow-1-strong'} `}>
                                  <h6 className= 'text-white text-center'>{item.grade}th Grade: <br/>{item.awardType === "Top" ? 'Top Accumulator Prize' : 'Raffle Prize'}</h6>

                                  <h6 className= 'text-white text-center'>{item.year} : {item.quarter} Quarter</h6>

                              </MDBCardFooter>
                              </MDBCard>
                          </MDBCol>
        
                
                ))}
                                                  
              </MDBRow> 









   
      {/* <MDBRow className='row-cols-1 row-cols-md-4 g-4'>
       
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
             src={`${process.env.PUBLIC_URL}/assets/prize/parkingspot.jpeg`} 
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
             src={`${process.env.PUBLIC_URL}/assets/prize/ramen.png`} 
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Authentic Japanese ramen</MDBCardTitle>
            <MDBCardText>
               ICHIRAN Ramen combines the rich umami flavors of the broth with Hakata-style noodles that are slender, chewy, and perfect.
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
             src={`${process.env.PUBLIC_URL}/assets/prize/stick.jpeg`} 
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>A streaming stick</MDBCardTitle>
            <MDBCardText>
            Upgrade their Netflix marathons without actually buying them a whole new TV. The Roku Streaming Stick 4K offers 4K, HD, and HDR streaming in a portable package and at an affordable price. 
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
            src={`${process.env.PUBLIC_URL}/assets/prize/kit.jpeg`} 
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>A 51-piece art kit</MDBCardTitle>
            <MDBCardText>
              Designated school parking spot for one month.
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter className='bg-success shadow-1-strong'>
            <h6 className= 'text-white text-center'>9th Grade: <br/>Top Accumulator Prize</h6>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      
    </MDBRow> */}


{/* 
    <div className='text-center purple-700 mt-5' >
      <h3 className='text-white'>Raffle Prizes Are Drawn Every Quarter!</h3>
    </div>
    <MDBRow className='row-cols-1 row-cols-md-4 g-4 '>
   
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src={`${process.env.PUBLIC_URL}/assets/prize/maker.jpeg`} 
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>A cold brew coffee maker</MDBCardTitle>
            <MDBCardText>
            If their morning ritual includes a cup of cold brew, they'll appreciate this convenient cold brew maker. All they have to do is fill it with their favorite coffee grinds, add water, let it sit, and they've got a glass of delicious cold brew on the way. 
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
            src={`${process.env.PUBLIC_URL}/assets/prize/moes.jpeg`} 
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Moes Lunch meal</MDBCardTitle>
            <MDBCardText>
              Free meal
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
            src={`${process.env.PUBLIC_URL}/assets/prize/movies.jpeg`} 
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Movie Ticket</MDBCardTitle>
            <MDBCardText>
                Regal Movie Ticket
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
            src={`${process.env.PUBLIC_URL}/assets/prize/potter.jpeg`} 
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Harry Potter Book</MDBCardTitle>
            <MDBCardText>
               HarryPotter book
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter className='bg-primary shadow-1-strong'>
            <h6 className= 'text-white text-center'>9th Grade: Raffle Prize</h6>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      
    </MDBRow> */}
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
} 
export default withRouter(Home);

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