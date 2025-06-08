import { useState } from 'react'
import { Container, Row, Alert, Accordion } from 'react-bootstrap'
import { IoMdInformationCircle } from "react-icons/io"
import { IoEllipsisVertical } from 'react-icons/io5'
import { APK_VERSION, IS_APK, PATCH_NOTES } from '../appConstants.js'

function App() {
  const [showAlert, setShowAlert] = useState(true)

  let enableTips = localStorage.getItem('enableTips')
  if (enableTips === null) {
    localStorage.setItem('enableTips', 'true')
    enableTips = 'true'
  }
  const tipsEnabled = enableTips === 'true'

  return (
    <Container fluid className="p-3 mb-5">
      <Container className="px-1 pt-1">
        {IS_APK ? null 
          : ( <>
            {tipsEnabled && (
              <Alert
                show={showAlert}
                className="d-flex alert-primary"
                dismissible
                onClose={() => setShowAlert(false)}
                >
                <IoMdInformationCircle size={25} className="me-1" color="blue"/>
                <div className="d-flex flex-column">
                  <span>Open Beta APK <strong>{APK_VERSION}</strong> is now available!</span>
                  <span>Ignore the warnings, it's fine to download.</span>
                  <div
                    className="end-0 bottom-0 text-muted small mt-1"
                    style={{ pointerEvents: 'none' }}
                  >
                    <span>Disable tips in settings <IoEllipsisVertical /></span>
                  </div>
                </div>
              </Alert>
            )}
            <Container className="d-flex justify-content-center mb-2">
              <a
                href="/downloads/swiftgard-main-b5f6e6-release.apk" 
                className="btn btn-primary mb-1"
                download
                style={{ minWidth: 200, textAlign: 'center' }}
              >
                Download Android APK {APK_VERSION}
              </a>
            </Container>
          </>
        )}

        <Container>
          <Row className="pb-2 fw-semibold">Patch Notes</Row>
          {PATCH_NOTES.map(note => (
            <Container className="ps-1 pe-0" key={note.version}>
              <span className="fw-semibold">Version: {note.version}</span>
              <Container className="ps-2 pt-1 pe-0">
                <Row className="ps-2 pb-1">{note.title}</Row>
                <Accordion className="ps-2 pb-1">
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
      </Container>
    </Container>
  )
}

export default App