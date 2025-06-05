import React from 'react'
import { Button } from 'react-bootstrap'
import { LuCirclePlus } from "react-icons/lu"
import { useNavigate } from 'react-router-dom'
import { IS_APK } from '../appConstants'

function FloatingActionButton() {
  const navigate = useNavigate()
  const apkMargin = IS_APK ? 'mb-5 me-5' : 'mb-5 me-4'

  return (
    <Button
        variant="dark"
        className={`position-fixed bottom-0 end-0 ${apkMargin} rounded-circle d-flex justify-content-center align-items-center`}
        style={{ width: '60px', height: '60px' }}
        onClick={() => navigate('/createList')}
    >
        <LuCirclePlus size={22} color="white" />
    </Button>
  )
}

export default FloatingActionButton