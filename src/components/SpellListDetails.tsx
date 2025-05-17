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
  const spellList = allSpellLists.find((list: SpellList) => list.id === parseInt(id || '0'))

  const fetchSpellDetails = (key: string, spellId: number) => {
    const spell = ALL_SPELLS.find(spell => spell.id === spellId)

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
            onClick={() => navigate(`/editList/${spellList.id}`)}>
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
              </Form.Text>
            )
          )}
        </div>
        <Form.Text>**** Spells ****</Form.Text>
        {spellList.spells.map((level, levelIdx) => (
          <React.Fragment key={levelIdx}>
            <Form.Text className="fw-bold mb-0">{`Level ${level.level}`}</Form.Text>
            {level.spells.map((spell, spellIdx) => {
              const spellName = fetchSpellDetails('name', spell.id) || 'Unknown Spell';
              const spellType = fetchSpellDetails('type', spell.id);
              const spellSchool = fetchSpellDetails('school', spell.id);
              const spellIncantation = fetchSpellDetails('incantation', spell.id);
              const spellMaterials = fetchSpellDetails('materials', spell.id);

              return (
                <Row key={spellIdx} className="m-0">
                  <div>
                    {spell.purchased}x{' '}
                    <span style={{ textDecoration: 'underline' }}>
                      {spellName}
                    </span>{' '}
                    {showTypeAndSchool && <span>( {spellType} )</span>}
                    {spellSchool && showTypeAndSchool && (
                      <span>( {spellSchool} )</span>
                    )}
                    <div style={{ marginLeft: '15px' }}>
                      {showIncantation && <span style={{ fontStyle: 'italic' }}>{spellIncantation}</span>}
                    </div>
                    <div className="m-0">
                      {showStrips && spellMaterials
                        ? (<span>( {spellMaterials} )</span>)
                        : null}
                    </div>
                  </div>
                </Row>
              );
            })}
          </React.Fragment>
        ))}
      </Row>
    </Container>
  )
}

export default SpellListDetails
