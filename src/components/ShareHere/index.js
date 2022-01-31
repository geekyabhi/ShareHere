import React from "react"

import styles from './styles.module.css'

import { IconButton } from '@mui/material';
import { Button } from '@mui/material';

import { openUploadWidget } from "../../util/CloudinaryService";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EmailIcon from '@mui/icons-material/Email';
import Email from "@mui/icons-material/Email";
const ShareHere = () => {
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
					console.log(photos.info.secure_url)

				}
			} else {
				console.log(error);
			}
		});
	};
	return (
		<div className={styles.mainContainer}>
			<div className={styles.leftSection}>
				<h2 className={styles.firstHeading}>Share files anonymously and free</h2>
				<p className={styles.supportText}>*The easiest way to share files across all of your devices.Upload any size and type.</p>
			</div>
			<div className={styles.rightSection}>
				<div className={styles.formContainer}>
					<div className={styles.topSection}>
						<IconButton onClick={() => beginUpload("image")} aria-label="delete" className={styles.uploadIcon}> 
							<CloudUploadIcon sx={{ fontSize: 60 }} fontSize="large" />
						</IconButton>
						<h3 className={styles.selectTextHeading}>Upload Your Files Here</h3>
					</div>
					<div className={styles.bottomSection}>
						<h2 className={styles.shareViaText}>Share Via</h2>
						{/* <form>
						   <input type="email" className={styles.formField} placeholder="Enter your Email" />
						   <input type="text" className={styles.formField} placeholder="Enter your Name" />
						   <textarea rows={4} cols={25}  className={styles.formField} placeholder="Enter your Message" />
					   </form> */}
						<Button className={styles.shareBtn1}  startIcon={<Email style={{ color: "red" }} fontSize="large"/>}>
							<p className={styles.btnText}>Gmail</p>
						</Button>
						<Button className={styles.shareBtn2}  startIcon={<Email style={{ color: "blue" }} fontSize="large"/>}>
							<p style={{color:'blue'}} className={styles.btnText}>Message</p>
						</Button>
						<h2 className={styles.logoText}>SHAREHERE</h2>
					</div>
				</div>

				{/* <button onClick={() => beginUpload("image")}>Begin upload</button> */}
			</div>
		</div>
	)
}

export default ShareHere