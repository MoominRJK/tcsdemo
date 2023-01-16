import React from "react";

import { Card } from "react-bootstrap";

import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBRow,
    MDBCol
  } from 'mdb-react-ui-kit';

const EventCard = () => {
  const cardInfo = [
    {
      image: "https://i.insider.com/50f967f56bb3f7830a000019",
      title: "Lebron James",
      text: "THE GOAT",
    },
    {
      image:
        "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
      title: "Alex Caruso",
      text: "THE TRUE GOAT",
    },
    {
      image:
        "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
      title: "Steph Curry",
      text: "he good",
    },
    {
      image:
        "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
      title: "Michael Jordan",
      text: "he is very close to goat",
    },
        {
      image:
        "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
      title: "Alex Caruso",
      text: "THE TRUE GOAT",
    },
    {
      image:
        "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
      title: "Steph Curry",
      text: "he good",
    },
    {
      image:
        "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
      title: "Michael Jordan",
      text: "he is very close to goat",
    },


  ];

  const renderCard = (card, index) => {
    return (


                  <MDBCol  key={index}>
                    <MDBCard className='h-100' >
                        <MDBCardImage
                        src={card.image} 
                        alt='...'
                        position='top'
                        />
                        <MDBCardBody>
                        <MDBCardTitle>{card.title}</MDBCardTitle>
                        <MDBCardText>
                            {card.text}
                        </MDBCardText>
                        </MDBCardBody>
                        <MDBCardFooter>
                        <small className='text-muted'>Last updated 3 mins ago</small>
                        </MDBCardFooter>
                    </MDBCard>
                    </MDBCol>
        
    );
  };

  return <div style={{ display: "flex", flexDirection: "row" }} >{cardInfo.map(renderCard)}</div>;
};

export default EventCard;