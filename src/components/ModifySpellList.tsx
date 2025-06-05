import React from 'react'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useNavigate, useParams } from 'react-router-dom'
import { CURRENT_VERSION, CURRENT_VERSION_NAME } from '../appConstants'

interface SpellLevel {
	level: number
	points: number
	spells: any[]
}

interface SpellList {
  id: number
  version: string
  name: string
  class: string
  maxLevel: number
  lookThePart: boolean
  levels: SpellLevel[]
  lookThePartSpells?: any[]
}

function ModifySpellList() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>() // Grab the id from the URL

  const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')
  const spellListToEdit = allSpellLists.find((list: SpellList) => list.id === parseInt(id || '0'))

	const [modifiedSpellList, setModifiedSpellList] = React.useState<SpellList>({
		id: parseInt(id || '0'),
		version: CURRENT_VERSION,
		name: spellListToEdit?.name || 'My SpellBook',
		class: spellListToEdit?.class || 'Bard',
		maxLevel: spellListToEdit?.maxLevel || 1,
		lookThePart: spellListToEdit?.lookThePart || false,
		levels: spellListToEdit?.levels || [],
		lookThePartSpells: spellListToEdit?.lookThePartSpells || [],
	})

  return (
    <Container fluid className="p-4" style={{ maxWidth: 600 }}>
			<InputGroup className="mb-4 w-100">
				<InputGroup.Text>
					Name:
				</InputGroup.Text>
				<Form.Control
					value={modifiedSpellList.name}
					placeholder="My SpellBook"
					aria-label="My SpellBook"
					onChange={(event) =>
						setModifiedSpellList({...modifiedSpellList, name: event.target.value })
					}
				/>
			</InputGroup>

			<Row className="mb-4 align-items-center flex-wrap">

				<Col xs={7} md={6} className="mb-0 align-items-center">
					<InputGroup>
						<InputGroup.Text>Class:</InputGroup.Text>
						<Dropdown>
							<Dropdown.Toggle
								style={{
									borderColor: 'lightgrey',
									borderWidth: 1,
									color: 'black',
									backgroundColor: 'lightgrey',
								}}
								disabled
							>
								{modifiedSpellList.class}
							</Dropdown.Toggle>
						</Dropdown>
					</InputGroup>
				</Col>

				<Col xs={5} md={6}>
					<InputGroup className="w-100">
						<InputGroup.Text>Level:</InputGroup.Text>
						<Dropdown className="w-100">
							<Dropdown.Toggle
								disabled
								variant="outline-secondary"
								style={{
									borderColor: 'lightgrey',
									borderWidth: 1,
									color: 'black',
									backgroundColor: 'lightgrey',
								}}
							>
								{modifiedSpellList.maxLevel}
							</Dropdown.Toggle>

							<Dropdown.Menu>
								{[...Array(6)].map((_, index) => {
									const level = index + 1
									return (
										<Dropdown.Item
											key={level}
											onClick={() => {
											const updatedLevels = Array.from({ length: level }, (_, index) => ({
												level: index + 1,
												points: modifiedSpellList.lookThePart && index + 1 === level ? 6 : 5,
												spells: [],
											}))
											setModifiedSpellList({ ...modifiedSpellList, maxLevel: level, levels: updatedLevels })
											}}
										>
											{level}
										</Dropdown.Item>
									)
								})}
							</Dropdown.Menu>
						</Dropdown>
					</InputGroup>
				</Col>

			</Row>

			<Row className="mb-4 align-items-center flex-wrap">

				<Col xs={12} md={7} className="mb-2 mb-md-0">
					<InputGroup className="border-color-primary w-100">
						<InputGroup.Text>
							Version:
						</InputGroup.Text>
						<Dropdown>
							<Dropdown.Toggle disabled variant="outline-secondary" style={{ borderColor: 'lightgrey',
									borderWidth: 1,
									color: 'black',
									backgroundColor: 'lightgrey', }}>
								{CURRENT_VERSION_NAME}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item>{CURRENT_VERSION_NAME}</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</InputGroup>
				</Col>

				<Col xs={12} md={5}>
					<Form.Check
						className="m-3"
						type={'checkbox'}
						id="lookThePartCheckbox"
						label={
							<label
								htmlFor="lookThePartCheckbox"
								style={{ cursor: 'pointer', display: 'inline-block', marginLeft: '5px' }}
							>
								Look The Part
							</label>
						}
						checked={modifiedSpellList.lookThePart}
						onChange={() =>
							setModifiedSpellList({
								...modifiedSpellList,
								lookThePart: !modifiedSpellList.lookThePart,
							})
						}
					/>
					</Col>
				</Row>

			<Button
				className="w-100"
				variant="primary"
				onClick={() => {
					const updatedAllSpellLists = allSpellLists.map((list: SpellList) =>
						list.id === modifiedSpellList.id ? modifiedSpellList : list
					)
					localStorage.setItem('allSpellLists', JSON.stringify(updatedAllSpellLists))
					navigate('/')
				}}
			>
				UPDATE
			</Button>
    </Container>
  )
}

export default ModifySpellList