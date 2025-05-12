import React from 'react'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

function CreateSpellList() {
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
								<Dropdown.Item onClick={() => console.log(1)}>1</Dropdown.Item>
								<Dropdown.Item onClick={() => console.log(2)}>2</Dropdown.Item>
								<Dropdown.Item onClick={() => console.log(3)}>3</Dropdown.Item>
								<Dropdown.Item onClick={() => console.log(4)}>4</Dropdown.Item>
								<Dropdown.Item onClick={() => console.log(5)}>5</Dropdown.Item>
								<Dropdown.Item onClick={() => console.log(6)}>6</Dropdown.Item>
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
					<Dropdown.Toggle style={{ backgroundColor: 'transparent', color: 'black', border: 'none', borderBottom: '1px solid black', borderRadius: 0 }} id="dropdown-basic">
						Bard
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={() => console.log('Bard')}>Bard</Dropdown.Item>
						<Dropdown.Item onClick={() => console.log('Druid')}>Druid</Dropdown.Item>
						<Dropdown.Item onClick={() => console.log('Healer')}>Healer</Dropdown.Item>
						<Dropdown.Item onClick={() => console.log('Wizard')}>Wizard</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Checkbox className="pr-10" aria-label="Checkbox for following text input" />
        <InputGroup.Text style={{ backgroundColor: 'transparent', border: 'none', paddingRight: 5 }}> Look The Part</InputGroup.Text>
        <Form.Control style={{ backgroundColor: 'transparent', border: 'none', paddingRight: 5 }} aria-label="Text input with checkbox" />
      </InputGroup>

      <Button className="w-100" variant="unknown" style={{ backgroundColor: "lightgrey" }}>CREATE</Button>
    </Container>
  )
}

export default CreateSpellList
