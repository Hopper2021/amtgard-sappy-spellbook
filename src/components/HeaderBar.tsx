import { Dropdown } from 'react-bootstrap'
import { Navbar, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { IoEllipsisVertical } from "react-icons/io5"

function HeaderBar() {
  const navigate = useNavigate()
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
      <Navbar className="d-flex justify-content-between align-items-end pt-2" bg="primary" variant="dark">
        <Container
          fluid
          className="align-items-end"
        >
            <Navbar.Brand href="/" className="mb-2 ms-2">Swiftgard</Navbar.Brand>
            <Dropdown drop="start" className="mt-auto mb-2">
              <Dropdown.Toggle bsPrefix="custom-dropdown-toggle">
                <IoEllipsisVertical size={25} className="me-0" color="white"/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/patchNotes')}>Download App</Dropdown.Item>
                <Dropdown.Item onClick={() => changeTipsSettings()}>
                  {currentSetting === 'true' ? 'Disable' : 'Enable'} Tips
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </Container>
      </Navbar>
    </>
  )
}

// points dropped to a lower level when refunded to the highest level, leaves teh current level without points

export default HeaderBar
