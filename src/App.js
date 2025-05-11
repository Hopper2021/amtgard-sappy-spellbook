import './App.css'
import Header from '../src/components/HeaderBar.tsx'
import FloatingActionButton from './components/FloatingActionButton.tsx'
import { Container, Row, Col } from 'react-bootstrap'

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
      id: 1,
      name: 'Test Bard List',
      class: 'Bard',
      maxLevel: 3,
      spells: []
    },
    {
      id: 1,
      name: 'Test Druid List',
      class: 'Druid',
      maxLevel: 4,
      spells: []
    },
  ]

  return (
    <>
      <Header />
      <Container fluid className="p-3">
          <h6>Spell Books</h6>
          <Container className="px-4 pt-1">
            {mockSpellListArray.map((spellList) => (
              <Row key={spellList.id} className="border-bottom mb-3">
                <Col className="p-1">{spellList.name} ( {spellList.class}, level {spellList.maxLevel} )</Col>
              </Row>
            ))}
          </Container>
      </Container>
      <FloatingActionButton />
    </>
  )
}

export default App
