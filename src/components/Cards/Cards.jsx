import Card from 'react-bootstrap/Card';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Cards.css"
import "react-multi-carousel/lib/styles.css";




function Cards(props) {

  



  return (
      
          <div className='card-container' style={{width: '15rem'}}>
          <Card className="main-card">
              <Card.Img variant="top" src={props.img} style={{borderRadius:"35px"}} />
              <Card.Body>
                <Card.Title className='card-title'>{props.name}</Card.Title>
                <Card.Text>
                {props.releaseDate}
                <br/>Rating: {props.rating}/10<br/>
                </Card.Text>
                
            </Card.Body>
            </Card>

        </div>
     
     
    
  );
}

export default Cards;
