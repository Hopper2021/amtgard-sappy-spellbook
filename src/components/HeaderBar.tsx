import { Dropdown } from 'react-bootstrap'
import { Navbar, Container } from 'react-bootstrap'

function HeaderBar() {
  const currentSetting = localStorage.getItem('enableTips')

  const changeTipsSettings = () => {
    if (currentSetting === 'true') {
      localStorage.setItem('enableTips', 'false')
    } else {
      localStorage.setItem('enableTips', 'true')
    }

    window.location.reload()
  }

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Swiftgard</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
          <Dropdown drop="start">
            <Dropdown.Toggle bsPrefix="custom-dropdown-toggle">
              <span className="text-white" style={{ fontSize: '24px', lineHeight: '1' }}>⋮</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>Patch Notes</Dropdown.Item>
              <Dropdown.Item onClick={() => changeTipsSettings()}>
                {currentSetting === 'true' ? 'Disable' : 'Enable'} Tips
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

// points dropped to a lower level when refunded to the highest level, leaves teh current level without points

export default HeaderBar
