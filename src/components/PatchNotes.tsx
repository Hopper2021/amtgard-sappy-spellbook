import { Container, Row, Accordion } from 'react-bootstrap'
import { APK_VERSION, IS_APK, PATCH_NOTES } from '../appConstants.js'
import AlertTip from './AlertTip.tsx'

const PatchNotes = () => {
  return (
    <Container fluid className="p-3 mb-5">
      <Container className="px-1 pt-1">
        {IS_APK ? null
          : (
            <>
              <AlertTip
                message={
                  <>
                    <span>Open Beta APK <strong>{APK_VERSION}</strong> is now available!</span>
                  <br />
                  <span>Ignore the warnings, it's fine to download.</span>
                </>
              }
            />
            <Container className="d-flex justify-content-center mb-2">
              <a
                href="/downloads/swiftgard-main-0c5516-release.apk" 
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

export default PatchNotes