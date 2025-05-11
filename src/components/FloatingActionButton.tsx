import React from 'react'
import { Button } from 'react-bootstrap'

function FloatingActionButton() {
  return (
    <Button
        variant="primary"
        className="position-fixed bottom-0 end-0 m-4 rounded-circle"
        style={{ width: '60px', height: '60px' }}
    >
        +
    </Button>
  )
}

export default FloatingActionButton