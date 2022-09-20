import { Container, Row, Col } from "react-bootstrap"
import React from "react"

const Footer = () => {
  const name = "Ghozlene Med Achref"
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; Shopping made it by {name}
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
