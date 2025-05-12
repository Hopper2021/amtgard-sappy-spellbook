import React from 'react'
import { Container, Row, Accordion, Form } from 'react-bootstrap'

function EditSpellList() {
  const mockPropsSpellList = {
    id: 1,
    name: 'Test Healer List',
    class: 'Healer',
    maxLevel: 6,
    spells: []
  }

  const mockHealerSpells = [
    {
      level: 1,
      pointsAvailable: 5,
      spells: [
        { name: 'Banish', cost: 1, quantityPerCost: 2 },
        { name: 'Blessing Against Wounds', cost: 1, quantityPerCost: 1 },
        { name: 'Harden', cost: 1, quantityPerCost: 1 },
      ]
    },
    {
      level: 2,
      pointsAvailable: 5,
      spells: [
        { name: 'Adaptive Blessing', cost: 1, quantityPerCost: 1 },
        { name: 'Innate', cost: 1, quantityPerCost: 1 },
        { name: 'Sever Spirit', cost: 1, quantityPerCost: 1 },
      ]
    },
    {
      level: 3,
      pointsAvailable: 5,
      spells: [
        { name: 'Astral Intervention', cost: 1, quantityPerCost: 1 },
        { name: 'Extension', cost: 1, quantityPerCost: 1 },
        { name: 'Ressurect', cost: 1, quantityPerCost: 1 },
      ]
    },
    {
      level: 4,
      pointsAvailable: 5,
      spells: [
        { name: 'Circle of Protection', cost: 1, quantityPerCost: 1 },
        { name: 'Imbue Shield', cost: 1, quantityPerCost: 1 },
        { name: 'Teleport', cost: 1, quantityPerCost: 1 },
      ]
    },
    {
      level: 5,
      pointsAvailable: 5,
      spells: [
        { name: 'Abeyance', cost: 1, quantityPerCost: 1 },
        { name: 'Englightened Soul', cost: 1, quantityPerCost: 1 },
        { name: 'Steal Life Essence', cost: 1, quantityPerCost: 1 },
      ]
    },
    {
      level: 6,
      pointsAvailable: 6,
      spells: [
        { name: 'Ancestral Armor', cost: 2, quantityPerCost: 1 },
        { name: 'Persistent', cost: 1, quantityPerCost: 2 },
        { name: 'Stun', cost: 1, quantityPerCost: 1 },
      ]
    },
  ]

  return (
    <Container fluid className="p-3">
        <h6>Edit {mockPropsSpellList.class} Spells</h6>
        <Container>
          {mockHealerSpells.map((level) => (
            <Accordion defaultActiveKey="1" flush>
              <Accordion.Item eventKey="0" className="border-bottom">
                <Accordion.Header>Level {level.level}  ({level.pointsAvailable}) available: {level.pointsAvailable}</Accordion.Header>
                {/* put function above to calculate available points based on level passed in and points spent in current level and higher*/}
                <Accordion.Body>
                  {level.spells.map((spell) => (
                    <Row className="d-flex justify-content-between">
                      <Form.Text>{spell.name} (cost: {spell.cost})</Form.Text>
                    </Row>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
        </Container>
    </Container>
  )
}

export default EditSpellList
