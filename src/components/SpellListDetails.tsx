import React from 'react'
import { Container, Row, Button, Col, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { ALL_SPELLS } from '../appConstants'

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
  const { id } = useParams<{ id: string }>()
  const [showTypeAndSchool, setShowTypeAndSchool] = React.useState(false)
  const [showIncantation, setShowIncantation] = React.useState(false)
  const [showStrips, setShowStrips] = React.useState(false)

  const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')
  // const spellList = allSpellLists.find((list: SpellList) => list.id === parseInt(id || '0'))

  // console.log('spellList', spellList)

  const fetchSpellDetails = (key: string, spellId: number) => {
    const spell = ALL_SPELLS.find(spell => spell.id === spellId)

    console.log('spell', spell)
    console.log('key', key)

    if (key === 'name') {
      return spell?.name
    } else if (key === 'incantation') {
      return spell?.incantation
    } else if (key === 'type') {
      return spell?.type
    } else if (key === 'school') {
      return spell?.school
    } else if (key === 'strips') {
      return spell?.strips
    }  else if (key === 'description') {
      return spell?.description
    } else if (key === 'level') {
      return spell?.level
    } else if (key === 'points') {
      return spell?.points
    } else if (key === 'purchased') {
      return spell?.purchased
    } else if (key === 'materials') {
      return spell?.materials
    }
  }

  const spellList = {
    id: 1,
    name: 'Mock Spell list',
    class: 'Bard',
    maxLevel: 6,
    lookThePart: true,
    spells: [
      {
          level: 1,
          points: 5,
          spells: [{ id: 1, purchased: 1 }, { id: 2, purchased: 2 }, { id: 3, purchased: 3 }],
      },
      {
          level: 2,
          points: 5,
          spells: [{ id: 4, purchased: 1 }, { id: 5, purchased: 2 }, { id: 6, purchased: 3 }],
      },
      {
          level: 3,
          points: 3,
          spells: [{ id: 7, purchased: 1 }, { id: 8, purchased: 2 }, { id: 9, purchased: 3 }],
      },
      {
          level: 4,
          points: 5,
          spells: [{ id: 10, purchased: 1 }, { id: 11, purchased: 2 }, { id: 12, purchased: 3 }],
      },
      {
          level: 5,
          points: 5,
          spells: [{ id: 13, purchased: 1 }, { id: 14, purchased: 2 }, { id: 15, purchased: 3 }],
      },
      {
          level: 6,
          points: 6,
          spells: [{ id: 16, purchased: 1 }, { id: 17, purchased: 2 }, { id: 18, purchased: 3 }],
      }
    ]
  }

  return (
    <Container className="pt-3 mb-4">
      <Row className="d-flex">
        <Col xs="auto" className="pr-0">
          <h4>Overview</h4>
        </Col>
        <Col className="flex-grow-1">
          {[
            {
              id: "typeAndSchoolCheckbox",
              label: "show type/school",
              checked: showTypeAndSchool,
              onClick: () => setShowTypeAndSchool(!showTypeAndSchool),
            },
            {
              id: "incantationCheckbox",
              label: "show incantation",
              checked: showIncantation,
              onClick: () => setShowIncantation(!showIncantation),
            },
            {
              id: "stripsCheckbox",
              label: "show strips",
              checked: showStrips,
              onClick: () => setShowStrips(!showStrips),
            },
          ].map((item) => (
            <Form.Check
              key={item.id}
              type="checkbox"
              id={item.id}
              label={
                <label
                  htmlFor={item.id}
                  style={{ cursor: 'pointer', display: 'inline-block' }}
                >
                  {item.label}
                </label>
              }
              defaultChecked={item.checked}
              onClick={item.onClick}
            />
          ))}
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
        <div>
          {spellList.spells.map((level: SpellLevel, index) =>
            level.points === 0 ? null : (
              <Form.Text
                key={index}
                className="me-3">
                  L{level.level}: {level.points},
              </Form.Text> // When points are 0 for a level, do not show this Form Text. When All points are spent in all levels, show "All points spent".
            )
          )}
        </div>
        <Form.Text>**** Spells ****</Form.Text>
        {spellList.spells.map((level, levelIdx) => (
          <React.Fragment key={levelIdx}>
            <Form.Text className="fw-bold mb-0">{`Level ${level.level}`}</Form.Text>
            {level.spells.map((spell, spellIdx) => (
              <Row key={spellIdx} className="m-0">
                <div>
                  {spell.purchased}x {fetchSpellDetails('name', spell.id) || 'Unknown Spell'}{' '}
                  {showTypeAndSchool && <span>( {fetchSpellDetails('type', spell.id)} )</span>}
                  {fetchSpellDetails('school', spell.id) && showTypeAndSchool && (
                    <span>( {fetchSpellDetails('school', spell.id)} )</span>
                  )}
                  <div className="m-0">
                    {showIncantation && <span>{fetchSpellDetails('incantation', spell.id)}</span>}
                  </div>
                  <div className="m-0">
                    {showIncantation && <span>{fetchSpellDetails('materials', spell.id)}</span>}
                    {/* Consider revisiting how this looks. Magic balls have the ball displayed twice in two places. Maybe remove Green Magic Ball from materials? */}
                  </div>
                </div>
              </Row>
            ))}
          </React.Fragment>
        ))}
      </Row>
    </Container>
  )
}

export default SpellListDetails
