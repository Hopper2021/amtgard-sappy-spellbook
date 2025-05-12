import React from 'react'
import { Container, Row, Button, Col, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SpellListDetails() {
  const navigate = useNavigate()
  const mockPropsSpellList = {
    id: 1,
    name: 'Test Healer List',
    class: 'Healer',
    maxLevel: 6,
    spells: []
  }

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
        <Form.Text>Class: {mockPropsSpellList.class}</Form.Text>
        <Form.Text>Points Remaining...</Form.Text>
        <Form.Text>L1: 5, L2: 5, L3: 5, L4: 5, L5: 5, L6: 6</Form.Text>
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
