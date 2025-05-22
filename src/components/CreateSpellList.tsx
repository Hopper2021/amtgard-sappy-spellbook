import React from 'react'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useNavigate } from 'react-router-dom'

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

function CreateSpellList() {
	const navigate = useNavigate()

	if (localStorage.getItem('allSpellLists') === null) {
		localStorage.setItem('allSpellLists', JSON.stringify([]))
	}

	const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')

	const generateNewId = () => {
		const maxId = allSpellLists.reduce((max, spellList) => Math.max(max, spellList.id), 0)
		console.log('maxId', maxId + 1)
		return maxId + 1
	}

	const [newSpellList, setNewSpellList] = React.useState<SpellList>({
		id: generateNewId(),
		name: 'My SpellBook',
		class: 'Bard',
		maxLevel: 1,
		lookThePart: false,
		spells: [{ level: 1, points: 5, spells: [] }],
	})

	return (
		<Container fluid className="p-4" style={{ maxWidth: 600 }}>
			<InputGroup className="mb-4 w-100">
				<InputGroup.Text>
					Name:
				</InputGroup.Text>
				<Form.Control
					placeholder="My SpellBook"
					aria-label="My SpellBook"
					onChange={(event) => setNewSpellList({...newSpellList, name: event.target.value })}
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
									backgroundColor: 'white',
								}}
							>
								{newSpellList.class}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item onClick={() => setNewSpellList({ ...newSpellList, class: 'Bard' })}>Bard</Dropdown.Item>
								<Dropdown.Item onClick={() => setNewSpellList({ ...newSpellList, class: 'Druid' })}>Druid</Dropdown.Item>
								<Dropdown.Item onClick={() => setNewSpellList({ ...newSpellList, class: 'Healer' })}>Healer</Dropdown.Item>
								<Dropdown.Item onClick={() => setNewSpellList({ ...newSpellList, class: 'Wizard' })}>Wizard</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</InputGroup>
				</Col>

				<Col xs={5} md={6}>
					<InputGroup className="w-100">
						<InputGroup.Text>Level:</InputGroup.Text>
						<Dropdown className="w-100">
							<Dropdown.Toggle
								variant="outline-secondary"
								style={{
									borderColor: 'lightgrey',
									borderWidth: 1,
									color: 'black',
								}}
							>
								{newSpellList.maxLevel}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								{[...Array(6)].map((_, index) => {
									const level = index + 1
									return (
										<Dropdown.Item
											key={level}
											onClick={() => {
												const updatedSpells = Array.from({ length: level }, (_, index) => ({
													level: index + 1,
													points: newSpellList.lookThePart && index + 1 === level ? 6 : 5,
													spells: [],
												}))
												setNewSpellList({ ...newSpellList, maxLevel: level, spells: updatedSpells })
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
			
			<Row className="mb-3 align-items-center flex-wrap">
				
				<Col xs={12} md={7} className="mb-2 mb-md-0">
					<InputGroup className="border-color-primary w-100">
						<InputGroup.Text>
							Version:
						</InputGroup.Text>
						<Dropdown>
							<Dropdown.Toggle variant="outline-secondary" style={{ borderColor: 'lightgrey', borderWidth: 1, color: 'black' }}>
								V8.6.3 "Sappy Three"
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item>- V8.6.3 "Sappy Three"</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</InputGroup>
				</Col>

				<Col xs={12} md={5}>
					<InputGroup className="mb-3 ms-4 mt-3" style={{ cursor: 'pointer' }}>
						<Form.Check
							id="lookThePartCheckbox"
							type="checkbox"
							style={{
								padding: 2,
								borderRadius: 6,
							}}
							checked={newSpellList.lookThePart}
							onChange={() => {
								const updatedSpells = newSpellList.spells.map((spell) =>
									spell.level === newSpellList.maxLevel
										? { ...spell, points: newSpellList.lookThePart ? 5 : 6 }
										: spell
								)
								setNewSpellList({
									...newSpellList,
									lookThePart: !newSpellList.lookThePart,
									spells: updatedSpells,
								})
							}}
							label={
								<span
									style={{
										cursor: 'pointer',
									}}
								>
									Look The Part
								</span>
							}
						/>
					</InputGroup>
				</Col>
			</Row>

			<Button
				className="w-100"
				variant="primary"
				onClick={() => {
					const updatedAllSpellLists = [...allSpellLists, newSpellList]
					localStorage.setItem('allSpellLists', JSON.stringify(updatedAllSpellLists))
					navigate('/')
				}}>
				CREATE
			</Button>
		</Container>
	)
}

export default CreateSpellList
