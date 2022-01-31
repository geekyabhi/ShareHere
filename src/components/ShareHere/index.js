import React from "react"

import styles from './styles.module.css'

import { openUploadWidget } from "../../util/CloudinaryService";

const ShareHere = () =>{
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
    return(
        <div className={styles.mainContainer}>
          <button onClick={() => beginUpload("image")}>Begin upload</button>
        </div>
    )
}

export default ShareHere