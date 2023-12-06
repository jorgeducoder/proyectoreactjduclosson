import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import './Item.css' 


/*function Itemren() {*/
const Item = ({alimento}) => { 
/*alert(alimento.id)*/
return (
    <Card border="dark" style={{ width: '18rem', margin: '10px', padding: '10px'}}>
      <Card.Img variant="top" src={alimento.img} style={{width: '265px', height: '180px'}}/>
      
      <Card.Body>
        <Card.Title>{alimento.nombre}</Card.Title>
        <Card.Text>
          {alimento.recetadesc}
        </Card.Text>
        <Button variant="primary" as={Link} to={`/item/${alimento.id}`}>Pedilo Ya!</Button>
      </Card.Body>
    </Card>
    );
};

export default Item;

