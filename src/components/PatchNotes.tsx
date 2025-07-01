import { Container, Row, Accordion } from 'react-bootstrap'
import { IS_APK, PATCH_NOTES } from '../appConstants.js'
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
                    <span>Now available on the <strong>Google Play Store</strong></span>
                    <br />
                    <br /><span>Recommended: If you installed the Open Beta APK, uninstall it and reinstall from the play store to receive prompted updates.</span>
                </>
              }
            />
            <Container className="d-flex flex-wrap justify-content-center align-items-center justify-content-around mb-2">
              <a href="https://play.google.com/store/apps/details?id=com.swiftgard.app&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
                <img
                  src="/screenshots/GetItOnGooglePlay_Badge_Web_color_English.png"
                  style={{ width: 200, textAlign: 'center' }}
                  alt="Google Play Store Link. Click to open in a new tab."
                />
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
                <Accordion className="ps-1 pb-1">
                  <Accordion.Header className="border">Details</Accordion.Header>
                  <Accordion.Body>
                    <ul className="ps-0">
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