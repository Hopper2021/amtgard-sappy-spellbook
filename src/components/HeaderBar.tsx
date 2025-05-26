import { Button, Dropdown } from 'react-bootstrap'
import { Navbar, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { IoEllipsisVertical } from "react-icons/io5"
import { IoIosArrowBack } from "react-icons/io"

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
      <Navbar className="d-flex pt-2" bg="primary" variant="dark">
        <Container className="align-items-center" >
            <Button
              className="align-items-center p-1"
              onClick={() => navigate(-1)}>
                <IoIosArrowBack size={30} color="white" />
            </Button>
            <Navbar.Brand href="/" className="m-0">Swiftgard</Navbar.Brand>
            <Dropdown drop="start" className="mt-auto mb-1">
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
