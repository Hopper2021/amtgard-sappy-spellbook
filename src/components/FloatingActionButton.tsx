import React from 'react'
import { Button } from 'react-bootstrap'
import { LuCirclePlus } from "react-icons/lu";

function FloatingActionButton() {
  return (
    <Button
        variant="dark"
        className="position-fixed bottom-0 end-0 m-4 rounded-circle d-flex justify-content-center align-items-center"
        style={{ width: '60px', height: '60px' }}
    >
        <LuCirclePlus size={22} color="white" />
    </Button>
  )
}

export default FloatingActionButton