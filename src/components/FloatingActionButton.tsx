import React from 'react'
import { Button } from 'react-bootstrap'
import { LuCirclePlus } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

function FloatingActionButton() {
  const navigate = useNavigate()

  return (
    <Button
        variant="dark"
        className="position-fixed bottom-0 end-0 m-4 rounded-circle d-flex justify-content-center align-items-center"
        style={{ width: '60px', height: '60px' }}
        onClick={() => navigate('/createList')}
    >
        <LuCirclePlus size={22} color="white" />
    </Button>
  )
}

export default FloatingActionButton