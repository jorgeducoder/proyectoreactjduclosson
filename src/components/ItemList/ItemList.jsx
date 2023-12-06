import Item from '../Item/Item';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ItemList = ({ alimentos }) => {
  console.log(alimentos)
  return (
    <>
     <Container fluid>
       <Row>
          
              {alimentos.map((alimento)=>(
                
                <Col sm={1} md={2} lg={4} key={alimento.id} >
                   <Item
                    alimento={alimento}
                  />
                </Col>
               ))}
          
       </Row>
     </Container>
     </>
  );
 /* La key se agrega en el Col de Bootstrap porque es el elemento padre y tiene un Div*/

};

export default ItemList;