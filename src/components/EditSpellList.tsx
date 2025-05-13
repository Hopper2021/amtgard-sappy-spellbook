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

const BARD_SPELLS = [
  {
    level: 1,
    spells: [
      { id: 33, cost: 1, max: null, frequency: '1/Refresh Charge x5'},
      { id: 52, cost: 2, max: 2, frequency: null},
      { id: 56, cost: 2, max: 2, frequency: null},
      { id: 88, cost: 1, max: null, frequency: '1/Life'},
      { id: 124, cost: 1, max: null, frequency: '1/Life'},
      { id: 134, cost: 1, max: null, frequency: '1/Life'},
      { id: 142, cost: 1, max: 1, frequency: 'Unlimited'},
    ]
  },
  {
    level: 2,
    spells: [
      { id: 46, cost: 1, max: null, frequency: '2/Refresh'},
      { id: 49, cost: 3, max: 1, frequency: null},
      { id: 76, cost: 2, max: null, frequency: '1/Refresh'},
      { id: 86, cost: 1, max: 4, frequency: '1/Refresh'},
      { id: 98, cost: 1, max: null, frequency: '1/Life'},
      { id: 140, cost: 1, max: 1, frequency: 'Unlimited'},
      { id: 147, cost: 1, max: 1, frequency: 'Unlimited'},
    ]
  },
  {
    level: 3,
    spells: [
      { id: 20, cost: 1, max: null, frequency: '1/Life'},
      { id: 15, cost: 1, max: 1, frequency: '1/Refresh'},
      { id: 31, cost: 1, max: 4, frequency: '1/Life'},
      { id: 58, cost: 1, max: 2, frequency: '1/Life'},
      { id: 51, cost: 2, max: 1, frequency: null},
      { id: 143, cost: 1, max: 1, frequency: 'Unlimited'},
    ]
  },
  {
    level: 4,
    spells: [
      { id: 5, cost: 1, max: 4, frequency: '1/Life'},
      { id: 175, cost: 3, max: 1, frequency: null},
      { id: 126, cost: 1, max: null, frequency: '1/Refresh'},
      { id: 136, cost: 1, max: null, frequency: '1/Refresh'},
      { id: 141, cost: 1, max: 1, frequency: 'Unlimited'},
      { id: 145, cost: 1, max: 1, frequency: 'Unlimited'},
      { id: 156, cost: 1, max: null, frequency: '1/Refresh'},
      { id: 159, cost: 1, max: 2, frequency: '1/Life'},
      { id: 161, cost: 1, max: null, frequency: '1/Refresh'},
    ]
  },
  {
    level: 5,
    spells: [
      { id: 8, cost: 1, max: null, frequency: '1/Refresh'},
      { id: 6, cost: 1, max: 2, frequency: '1/Life'},
      { id: 42, cost: 1, max: 1, frequency: '1/Refresh'},
      { id: 50, cost: 3, max: 1, frequency: null},
      { id: 77, cost: 1, max: null, frequency: '1/Refresh'},
      { id: 93, cost: 1, max: null, frequency: '1/Life'},
      { id: 146, cost: 1, max: 1, frequency: 'Unlimited'},
    ]
  },
  {
    level: 6,
    spells: [
      { id: 29, cost: 2, max: 1, frequency: null},
      { id: 40, cost: 2, max: 1, frequency: null},
      { id: 49, cost: 2, max: 1, frequency: null},
      { id: 91, cost: 1, max: 1, frequency: null},
      { id: 135, cost: 1, max: null, frequency: '1/Refresh'},
      { id: 144, cost: 1, max: 1, frequency: '1/Refresh Charge x5'},
      { id: 148, cost: 1, max: null, frequency: '1/Refresh'},
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
