import React, { useState } from "react";
import styles from "./fileupload.module.css";
import { get_wallets_and_tags_for_image } from "@/utils/transitions";
import { convertImgToBase64 } from "@/utils/base";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

// Predefined set of colors
const predefinedColors = [
  "#d1c4e9",
  "#b2fab4",
  "#ffcc80",
  "#ffab91",
  "#ffe082",
  "#b3e5fc",
];

// Function to get a random color from the predefined set
const getRandomColor = (colors: string[]) => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [file, setFile] = useState<any>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [profileTagMap, setProfileTagMap] = useState(new Map());
  const [tagColors, setTagColors] = useState<{ [key: string]: string }>({});

  const filesizes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const InputChange = (e: any) => {
    const file = e.target.files?.[0];
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

  const FileUploadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile) {
      setFile(selectedFile);
      try {
        const res = await convertImgToBase64(selectedFile.fileimage);
        const { tags, profile_tag_map } = await get_wallets_and_tags_for_image(
          selectedFile.fileimage
        );

        // Assign random colors to tags
        const colors: { [key: string]: string } = {};
        tags.forEach((tag: any) => {
          colors[tag] = getRandomColor(predefinedColors);
        });
        console.log(tags);
        console.log(profile_tag_map);

        setTags(tags);
        setProfileTagMap(profile_tag_map);
        setTagColors(colors);
      } catch (error) {
        console.error("Error fetching tags and profile tag map:", error);
      }
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

      <div className={styles.secondBox}>
        <div>
          <span>Tags for Images</span>
          <div className={styles.tagsDiv}>
            <Stack direction="row" spacing={1} className={styles.chipContainer}>
              {tags.map((tag, index) => (
                // <Chip
                //   key={index}
                //   label={tag}
                //   style={{
                //     color: "black",
                //     backgroundColor: tagColors[tag],
                //     marginBottom: "8px",
                //   }}
                // />
                <span
                  key={tag}
                  className={styles.tag}
                  style={{
                    backgroundColor: getRandomColor(predefinedColors),
                    marginBottom: "5px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </Stack>
          </div>
        </div>
        <div
          style={{
            marginTop: "7px",
          }}
        >
          <span>Addresses</span>
          <Stack direction="row" spacing={1} className={styles.chipContainer}>
            {Array.from(profileTagMap.entries()).map(
              ([address, tags], index) => (
                <div key={index}>
                  <div>{address}</div>
                  <div>
                    {tags.map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className={styles.tag}
                        style={{
                          backgroundColor: getRandomColor(predefinedColors),
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
