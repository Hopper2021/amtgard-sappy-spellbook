import React, { useState } from 'react'
import FloatingActionButton from './FloatingActionButton.tsx'
import { Container, Row, Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { IoIosWarning } from "react-icons/io"
import { LuCirclePlus } from "react-icons/lu"

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

  console.log('selectedSpellList', selectedSpellList)

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
      <Modal show={openModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <IoIosWarning size={35} className="me-2" color="gold"/>
            {selectedSpellList?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Dialog className="modal-sm d-flex justify-content-around">
          <Button variant="secondary" className="mb-4" onClick={() => navigate(`/modifyList/${selectedSpellList?.id}`)}>
            Modify
          </Button>
          <Button variant="primary" onClick={handleToggleDeleteModal}>
            Delete
          </Button>
        </Modal.Dialog>
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

      {console.log('allSpellLists', allSpellLists.length)}

      <Container fluid className="p-3">
        <h6>Spell Books</h6>
        <Container className="px-4 pt-1">
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
                onClick={() => navigate(`/listDetails/${spellList.id}`)}
              >
                {spellList.name} ({spellList.class}, level {spellList.maxLevel})
              </Button>
            </Row>
          )))}
        </Container>
      </Container>
      <FloatingActionButton />
    </>
  )
}

export default App