import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./fileupload.module.css";

const FileUpload = () => {
  const [selectedFile, setSelectedFile]: any = useState(null);
  const [file, setFile]: any = useState(null);

  const filesizes = (bytes: any, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const InputChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile({
          id: 1,
          filename: file.name,
          filetype: file.type,
          fileimage: reader.result,
          datetime: file.lastModifiedDate.toLocaleString("en-IN"),
          filesize: filesizes(file.size),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const DeleteSelectedFile = () => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setSelectedFile(null);
    }
  };

  const FileUploadSubmit = async (e: any) => {
    e.preventDefault();

    // form reset on submit
    e.target.reset();
    if (selectedFile) {
      setFile(selectedFile);
      setSelectedFile(null);
    } else {
      alert("Please select a file");
    }
  };

  const DeleteFile = () => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setFile(null);
    }
  };

  return (
    <div className={styles.fileuploadview}>
      <div className={styles.firstBox}>
        <div className={styles.txt1}>Single File Upload With Preview</div>

        <form onSubmit={FileUploadSubmit}>
          <div className="kb-file-upload">
            <div className="file-upload-box">
              <input
                type="file"
                id="fileupload"
                className="file-upload-input"
                onChange={InputChange}
              />
              <span className={styles.txt2}>
                Drag and drop or{" "}
                <span className="file-link">Choose your file</span>
              </span>
            </div>
          </div>
          <div className="kb-attach-box mb-3">
            {selectedFile && (
              <div className="file-atc-box" key={selectedFile.id}>
                {selectedFile.filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                  <div className="file-image">
                    <img src={selectedFile.fileimage} alt="" />
                  </div>
                ) : (
                  <div className="file-image">
                    <i className="far fa-file-alt"></i>
                  </div>
                )}
                <div className={styles.txt3}>
                  {selectedFile.filename}
                  <p>
                    <span className={styles.txt3}>
                      Size : {selectedFile.filesize}
                    </span>
                    <span className="ml-2">
                      Modified Time : {selectedFile.datetime}
                    </span>
                  </p>

                  <button
                    type="button"
                    className="file-action-btn"
                    onClick={DeleteSelectedFile}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="kb-buttons-box">
            <button type="submit" className="btn btn-primary form-submit">
              Upload
            </button>
          </div>
        </form>
        {file && (
          <div className={styles.box}>
            <hr />
            <div className={styles.box2}>
              {file.filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                <div className="file-image">
                  <img src={file.fileimage} alt="" />
                </div>
              ) : (
                <div className="file-image">
                  <i className="far fa-file-alt"></i>
                </div>
              )}
              <div className={styles.txt3}>
                {file.filename}
                <p>
                  <span>Size : {file.filesize}</span>
                  <span className="ml-3">Modified Time : {file.datetime}</span>
                </p>
                <div className="file-actions">
                  <button className="file-action-btn" onClick={DeleteFile}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.secondBox}> Tags for Images</div>
    </div>
  );
};

export default FileUpload;
