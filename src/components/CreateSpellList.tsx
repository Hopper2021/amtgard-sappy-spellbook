import React, { useState } from 'react'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useNavigate } from 'react-router-dom'
import {
	CURRENT_AMTGARD_VERSION,
	CURRENT_AMTGARD_VERSION_NAME,
	ALL_CLASSES,
	CASTER_CLASSES,
	MARTIAL_CLASS_SPELL_LISTS,
	MARTIAL_CLASSES,
} from '../appConstants'

type SpellFrequency = {
  amount: number | null
  per: string | null
  charge: string | null
}

interface MartialSpell {
  id: number
  frequency: SpellFrequency
  trait: boolean
  extraordinary: boolean
  magical: boolean
  ambulant: boolean
  restricted: boolean
  chosen: boolean | null
  pickOne?: MartialSpell[]
}

interface SpellList {
  id: number
  version: string
  name: string
  class: string
  maxLevel: number
  lookThePart: boolean
  lookThePartSpells?: MartialSpell[]
  levels: any[]
}

const CreateSpellList = () => {
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
		version: CURRENT_AMTGARD_VERSION,
		name: 'My SpellBook',
		class: 'Bard',
		maxLevel: 6,
		lookThePart: false,
		lookThePartSpells: [],
		levels: [
			{ level: 1, points: 5, spells: [] },
			{ level: 2, points: 5, spells: [] },
			{ level: 3, points: 5, spells: [] },
			{ level: 4, points: 5, spells: [] },
			{ level: 5, points: 5, spells: [] },
			{ level: 6, points: 5, spells: [] },
		],
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
							{ALL_CLASSES.map(className => (
								<Dropdown.Item
									key={className}
									onClick={() => {
										if (CASTER_CLASSES.includes(className)) {
										const newLevels = Array.from({ length: newSpellList.maxLevel }, (_, index) => ({
											level: index + 1,
											points: newSpellList.lookThePart && index + 1 === newSpellList.maxLevel ? 6 : 5,
											spells: [],
										}))
										setNewSpellList({
											...newSpellList,
											class: className,
											levels: newLevels,
											lookThePartSpells: [],
										})
										} else {
										const classObj = MARTIAL_CLASS_SPELL_LISTS[className] || {}
										const newLevels = (classObj.levels || []).filter(
											(levelObj: any) => levelObj.level <= newSpellList.maxLevel
										)
										setNewSpellList({
											...newSpellList,
											class: className,
											levels: newLevels,
											lookThePartSpells: classObj.lookThePartSpells || [],
										})
										}
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
												if (MARTIAL_CLASSES.includes(newSpellList.class)) {
												const classObj = MARTIAL_CLASS_SPELL_LISTS[newSpellList.class] || {}
												const newLevels = (classObj.levels || []).filter(
													(levelObj: any) => levelObj.level <= level
												)
												setNewSpellList({
													...newSpellList,
													maxLevel: level,
													levels: newLevels,
													lookThePartSpells: classObj.lookThePartSpells || [],
												})
												} else {
												const newLevels = Array.from({ length: level }, (_, index) => ({
													level: index + 1,
													points: newSpellList.lookThePart && index + 1 === level ? 6 : 5,
													spells: [],
												}))
												setNewSpellList({
													...newSpellList,
													maxLevel: level,
													levels: newLevels,
													lookThePartSpells: [],
												})
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
						<Dropdown.Toggle
							variant="outline-secondary"
							style={{ borderColor: 'lightgrey', borderWidth: 1, color: 'black' }}
						>
							{CURRENT_AMTGARD_VERSION_NAME}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item
							active={newSpellList.version === CURRENT_AMTGARD_VERSION}
							onClick={() =>
								setNewSpellList({ ...newSpellList, version: CURRENT_AMTGARD_VERSION })}>
							{CURRENT_AMTGARD_VERSION_NAME}
							</Dropdown.Item>
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
								const updatedLevels = newSpellList.levels.map((level) => ({
								...level,
								points: nextLookThePart && level.level === newSpellList.maxLevel ? 6 : 5,
								}));
								if (MARTIAL_CLASSES.includes(newSpellList.class)) {
									setNewSpellList({ ...newSpellList, lookThePart: nextLookThePart });
								} else {
									setNewSpellList({ ...newSpellList, lookThePart: nextLookThePart, levels: updatedLevels });
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
