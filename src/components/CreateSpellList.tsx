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
	const martialClasses = [
		'Anti-Paladin',
		'Archer',
		'Assassin',
		'Barbarian',
		'Monk',
		'Paladin',
		'Scout',
		'Warrior'
	]

	const classSpellLists: Record<string, any[]> = {
		'Anti-Paladin': ANTIPALADIN_LIST,
		'Archer': ARCHER_LIST,
		'Assassin': ASSASSIN_LIST,
		'Barbarian': BARBARIAN_LIST,
		'Monk': MONK_LIST,
		'Paladin': PALADIN_LIST,
		'Scout': SCOUT_LIST,
		'Warrior': WARRIOR_LIST,
	}

	const casterClasses = ['Bard', 'Druid', 'Healer', 'Wizard']
	const allClasses = [
		...casterClasses,
		// 'Anti-Paladin',
		// 'Archer',
		// 'Assassin',
		// 'Barbarian',
		// 'Monk',
		// 'Paladin',
		// 'Scout',
		// 'Warrior'
	]

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
							{allClasses.map(className => (
								<Dropdown.Item
								key={className}
								onClick={() => {
									let newSpells;
									if (casterClasses.includes(className)) {
									newSpells = Array.from({ length: newSpellList.maxLevel }, (_, index) => ({
										level: index + 1,
										points: newSpellList.lookThePart && index + 1 === newSpellList.maxLevel ? 6 : 5,
										spells: [],
									}));
									} else {
									newSpells = (classSpellLists[className] || []).filter(
										(levelObj) => levelObj.level <= newSpellList.maxLevel
									);
									}
									setNewSpellList({ ...newSpellList, class: className, spells: newSpells });
								}}
								>
								{className}
								</Dropdown.Item>
							))}
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
											if (martialClasses.includes(newSpellList.class)) {
												const newSpells = (classSpellLists[newSpellList.class] || []).filter(
												(levelObj) => levelObj.level <= level
												);
												setNewSpellList({ ...newSpellList, maxLevel: level, spells: newSpells });
											} else {
												const newSpells = Array.from({ length: level }, (_, index) => ({
												level: index + 1,
												points: newSpellList.lookThePart && index + 1 === level ? 6 : 5,
												spells: [],
												}));
												setNewSpellList({ ...newSpellList, maxLevel: level, spells: newSpells });
											}
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
								const nextLookThePart = !newSpellList.lookThePart;
								const updatedSpells = newSpellList.spells.map((spell) => ({
									...spell,
									points: nextLookThePart && spell.level === newSpellList.maxLevel ? 6 : 5,
								}));
								if (martialClasses.includes(newSpellList.class)) {
									setNewSpellList({ ...newSpellList, lookThePart: nextLookThePart });
								} else {
									setNewSpellList({ ...newSpellList, lookThePart: nextLookThePart, spells: updatedSpells });
								}
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
