import { useState } from 'react'
import FloatingActionButton from './FloatingActionButton.tsx'
import { Container, Row, Button, Modal, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { IoIosWarning } from "react-icons/io"
import { LuCirclePlus } from "react-icons/lu"
import { IoMdInformationCircle } from "react-icons/io"
import { IoEllipsisVertical } from 'react-icons/io5'
import { CURRENT_VERSION } from '../appConstants.js'

function App() {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [toggleDeleteModal, setDeleteToggleModal] = useState(false)
  const emptySpellList = {
    id: null,
    version: CURRENT_VERSION,
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
    <Container className="p-3 px-3">
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

        <Container className="px-0 pt-1">
          {tipsEnabled && (
            <Alert
              show={showAlert}
              className="d-flex alert-primary"
              dismissible
              onClose={() => setShowAlert(false)}
              >
              <IoMdInformationCircle size={35} className="me-1" color="blue"/>
              <div className="d-flex flex-column">
                <span>Long press on a spell book to modify its base data or delete it.</span>
                <div
                  className="end-0 bottom-0 text-muted small mt-1"
                  style={{ pointerEvents: 'none' }}
                >
                  <span>Disable tips in settings <IoEllipsisVertical /></span>
                </div>
              </div>
            </Alert>
          )}
          <Container>
          <Row className="pb-2 fw-semibold">Spell Books</Row>
            {allSpellLists.length === 0 ? (
              <Row className="d-flex justify-content-center">
                <h6 className="text-center">No Spell Books Found</h6>
                <h6 className="text-center">Click the <LuCirclePlus size={20} /> on the bottom right to create one</h6>
              </Row>)
              : (allSpellLists.map((spellList) => (
              <Row key={spellList.id} className="border-bottom mb-3">
                <Button
                  className="p-1 text-start w-100"
                  variant="link"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  onMouseDown={() => handleLongPressStart(spellList)}
                  onMouseUp={handleLongPressEnd}
                  onMouseLeave={handleLongPressEnd}
                  onTouchStart={() => handleLongPressStart(spellList)}
                  onTouchEnd={handleLongPressEnd}
                  onClick={() => {
                    spellList.version && spellList.version === CURRENT_VERSION
                    ? navigate(`/listDetails/${spellList.id}`)
                    : navigate(`/legacyListDetails/${spellList.id}`)
                  }}
                >
                  {spellList.name} ({spellList.class}, level {spellList.maxLevel})
                </Button>
              </Row>
            )))}
          </Container>
        </Container>
      <FloatingActionButton />
    </Container>
  )
}

export default App