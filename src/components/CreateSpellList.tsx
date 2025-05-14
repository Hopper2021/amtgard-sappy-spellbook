import React from 'react'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useNavigate } from 'react-router-dom'

interface Spell {
	id: number
	name: string
	level: number
	description: string
}

interface SpellList {
	id: number
	name: string
	class: string
	maxLevel: number
	lookThePart: boolean
	spells: Spell[]
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
		spells: [],
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
							placeholder="My SpellBook"
							aria-label="My SpellBook"
							style={{
								backgroundColor: 'transparent',
								border: 'none',
								borderBottom: '1px solid black',
								borderRadius: 0,
							}}
							onChange={(event) =>
								setNewSpellList({...newSpellList, name: event.target.value })
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
								1
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item onClick={() => setNewSpellList({ ...newSpellList, maxLevel: 1 })}>1</Dropdown.Item>
								<Dropdown.Item onClick={() => setNewSpellList({ ...newSpellList, maxLevel: 2 })}>2</Dropdown.Item>
								<Dropdown.Item onClick={() => setNewSpellList({ ...newSpellList, maxLevel: 3 })}>3</Dropdown.Item>
								<Dropdown.Item onClick={() => setNewSpellList({ ...newSpellList, maxLevel: 4 })}>4</Dropdown.Item>
								<Dropdown.Item onClick={() => setNewSpellList({ ...newSpellList, maxLevel: 5 })}>5</Dropdown.Item>
								<Dropdown.Item onClick={() => setNewSpellList({ ...newSpellList, maxLevel: 6 })}>6</Dropdown.Item>
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
						Bard
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={() => setNewSpellList({ ...newSpellList, class: 'Bard' })}>Bard</Dropdown.Item>
						<Dropdown.Item onClick={() => setNewSpellList({ ...newSpellList, class: 'Druid' })}>Druid</Dropdown.Item>
						<Dropdown.Item onClick={() => setNewSpellList({ ...newSpellList, class: 'Healer' })}>Healer</Dropdown.Item>
						<Dropdown.Item onClick={() => setNewSpellList({ ...newSpellList, class: 'Wizard' })}>Wizard</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</InputGroup>

			<InputGroup className="mb-3">
				<Form.Check
					className="ml-2"
					type={'checkbox'}
					label={'Look The Part'}
					onClick={() =>
						setNewSpellList({
							...newSpellList,
							lookThePart: !newSpellList.lookThePart,
						})
					}
				/>
			</InputGroup>

			<Button
				className="w-100"
				variant="unknown"
				style={{ backgroundColor: 'lightgrey' }}
				onClick={() => {
					const updatedAllSpellLists = [...allSpellLists, newSpellList]
					localStorage.setItem('allSpellLists', JSON.stringify(updatedAllSpellLists))
					navigate('/')
				}}
			>
				CREATE
			</Button>
		</Container>
	)
}

export default CreateSpellList
