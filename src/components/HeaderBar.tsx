import { Dropdown } from 'react-bootstrap'
import React from 'react'
import { Navbar, Container } from 'react-bootstrap'

function HeaderBar() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="home">Sappy SpellBook</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
          <Dropdown drop="start">
            <Dropdown.Toggle bsPrefix="custom-dropdown-toggle">
              <span className="text-white" style={{ fontSize: '24px', lineHeight: '1' }}>⋮</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>Settings</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default HeaderBar
