import React from 'react'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
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

function ModifySpellList() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>() // Grab the id from the URL

  const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')
  const spellListToEdit = allSpellLists.find((list: SpellList) => list.id === parseInt(id || '0'))

  const [modifiedSpellList, setModifiedSpellList] = React.useState<SpellList>({
		id: parseInt(id || '0'),
		name: spellListToEdit?.name || 'My SpellBook',
		class: spellListToEdit?.class || 'Bard',
		maxLevel: spellListToEdit?.maxLevel || 1,
		lookThePart: spellListToEdit?.lookThePart || false,
		spells: spellListToEdit?.spells || [],
  })

  return (
    <Container fluid className="p-2">
			<Row className="align-items-center">
				<Col xs={7}>
					<InputGroup style={{ border: 'none' }} className="mb-3">
						<InputGroup.Text style={{ backgroundColor: 'transparent', border: 'none', paddingRight: 5 }}>
							Name:
						</InputGroup.Text>
						<Form.Control
							placeholder="Spell List Name"
							value={modifiedSpellList.name}
							aria-label="My SpellBook"
							style={{
								backgroundColor: 'transparent',
								border: 'none',
								borderBottom: '1px solid black',
								borderRadius: 0,
							}}
							onChange={(event) =>
								setModifiedSpellList({...modifiedSpellList, name: event.target.value })
							}
						/>
					</InputGroup>
				</Col>

				<Col>
					<InputGroup className="mb-3">
						<InputGroup.Text style={{ backgroundColor: 'transparent', border: 'none', paddingRight: 5 }}>
							Level:
						</InputGroup.Text>
						<Dropdown>
							<Dropdown.Toggle
								style={{
									backgroundColor: 'white',
									color: 'black',
									border: 'none',
									paddingRight: 5,
									borderBottom: '1px solid black',
									borderRadius: 0,
								}}
								id="dropdown-basic"
							>
								{modifiedSpellList.maxLevel}
							</Dropdown.Toggle>

							<Dropdown.Menu>
								{[...Array(6)].map((_, index) => {
									const level = index + 1  // Levels 1 through 6
									return (
										<Dropdown.Item
											key={level}
											onClick={() => {
												const updatedSpells = Array.from({ length: level }, (_, index) => ({
													level: index + 1,
													points: modifiedSpellList.lookThePart && index + 1 === level ? 6 : 5,
													spells: [],
												}))
												setModifiedSpellList({ ...modifiedSpellList, maxLevel: level, spells: updatedSpells })
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

			<InputGroup className="mb-3">
				<InputGroup.Text style={{ backgroundColor: 'transparent', border: 'none', paddingRight: 5 }}>
					Class:
				</InputGroup.Text>
				<Dropdown>
					<Dropdown.Toggle
						style={{
							backgroundColor: 'transparent',
							color: 'black',
							border: 'none',
							borderBottom: '1px solid black',
							borderRadius: 0,
						}}
						id="dropdown-basic"
					>
						{modifiedSpellList.class}
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={() => setModifiedSpellList({ ...modifiedSpellList, class: 'Bard' })}>Bard</Dropdown.Item>
						{/* <Dropdown.Item onClick={() => setModifiedSpellList({ ...modifiedSpellList, class: 'Druid' })}>Druid</Dropdown.Item> */}
						<Dropdown.Item onClick={() => setModifiedSpellList({ ...modifiedSpellList, class: 'Healer' })}>Healer</Dropdown.Item>
						<Dropdown.Item onClick={() => setModifiedSpellList({ ...modifiedSpellList, class: 'Wizard' })}>Wizard</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</InputGroup>

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

			<Button
				className="w-100"
				variant="unknown"
				style={{ backgroundColor: 'lightgrey' }}
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