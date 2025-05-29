import React, { useState } from 'react'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useNavigate } from 'react-router-dom'
import {
	ANTIPALADIN_LIST,
	ARCHER_LIST,
	ASSASSIN_LIST,
	BARBARIAN_LIST,
	MONK_LIST,
	PALADIN_LIST,
	SCOUT_LIST,
	WARRIOR_LIST,
} from '../appConstants'

interface SpellList {
	id: number
	name: string
	class: string
	maxLevel: number
	lookThePart: boolean
	spells: any[]
}

function CreateSpellList() {
	const navigate = useNavigate()
	if (localStorage.getItem('allSpellLists') === null) {
		localStorage.setItem('allSpellLists', JSON.stringify([]))
	}
	const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')

	const generateNewId = () => {
		const maxId = allSpellLists.reduce((max, spellList) => Math.max(max, spellList.id), 0)
		return maxId + 1
	}
	
	const [newSpellList, setNewSpellList] = useState<SpellList>({
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
								<Dropdown.Item onClick={() => {
									setNewSpellList({ ...newSpellList, class: 'Bard', spells: [{ level: 1, points: 5, spells: [] }] })
								}}>Bard</Dropdown.Item>
								<Dropdown.Item onClick={() => {
									setNewSpellList({ ...newSpellList, class: 'Druid', spells: [{ level: 1, points: 5, spells: [] }] })}}>
										Druid</Dropdown.Item>
								<Dropdown.Item onClick={() => {
									setNewSpellList({ ...newSpellList, class: 'Healer', spells: [{ level: 1, points: 5, spells: [] }] })}}>
										Healer</Dropdown.Item>
								<Dropdown.Item onClick={() => {
									setNewSpellList({ ...newSpellList, class: 'Wizard', spells: [{ level: 1, points: 5, spells: [] }] })}}>
										Wizard</Dropdown.Item>
								<Dropdown.Item onClick={() => {
									setNewSpellList({ ...newSpellList, class: 'Anti-Paladin', spells: ANTIPALADIN_LIST });
								}}>Anti-Paladin</Dropdown.Item>
								<Dropdown.Item onClick={() => {
									setNewSpellList({ ...newSpellList, class: 'Archer', spells: ARCHER_LIST });
								}}>Archer</Dropdown.Item>
								<Dropdown.Item onClick={() => {
									setNewSpellList({ ...newSpellList, class: 'Assassin', spells: ASSASSIN_LIST });
								}}>Assassin</Dropdown.Item>
								<Dropdown.Item onClick={() => {
									setNewSpellList({ ...newSpellList, class: 'Barbarian', spells: BARBARIAN_LIST });
								}}>Barbarian</Dropdown.Item>
								<Dropdown.Item onClick={() => {
									setNewSpellList({ ...newSpellList, class: 'Monk', spells: MONK_LIST });
								}}>Monk</Dropdown.Item>
								<Dropdown.Item onClick={() => {
									setNewSpellList({ ...newSpellList, class: 'Paladin', spells: PALADIN_LIST });
								}}>Paladin</Dropdown.Item>
								<Dropdown.Item onClick={() => {
									setNewSpellList({ ...newSpellList, class: 'Scout', spells: SCOUT_LIST });
								}}>Scout</Dropdown.Item>
								<Dropdown.Item onClick={() => {
									setNewSpellList({ ...newSpellList, class: 'Warrior', spells: WARRIOR_LIST });
								}}>Warrior</Dropdown.Item>
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
												setNewSpellList({ ...newSpellList, maxLevel: level })
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
								setNewSpellList({
									...newSpellList,
									lookThePart: true,
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
