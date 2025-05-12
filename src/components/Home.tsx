import React from 'react'
import FloatingActionButton from './FloatingActionButton.tsx'
import { Container, Row, Button } from 'react-bootstrap'

function App() {
  const mockSpellListArray = [
    {
      id: 1,
      name: 'Test Healer List',
      class: 'Healer',
      maxLevel: 6,
      spells: []
    },
    {
      id: 2,
      name: 'Test Bard List',
      class: 'Bard',
      maxLevel: 3,
      spells: []
    },
    {
      id: 3,
      name: 'Test Druid List',
      class: 'Druid',
      maxLevel: 4,
      spells: []
    },
  ]

  return (
    <>
      <Container fluid className="p-3">
          <h6>Spell Books</h6>
          <Container className="px-4 pt-1">
            {mockSpellListArray.map((spellList) => (
              <Row key={spellList.id} className="border-bottom mb-3">
              <Button
                className="p-1 text-start w-100"
                variant="light"
                onClick={() => console.log(`Clicked on ${spellList.name}`)}
              >
                {spellList.name} ({spellList.class}, level {spellList.maxLevel})
              </Button>
              </Row>
            ))}
          </Container>
      </Container>
      <FloatingActionButton />
    </>
  )
}

export default App
