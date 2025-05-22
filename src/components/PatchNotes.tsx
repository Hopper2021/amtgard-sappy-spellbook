import { useState } from 'react'
import FloatingActionButton from './FloatingActionButton.tsx'
import { Container, Row, Button, Alert, Accordion } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { IoMdInformationCircle } from "react-icons/io"
import { IoEllipsisVertical } from 'react-icons/io5'
import { PATCH_NOTES } from '../appConstants.js'

function App() {
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(true)

  let enableTips = localStorage.getItem('enableTips')
  if (enableTips === null) {
    localStorage.setItem('enableTips', 'true')
    enableTips = 'true'
  }
  const tipsEnabled = enableTips === 'true'

  return (
    <>
      <Container fluid className="p-3">
        {tipsEnabled && (
          <Alert
            show={showAlert}
            className="alert-primary align-items-center"
            dismissible
            onClose={() => setShowAlert(false)}
            >
            <IoMdInformationCircle size={25} className="me-1" color="blue"/>
            <span>Below button will highlight blue when APK is available for download.</span>
            <div
              className="end-0 bottom-0 text-muted small mt-1"
              style={{ pointerEvents: 'none' }}
            >
              <span>Disable tips in settings <IoEllipsisVertical /></span>
            </div>
          </Alert>
        )}
        <Container className="px-4 pt-1 d-flex justify-content-center">
          <Button
            disabled
            variant="secondary"
            className="mb-1"
            onClick={() => navigate('/download')}
            >
              Download Android APK
            </Button>
        </Container>
        <Row className="ps-4 pb-2 pt-3 fw-semibold text-decoration-underline">Patch Notes</Row>

        {PATCH_NOTES.map(note => (
          <Container className="ps-4" key={note.version}>
            <span className="fw-semibold">Version: {note.version}</span>
            <Container className="ps-2 pt-1">
              <Row className="ps-4">{note.title}</Row>
              <Accordion className="ps-3">
                <Accordion.Header className="border">Details</Accordion.Header>
                <Accordion.Body>
                  <ul>
                    {note.details.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion>
            </Container>
          </Container>
        ))}
      </Container>
      <FloatingActionButton />
    </>
  )
}

export default App