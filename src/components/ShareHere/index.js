import React, { useState } from "react";

import styles from "./styles.module.css";

import axios from 'axios'

import { url } from '../../utilities'

import { Button, Modal, Form, Alert } from 'react-bootstrap'

import Loader1 from "../Loader";

import { IconButton } from "@mui/material";

import { openUploadWidget } from "../../util/CloudinaryService";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ShareHere = () => {

	const [receiverEmail, setReceiverEmail] = useState('')
	const [textMsg, setMsg] = useState('')
	const [fileUrl, setFileUrl] = useState('')
	const [mobileNumber, setMobileNumber] = useState('')
	const [loading, setloading] = useState(false);
	const [count, setCount] = useState(0);
	const [status, setStatus] = useState(0)
	const [cloudinaryMsg,setCloudinarySuccessMsg] = useState('')

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	
	const handleShow = (params) => {
		if(!fileUrl){
			alert('Upload Files Before Sending')
		}
		else{
		if (params === 'msg') setCount(1)
		setShow(true);
		}
	}


	const handleReceiverEmailChange = (e) => {
		setReceiverEmail(e.target.value)
	}

	const handleMessageChange = (e) => {
		setMsg(e.target.value)
	}

	const handleNumberChange = (e) => {
		setMobileNumber(e.target.value)
	}

	const formSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			let path = '';
			let obj = {};
			if (count === 0) {
				path = 'send-mail';
				obj = {
					url: String(fileUrl),
					email: receiverEmail,
					message: textMsg
				};
			}
			else {
				path = 'send-message';
				obj = {
					url: String(fileUrl),
					number: mobileNumber,
					message: textMsg
				};
			}
			
			setloading(true)
			console.log(url)
			const { data } = await axios.post(
				`${url}/api/${path}/`,
				obj
			);
			setloading(false)

			if (data)
				setStatus(1)
			else
				setStatus(2)

		}
		catch (e) {
			setloading(false)
			setStatus(2);
		}

	}



	const beginUpload = (tag) => {
		const uploadOptions = {
			cloudName: "dtqzhg98l",
			tags: [tag, "my image"],
			uploadPreset: "vdkuxmpd",
		};

		openUploadWidget(uploadOptions, (error, photos) => {
			if (!error) {
				// console.log(photos);
				if (photos.event === "success") {
					console.log(photos.info.secure_url);
					setFileUrl(photos.info.secure_url)
					setCloudinarySuccessMsg('File Uploaded Successfuly')
				}
			} else {
				console.log(error);
			}
		});
	};
	return (
		<div className={styles.mainContainer}>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>ShareHere</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{status === 1 ?
						<Alert variant='primary'>
							File Transfer Successfully
						</Alert> : null}
					{status === 2 ?
						<Alert variant='danger'>
							File Transfer Unsuccessful
						</Alert> : null}
					{count === 0 ?
						<Form>
							<img src={fileUrl} className={styles.uploadedImg} alt="fileImg" />
							<Button style={{marginLeft:'15px'}} variant="primary" onClick={() => beginUpload("image")}>
							Change File
						</Button>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Email address</Form.Label>
								<Form.Control type="email"
									required={true}
									value={receiverEmail}
									onChange={handleReceiverEmailChange}
									placeholder="name@example.com" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
								<Form.Label>Enter Your Message</Form.Label>
								<Form.Control as="textarea" rows={3}
									value={textMsg}
									onChange={handleMessageChange}
									placeholder="Enter Your Message" />
							</Form.Group>
						</Form>
						: <form>
							<Form>
								<img src={fileUrl} alt="fileImg" />
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
									<Form.Label>Mobile Number</Form.Label>
									<Form.Control type="text"
										required={true}
										value={mobileNumber}
										onChange={handleNumberChange}
										placeholder="name@example.com" />
								</Form.Group>
								<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
									<Form.Label>Enter Your Message</Form.Label>
									<Form.Control as="textarea" rows={5}
										value={textMsg}
										onChange={handleMessageChange}
										placeholder="Enter Your Message" />
								</Form.Group>
							</Form>
						</form>}
				</Modal.Body>
				<Modal.Footer>
					{loading ? (
						<Loader1></Loader1>
					) :
						<Button variant="primary" onClick={formSubmitHandler}>
							Transfer
						</Button>
					}
				</Modal.Footer>
			</Modal>
			<div className={styles.leftSection}>
				<h2 className={styles.firstHeading}>
					Share files anonymously and free
				</h2>
				<p className={styles.supportText}>
					*The easiest way to share files across all of your
					devices.Upload any size and type.
				</p>
			</div>
			<div className={styles.rightSection}>
				<div className={styles.formContainer}>
					<div className={styles.topSection}>
						{!cloudinaryMsg ?
						<IconButton
							onClick={() => beginUpload("image")}
							aria-label="delete"
							className={styles.uploadIcon}
						>
							<CloudUploadIcon
								sx={{ fontSize: 60 }}
								fontSize="large"
							/>
						</IconButton> : <Alert variant='primary'>
						   {cloudinaryMsg}
						</Alert> }
						{!cloudinaryMsg ?
						<h3 className={styles.selectTextHeading}>
							Upload Your Files Here
						</h3>
						: null}
					</div>
					<div className={styles.bottomSection}>
						<h2 className={styles.shareViaText}>Share Via</h2>
						<div className="google-btn" onClick={() => handleShow('gmail')}>
							<div className="google-icon-wrapper">
								<img className="google-icon-svg"
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/768px-Gmail_icon_%282020%29.svg.png" alt="googleImgs" />
							</div>
							<p className="btn-text"><b>Share Through Gmail</b></p>
						</div>
						<div className="google-btn" onClick={() => handleShow('msg')}>
							<div className="google-icon-wrapper">
								<img className="google-icon-svg"
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfThp4klPwwb0GWVcsOj1cI-adzx3BMHZEJg&usqp=CAU" alt="googleImgs" />
							</div>
							<p className="btn-text"><b>Share Through Mobile No.</b></p>
						</div>
						<h2 className={styles.logoText}>SHAREHERE</h2>
					</div>
				</div>

				{/* <button onClick={() => beginUpload("image")}>Begin upload</button> */}
			</div>
		</div>
	);
};

export default ShareHere