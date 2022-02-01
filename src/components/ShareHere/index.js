import React, { useState } from "react";

import styles from "./styles.module.css";

import { axios } from 'axios'

import {url} from '../../utilities'

import Loader1 from "../Loader";

import { IconButton } from "@mui/material";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import { openUploadWidget } from "../../util/CloudinaryService";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ShareHere = () => {

	const [senderEmail, setSenderEmail] = useState(null)
	const [receiverEmail, setReceiverEmail] = useState(null)
	const [textMsg, setMsg] = useState(null)
	const [fileUrl, setFileUrl] = useState('')
    const [loading, setloading] = useState(false);

	const handleSenderEmailChange = (e) => {
		setSenderEmail(e.target.value);
	}

	const handleReceiverEmailChange = (e) => {
		setReceiverEmail(e.target.value)
	}

	const handleMsgChange = (e) => {
		setMsg(e.target.value)
	}

	const formSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			console.log('form')
			let obj = {
				senderEmail: senderEmail,
				link: String(fileUrl),
				receiverEmail: receiverEmail,
				message: textMsg
			};
			console.log(obj);
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			setloading(true)
			const { data } = await axios.post(
				`${url}/api/files/create`,
				obj,
				config
			);
			console.log(data)
			setloading(false)
		}
		catch (e) {
			console.log(e);
		}

	}

	const BootstrapDialog = styled(Dialog)(({ theme }) => ({
		'& .MuiDialogContent-root': {
			padding: theme.spacing(2),
		},
		'& .MuiDialogActions-root': {
			padding: theme.spacing(1),
		},
	}));

	const BootstrapDialogTitle = (props) => {
		const { children, onClose, ...other } = props;

		return (
			<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
				{children}
				{onClose ? (
					<IconButton
						aria-label="close"
						onClick={onClose}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>
				) : null}
			</DialogTitle>
		);
	};

	BootstrapDialogTitle.propTypes = {
		children: PropTypes.node,
		onClose: PropTypes.func.isRequired,
	};


	const [open, setOpen] = React.useState(false);
	const [count, setCount] = React.useState(0);
	const handleClickOpen = (params) => {
		console.log(params)
		setOpen(true);

		if (params === 'msg')
			setCount(1);
		else setCount(0)

	};
	const handleClose = () => {
		setOpen(false);

	};



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
				}
			} else {
				console.log(error);
			}
		});
	};
	return (
		<div className={styles.mainContainer}>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
					ShareHere
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom style={{ color: 'red' }}>
						Share Via {count === 0 ? 'Gmail' : 'Message'}
					</Typography>
					<br />
					{count === 0 ?
						<form>
							<label>Email To:</label>
							<input
								type="email"
								className={styles.formField}
								onChange={handleReceiverEmailChange}
								value={receiverEmail}
								placeholder="abc@gmail.com" />
							<br />
							<label>Enter Your Email Address </label>
							<input type="email"
								className={styles.formField}
								value={senderEmail}
								onChange={handleSenderEmailChange}
								placeholder="your@gmail.com" />
							<br />
							<label>Enter Your Message </label>
							<textarea
								className={styles.formField}
								rows={6}
								value={textMsg}
								onChange={handleMsgChange}
								placeholder="Enter Your Message" />
						</form>
						: <form>
							<label>Receiver Mobile No:</label>
							<input type="text" className={styles.formField} placeholder="1800 9100" />
							<br />
							<label>Sender Mobile No: </label>
							<input type="text" className={styles.formField} placeholder="1900 2000" />
							<br />
							<label>Enter Your Message </label>
							<textarea rows={6} className={styles.formField} placeholder="Enter Your Message" />
						</form>}

				</DialogContent>
				<DialogActions>
				{loading ? (
							<Loader1></Loader1>
						) :
					<Button  onClick={formSubmitHandler}>
						Save changes
					</Button>}
				</DialogActions>
			</BootstrapDialog>
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
						<IconButton
							onClick={() => beginUpload("image")}
							aria-label="delete"
							className={styles.uploadIcon}
						>
							<CloudUploadIcon
								sx={{ fontSize: 60 }}
								fontSize="large"
							/>
						</IconButton>
						<h3 className={styles.selectTextHeading}>
							Upload Your Files Here
						</h3>
					</div>
					<div className={styles.bottomSection}>
						<h2 className={styles.shareViaText}>Share Via</h2>
						<div className="google-btn" onClick={() => handleClickOpen('gmail')}>
							<div className="google-icon-wrapper">
								<img className="google-icon-svg"
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/768px-Gmail_icon_%282020%29.svg.png" alt="googleImgs" />
							</div>
							<p className="btn-text"><b>Share Through Gmail</b></p>
						</div>
						<div className="google-btn" onClick={() => handleClickOpen('msg')}>
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
