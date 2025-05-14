import React from 'react'
import { Container, Row, Button, Col, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

interface SpellLevel {
	level: number
	points: number
	spells: any[]
}

interface SpellList {
  id: number
  name: string
  class: string
  maxLevel: number
  lookThePart: boolean
  spells: SpellLevel[]
}

function SpellListDetails() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>() // Grab the id from the URL

  const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')
  const spellList = allSpellLists.find((list: SpellList) => list.id === parseInt(id || '0'))


  return (
    <Container className="pt-3">
      <Row className="d-flex">
        <Col xs="auto" className="pr-0">
          <h4>Overview</h4>
        </Col>
        <Col className="flex-grow-1">
          <Form.Check type={'checkbox'} label={'show type/school'} />
          <Form.Check type={'checkbox'} label={'show incantation'} />
          <Form.Check type={'checkbox'} label={'show strips'} />
        </Col>
        <Col xs="auto">
          <Button
            className="ms-auto d-block"
            onClick={() => navigate('/editList')}>
              Edit
          </Button>
        </Col>
      </Row>
      <Row>
        <Form.Text>Class: {spellList.class}</Form.Text>
        <Form.Text>Points Remaining...</Form.Text>
        { /* Form Text is space between somehow? seems like browser is lagging. Look into this later */ }
        <Row>
          {spellList.spells.map((level: SpellLevel, index) => (
            <Col key={index}>
              <Form.Text>
                L{level.level}: {level.points}
              </Form.Text>
            </Col>
          ))}
        </Row>
        <Form.Text>**** Spells ****</Form.Text>
        <Form.Text>Level 1</Form.Text>
        <Form.Text>Level 2</Form.Text>
        <Form.Text>Level 3</Form.Text>
        <Form.Text>Level 4</Form.Text>
        <Form.Text>Level 5</Form.Text>
        <Form.Text>Level 6</Form.Text>
      </Row>
    </Container>
  )
}

export default SpellListDetails
