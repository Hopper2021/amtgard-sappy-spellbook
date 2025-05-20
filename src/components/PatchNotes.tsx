import { useState } from 'react'
import FloatingActionButton from './FloatingActionButton.tsx'
import { Container, Row, Button, Modal, Alert, CardHeader, Accordion } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { IoIosWarning } from "react-icons/io"
import { LuCirclePlus } from "react-icons/lu"
import { IoMdInformationCircle } from "react-icons/io"

function App() {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [toggleDeleteModal, setDeleteToggleModal] = useState(false)
  const emptySpellList = {
    id: null,
    name: '',
    class: '',
    maxLevel: null,
    lookThePart: false,
    spells: [],
  }
  const [selectedSpellList, setSelectedSpellList] = useState(emptySpellList)
  const [longPressTimeout, setLongPressTimeout] = useState<NodeJS.Timeout | null>(null)
  const [showAlert, setShowAlert] = useState(true)

  let enableTips = localStorage.getItem('enableTips')
  if (enableTips === null) {
    localStorage.setItem('enableTips', 'true')
    enableTips = 'true'
  }
  const tipsEnabled = enableTips === 'true'

  const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')

  const handleClose = () => {
    setOpenModal(false)
    setDeleteToggleModal(false)
    setSelectedSpellList(emptySpellList)
  }

  const handleLongPressStart = (spellList) => {
    const timeout = setTimeout(() => {
      setSelectedSpellList({...selectedSpellList, ...spellList})
      setOpenModal(true)
    }, 500)
    setLongPressTimeout(timeout)
  }

  const handleLongPressEnd = () => {
    if (longPressTimeout) {
      clearTimeout(longPressTimeout as unknown as number)
    }
  }

  const handleToggleDeleteModal = (spellList) => {
    setDeleteToggleModal(true)
    setOpenModal(false)
  }

  return (
    <>
      <Modal className="p-4" show={openModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <IoIosWarning size={35} className="me-2" color="gold"/> 
            {selectedSpellList?.name}
          </Modal.Title>
        </Modal.Header>
        <div className="d-flex flex-column align-items-center py-3">
          <Button
            variant="secondary"
            className="mb-4"
            style={{ width: "80%" }}
            onClick={() => navigate(`/modifyList/${selectedSpellList?.id}`)}
          >
            Modify
          </Button>
          <Button
            variant="danger"
            style={{ width: "80%" }}
            onClick={handleToggleDeleteModal}
          >
            Delete
          </Button>
        </div>
      </Modal>

      <Modal show={toggleDeleteModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <IoIosWarning size={35} className="me-2" color="gold"/>
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-sm">
          Are you sure you want to delete {selectedSpellList?.name}?
        </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => {
              const updatedSpellLists = allSpellLists.filter((spellList) => spellList.id !== selectedSpellList.id)
              localStorage.setItem('allSpellLists', JSON.stringify(updatedSpellLists))
              handleClose()
            }}>
              Delete
            </Button>
          </Modal.Footer>
      </Modal>

      <Container fluid className="p-3">
        {tipsEnabled && (
          <Alert
            show={showAlert}
            className="alert-primary"
            dismissible
            onClose={() => setShowAlert(false)}
            >
            <IoMdInformationCircle  size={25} className="me-2" color="blue"/>
            <span>Click the download button below to get this app on your Android device</span>
          </Alert>
        )}
        <Container className="px-4 pt-1 d-flex justify-content-center">
          <a
            // href=" // APK URL HERE "
            className="btn btn-primary mb-1"
            download
          >
            Download Android APK
          </a>
        </Container>
        <Row className="ps-4 pb-2 pt-3 fw-semibold text-decoration-underline">Patch Notes</Row>

        <Container className="ps-4">
          <span className="fw-semibold">Version: 0.4.0</span>
          <Container className="ps-2 pt-1">
            <ul>
              <li>Added Druid Archetypes and Error messaging</li>
              <Accordion>
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
            </ul>
          </Container>
        </Container>

        <Container className="ps-4">
          <span className="fw-semibold">Version: 0.3.0</span>
          <Container className="ps-2 pt-1">
            <ul>
              <li>Added Wizard Archetypes and Tips</li>
              <Accordion>
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
            </ul>
          </Container>
        </Container>

        <Container className="ps-4">
          <span className="fw-semibold">Version: 0.2.0</span>
          <Container className="ps-2 pt-1">
            <ul>
              <li>Added Healer Archetypes and long-press features</li>
              <Accordion>
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
            </ul>
          </Container>
        </Container>

        <Container className="ps-4">
          <span className="fw-semibold">Version: 0.1.0</span>
          <Container className="ps-2 pt-1">
            <ul>
              <li>Created Base web application</li>
              <Accordion>
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
            </ul>
          </Container>
        </Container>
      </Container>
      <FloatingActionButton />
    </>
  )
}

export default App