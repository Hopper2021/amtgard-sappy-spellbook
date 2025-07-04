import React, { useState } from 'react'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useNavigate, useParams } from 'react-router-dom'
import {
	CURRENT_AMTGARD_VERSION,
	CURRENT_AMTGARD_VERSION_NAME,
	ALL_CLASSES,
	CASTER_CLASSES,
	MARTIAL_CLASS_SPELL_LISTS,
	MARTIAL_CLASSES,
} from '../appConstants'
import Alert from 'react-bootstrap/Alert'
import { IoIosWarning } from 'react-icons/io'

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
	const [showClassAlert, setShowClassAlert] = useState(false)
	const [showLevelAlert, setShowLevelAlert] = useState(false)
  const { id } = useParams<{ id: string }>()
	const casterMessage = 
	  <>
			Changing your
			{showClassAlert && <strong> class </strong>}
			{showClassAlert && showLevelAlert && ' and '}
			{showLevelAlert && <strong> level </strong>}
			will completely reset your spell choices and points.
  </>

  const allSpellLists = JSON.parse(localStorage.getItem('allSpellLists') || '[]')
  const spellListToEdit = allSpellLists.find((list: SpellList) => list.id === parseInt(id || '0'))

	const [modifiedSpellList, setModifiedSpellList] = React.useState<SpellList>({
		id: parseInt(id || '0'),
		version: CURRENT_AMTGARD_VERSION,
		name: spellListToEdit?.name || 'My SpellBook',
		class: spellListToEdit?.class || 'Bard',
		maxLevel: spellListToEdit?.maxLevel || 1,
		lookThePart: spellListToEdit?.lookThePart || false,
		levels: spellListToEdit?.levels || [],
		lookThePartSpells: spellListToEdit?.lookThePartSpells || [],
	})

	const isMartialClass = MARTIAL_CLASSES.includes(modifiedSpellList.class)
	const isCasterClass = CASTER_CLASSES.includes(modifiedSpellList.class)

	// PART 3:
	// Switching between caster and martial classes swaps up spells array incorrectly
	// Martial class to caster results in empty spells ( no levels to add spells to )
	// Caster class to martial results in edit page with empty spell levels instead of preset martial list 
	// result is from function combination, see graph push for what changed
	const handleClassChange = (className: string) => {
		let newLevels: SpellLevel[] = []

		const casterLevels: SpellLevel[] = Array.from({ length: modifiedSpellList.maxLevel }, (_, index) => ({
			level: index + 1,
			points: modifiedSpellList.lookThePart && index + 1 === modifiedSpellList.maxLevel ? 6 : 5,
			spells: modifiedSpellList.levels[index]?.spells || [],
		}))
		const classObj = MARTIAL_CLASS_SPELL_LISTS[className] || {}
		const martialLevels: SpellLevel[] = (classObj.levels || []).filter(
			(levelObj: any) => levelObj.level <= modifiedSpellList.maxLevel
		)

		if (isCasterClass) {
			newLevels = casterLevels
		} else if (isMartialClass) {
			newLevels = martialLevels
		}

		setModifiedSpellList({
			...modifiedSpellList,
			class: className,
			levels: newLevels,
			lookThePartSpells: isMartialClass ? classObj.lookThePartSpells || [] : [],
		})
	}

	const handleLevelChange = (level: number) => {
		let newLevels: SpellLevel[] = []

		const casterLevels = Array.from({ length: level }, (_, index) => ({
			level: index + 1,
			points: modifiedSpellList.lookThePart && index + 1 === level ? 6 : 5,
			spells: [],
		}))
		const classObj = MARTIAL_CLASS_SPELL_LISTS[modifiedSpellList.class] || {}
		const martialLevels = (classObj.levels || []).filter(
			(levelObj: any) => levelObj.level <= level
		)

		if (isCasterClass) {
			newLevels = casterLevels
		} else if (isMartialClass) {
			newLevels = martialLevels
		}

		setModifiedSpellList({
			...modifiedSpellList,
			maxLevel: level,
			levels: newLevels,
			lookThePartSpells: isMartialClass ? classObj.lookThePartSpells || [] : [],
		})
	}

	const handleResetAlert = (className?: string, level?: number) => {
		if (className && className !== spellListToEdit.class) {
			setShowClassAlert(true)
		} else if (level && level !== spellListToEdit.maxLevel) {
			setShowLevelAlert(true)
		} else if (className === spellListToEdit.class) {
			setShowClassAlert(false)
		} else if (level === spellListToEdit.maxLevel) {
			setShowLevelAlert(false)
		}
	}

	const updateLocalStorage = () => {
		const updatedAllSpellLists = allSpellLists.map((list: SpellList) =>
			list.id === modifiedSpellList.id ? modifiedSpellList : list
		)
		localStorage.setItem('allSpellLists', JSON.stringify(updatedAllSpellLists))
		navigate('/')
	}

  return (
    <Container className="p-4" style={{ maxWidth: 600 }}>
			{(showClassAlert || showLevelAlert) && (
				<Alert
					show={showClassAlert || showLevelAlert}
					variant="warning"
					className="d-flex"
					dismissible
					onClose={() => [setShowClassAlert(false), setShowLevelAlert(false)]}
					>
					<IoIosWarning size={35} className="me-1" color="gold"/>
					<div className="d-flex flex-column">
						<span>{casterMessage}</span>
						<div
							className="end-0 bottom-0 text-muted small mt-1"
							style={{ pointerEvents: 'none' }}
						>
						</div>
					</div>
				</Alert>
			)}
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
							<Dropdown.Toggle disabled
								style={{
									borderColor: 'grey',
									borderWidth: 1,
									color: 'black',
									backgroundColor: 'grey',
								}}
							>
								{modifiedSpellList.class}
							</Dropdown.Toggle>
							<Dropdown.Menu>
							{ALL_CLASSES.map(className => (
								<Dropdown.Item
									key={className}
									onClick={() => {
										handleResetAlert(className, undefined)
										handleClassChange(className)
									}}
								>
									{className}
								</Dropdown.Item>
							))}
							</Dropdown.Menu>
						</Dropdown>
					</InputGroup>
				</Col>

				<Col className="ps-0">
					<InputGroup>
						<InputGroup.Text>Level:</InputGroup.Text>
						<Dropdown>
							<Dropdown.Toggle
								style={{
									borderColor: 'lightgrey',
									borderWidth: 1,
									color: 'black',
									backgroundColor: 'white', 
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
												handleResetAlert(undefined, level)
												handleLevelChange(level)
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
							<Dropdown.Toggle
								style={{
									borderColor: 'lightgrey',
									borderWidth: 1,
									color: 'black',
									backgroundColor: 'white', 
								}}
							>
								{CURRENT_AMTGARD_VERSION_NAME}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item>{CURRENT_AMTGARD_VERSION_NAME}</Dropdown.Item>
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
				disabled={spellListToEdit.version === undefined}
				variant={spellListToEdit.version === undefined ? 'secondary' : 'primary'}
				onClick={() => updateLocalStorage()}
			>
				{spellListToEdit.version === undefined ? 'VERSION OUT OF DATE' : 'Update'}
			</Button>
    </Container>
  )
}

export default ModifySpellList