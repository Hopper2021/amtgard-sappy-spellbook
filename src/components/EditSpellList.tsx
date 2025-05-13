import React from 'react'
import { Container, Row, Accordion, Button } from 'react-bootstrap'
import { ALL_SPELLS, BARD_SPELLS } from '../appConstants'

function EditSpellList() {
  // TODO: Add Remove button and update state
  // Spell list will change to only show the spells in the local storage list and clicking them will remove them instead
  const [addOrRemoveSpells, setAddOrRemoveSpells] = React.useState('Add')

  // TODO: This should be taken from local storage
  // On Create page, this object will be set
  // On This edit page, this object should be updated every time a spell is added or removed
  // This should minimize data loss
  const mockSpellList = {
    id: 1,
    name: 'Test Bard List',
    class: 'Bard',
    maxLevel: 6,
    lookThePart: true,
    spellsByLevel: [
      { level: 1, points: 5, spells: [ { id: 52, purchased: 1 }] },
      { level: 2, points: 5, spells: [ { id: 46, purchased: 1 }] },
      { level: 3, points: 5, spells: [ { id: 20, purchased: 1 }] },
      { level: 4, points: 5, spells: [ { id: 5, purchased: 1 }] },
      { level: 5, points: 5, spells: [ { id: 8, purchased: 1 }] },
      { level: 6, points: 6, spells: [ { id: 29, purchased: 1 }] },
    ]
  }

  const getSpellDetails = (spellId: number) => {
    const spell = ALL_SPELLS.find(spell => spell.id === spellId)
    if (spell) {
      return spell.name
    }
    return null
  }

  const calculateLevelPointsAvailable = (level: number) => {
    const listLevel = mockSpellList.spellsByLevel.find(listLevel => listLevel.level === level)
    if (listLevel) {
      return listLevel.points
    }
    return null
  }

  const calculateTrickleDownPointsAvailable = (level: number) => {
    const levelsToSum = mockSpellList.spellsByLevel.filter((listLevel) => listLevel.level >= level)
    const totalPoints = levelsToSum.reduce((sum, listLevel) => sum + listLevel.points, 0)

    return totalPoints
  }

  const getAmountPurchased = (spellId) => {
    for (const level of mockSpellList.spellsByLevel) {
      const spell = level.spells.find((spell) => spell.id === spellId)
      if (spell) {
        return `x${spell.purchased}`
      }
    }
    return ''
  }

  const calculateAmountPurchased = (spellId) => {
    for (const level of mockSpellList.spellsByLevel) {
      const spell = level.spells.find((spell) => spell.id === spellId)
      if (spell && addOrRemoveSpells === 'Add') {
        return `x${spell.purchased + 1}`
        // TO DO: Plan is to update the local storage every time a spell is added or removed
        // Not sure if this can be done in local state. Might lose data if you navigate away
      }
    }
    return ''
  }

  console.log('mockSpellList', mockSpellList)

  return (
    <Container fluid className="p-3">
        <h6>Edit {mockSpellList.class} Spells</h6>
        <Container>
          {BARD_SPELLS.map((level) => (
            <Accordion defaultActiveKey="1" flush>
              <Accordion.Item eventKey="0" className="border-bottom">
                <Accordion.Header>
                  Level {level.level}  ({calculateLevelPointsAvailable(level.level)}) available: {calculateTrickleDownPointsAvailable(level.level)}
                </Accordion.Header>
                <Accordion.Body>
                  {level.spells.map((spellsByLevel) => (
                    <Row className="d-flex justify-content-between">
                      <Button
                        variant="unknown"
                        className="text-start border-bottom"
                        onClick={() => calculateAmountPurchased(spellsByLevel.id)}
                      >
                        {getSpellDetails(spellsByLevel.id)} {getAmountPurchased(spellsByLevel.id)} (cost: {spellsByLevel.cost})
                      </Button>
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
