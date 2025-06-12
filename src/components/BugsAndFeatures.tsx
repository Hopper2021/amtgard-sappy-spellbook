import { Container, Row } from 'react-bootstrap'

const BugsAndFeatures = () => {
  return (
        <Container className="px-0 pt-1">
          <Container>
            <Row className="d-flex justify-content-center mt-3">
                <h5 className="text-center">Bug reporting and feature requests</h5>
                <span className="text-center mt-3">
                    If you would like to report a bug or make a feature request, please email: {' '}
                    <a href='mailto:swiftgardapp@gmail.com'>swiftgardapp@gmail.com</a>
                </span>
            </Row>
          </Container>
        </Container>
  )
}

export default BugsAndFeatures