
import Card from 'react-bootstrap/Card';

 



const ItemEnCart = ({alimento}) => { 
console.log(alimento)
return (
    <Card border="dark" style={{ width: '10rem', margin: '5px', padding: '5px'}}>
      <Card.Img variant="top" src={alimento.img} style={{width: '150px', height: '100px'}}/>
      
      <Card.Body>
        <Card.Title>{alimento.nombre}</Card.Title>
        <Card.Text>
          {alimento.recetadesc}
         </Card.Text>
       
      </Card.Body>
    </Card>
    );
};

export default ItemEnCart;