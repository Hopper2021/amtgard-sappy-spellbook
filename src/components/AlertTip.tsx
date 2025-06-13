import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { IoMdInformationCircle } from 'react-icons/io'
import { IoEllipsisVertical } from 'react-icons/io5'

const AlertTip = ({ message }) => {
	const [showAlert, setShowAlert] = useState(true)
	let enableTips = localStorage.getItem('enableTips')
  const tipsEnabled = enableTips === 'true'

	return (
		<>
			{tipsEnabled && (
				<Alert
					show={showAlert}
					className="d-flex alert-primary"
					dismissible
					onClose={() => setShowAlert(false)}
					>
					<IoMdInformationCircle size={35} className="me-1" color="blue"/>
					<div className="d-flex flex-column">
						<span>{message}</span>
						<div
							className="end-0 bottom-0 text-muted small mt-1"
							style={{ pointerEvents: 'none' }}
						>
							<span>Disable tips in settings <IoEllipsisVertical /></span>
						</div>
					</div>
				</Alert>
			)}
		</>
	)
}

export default AlertTip