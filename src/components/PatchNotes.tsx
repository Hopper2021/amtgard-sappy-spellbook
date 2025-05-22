import { useState } from 'react'
import FloatingActionButton from './FloatingActionButton.tsx'
import { Container, Row, Button, Alert, Accordion } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { IoMdInformationCircle } from "react-icons/io"
import { IoEllipsisVertical } from 'react-icons/io5'

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
              className="end-0 bottom-0 text-muted small"
              style={{ pointerEvents: 'none' }}
            >
              <span>Disable tips in settings <IoEllipsisVertical /></span>
            </div>
          </Alert>
        )}
        <Container className="px-4 pt-1 d-flex justify-content-center">
          {/* <a
            // href=" // APK URL HERE "
            className="btn btn-primary mb-1"
            download
          >
            Download Android APK
          </a> */}
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

        <Container className="ps-4">
          <span className="fw-semibold">Version: 0.0.6</span>
          <Container className="ps-2 pt-1">
              <Row className="ps-4">Martial classes, Experienced part 2.</Row>
              <Accordion className="ps-3">
                <Accordion.Header className="border" >Details</Accordion.Header>
                <Accordion.Body>
                  <ul>
                    <li>Created base lists for all martial classes</li>
                    <li>Experienced logic part 2</li>
                    <li>Update CNAME</li>
                    <li>Update styling on Add and Remove toggle on Edit Spell Page to be more easily understood.</li>
                    <li>Add "Done Editing" Button to bottom of Edit Spells page to return to the spell details page</li>
                    <li>Bug Fix: Prevent spell details modal from opening when scrolling</li>
                  </ul>
                </Accordion.Body>
              </Accordion>
          </Container>
        </Container>

        <Container className="ps-4">
          <span className="fw-semibold">Version: 0.0.5</span>
          <Container className="ps-2 pt-1">
              <Row className="ps-4">Added Bard Archetypes, Add Remove page long press details, and Archetype clarifications</Row>
              <Accordion className="ps-3">
                <Accordion.Header className="border" >Details</Accordion.Header>
                <Accordion.Body>
                  <ul>
                    <li>Added Bard Archetypes limitations and spell frequency changes.</li>
                    <li>Archetype Error popup message now includes the archtype that is limiting the spell when restricted spell is clicked.</li>
                    <li>Add helper text in tips to describe where tips can be disabled.</li>
                    <li>Add range checkbox option to spell details.</li>
                    <li>Give Create page a facelift</li>
                    <li>Added Experience logic part 1 - modal created, data flows to it, select for experienced to come in part 2.</li>
                  </ul>
                </Accordion.Body>
              </Accordion>
          </Container>
        </Container>

        <Container className="ps-4">
          <span className="fw-semibold">Version: 0.0.4</span>
          <Container className="ps-2 pt-1">
              <Row className="ps-4">Added Druid Archetypes and Error messaging</Row>
              <Accordion className="ps-3">
                <Accordion.Header className="border" >Details</Accordion.Header>
                <Accordion.Body>
                  <ul>
                    <li>Added Druid Archetypes limitations and spell frequency changes.</li>
                    <li>When clicking on a restricted spell due to archetype, and error message will popup to explain why this cannot be added.</li>
                    <li>Enable archetypes to function simultaniously.</li>
                    <li>When spell is purchased, then archetype is added that would otherwise limit said spell, that spell is removed.</li>
                    <li>Added Download Page</li>
                  </ul>
                </Accordion.Body>
              </Accordion>
          </Container>
        </Container>

        <Container className="ps-4">
          <span className="fw-semibold">Version: 0.0.3</span>
          <Container className="ps-2 pt-1">
              <Row className="ps-4">Added Wizard Archetypes and Tips</Row>
              <Accordion className="ps-3">
                <Accordion.Header className="border" >Details</Accordion.Header>
                <Accordion.Body>
                  <ul>
                    <li>Added Wizard Archetypes limitations and spell frequency changes.</li>
                    <li>Added tips around the app for long press features and clarifications</li>
                    <li>Added Disable Tips setting in ellipsis ( Top right-hand corner 3 dot menu ) to perminantly disable tip appearance. This can be enabled anytime through the same button.</li>
                    <li>For spell Add or Remove pages, popup messages will now appear when attempting to add a spell that has reached maximum purchase limit or when the user has no more points left to spend.</li>
                  </ul>
                </Accordion.Body>
              </Accordion>
          </Container>
        </Container>

        <Container className="ps-4">
          <span className="fw-semibold">Version: 0.0.2</span>
          <Container className="ps-2 pt-1">
            <Row className="ps-4">Added Healer Archetypes and long-press features</Row>              
            <Accordion className="ps-3">
              <Accordion.Header className="border" >Details</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Added Healer Archetypes limitations and spell frequency changes.</li>
                  <li>On long-press of a spell when addeing or removing spells, a modal appears to describe that spells effects, limitations, and notes.</li>
                  <li>Minor spell fixes to master spell list</li>
                  <li>On long-press of spell list name on home page, a modal opens to give the user the option to modify base data or delete the list.</li>
                </ul>
              </Accordion.Body>
            </Accordion>
          </Container>
        </Container>

        <Container className="ps-4">
          <span className="fw-semibold">Version: 0.0.1</span>
          <Container className="ps-2 pt-1">
            <Row className="ps-4">Created Base web application</Row>              
            <Accordion className="ps-3">
              <Accordion.Header className="border">Details</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Added spellcaster lists: Bard, Druid, Healer, Wizard</li>
                  <li>Add master spell list</li>
                  <li>Include spell ball colors for materials, show spell ball color on "show strips/materials" click on details page</li>
                  <li>Create and connect base routes for create, read, update, delete</li>
                  <li>Create base pages</li>
                  <li>Enable data flow</li>
                  <li>Lots of Edit and Remove spell list logic</li>
                </ul>
              </Accordion.Body>
            </Accordion>
          </Container>
        </Container>
      </Container>
      <FloatingActionButton />
    </>
  )
}

export default App