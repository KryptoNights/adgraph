import React, { useState } from "react";
import styles from "./fileupload.module.css";
import { get_wallets_and_tags_for_image } from "@/utils/transitions";
import { convertImgToBase64 } from "@/utils/base";

import Image from "next/image";
import Shop1 from "public/shop1.jpg";
import Shop2 from "public/shop2.jpg";

import { Name } from "@coinbase/onchainkit/identity";
import { useRouter } from "next/router";

const tagColors: any = {
  0: "#d1c4e9",
  1: "#b2fab4",
  2: "#ffcc80",
  3: "#ffab91",
  4: "#ffe082",
  5: "#b3e5fc",
};

const getRandomColor = (index: number) => {
  return tagColors[index % 6];
};
const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
        setLoading(true);
        const res = await convertImgToBase64(selectedFile.fileimage);
        const { tags, profile_tag_map } = await get_wallets_and_tags_for_image(
          selectedFile.fileimage
        );

        // Assign random colors to tags
        setLoading(false);
        const colors: { [key: string]: string } = {};
        tags.forEach((tag: any, index: number) => {
          colors[tag] = getRandomColor(Number(index));
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
      setLoading(false);
    }
  };

  const DeleteFile = () => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setFile(null);
    }
  };

  const router = useRouter();
  const handleRedirect = () => {
    router.push("/sample");
  };
  const handleRedirect2 = () => {
    router.push("/shop");
  };

  return (
    <>
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
                    <span className="ml-3">
                      Modified Time : {file.datetime}
                    </span>
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
        {loading == true ? (
          <div className={styles.secondBox}>
            <div className="loader">
              <div className="inner one"></div>
              <div className="inner two"></div>
              <div className="inner three"></div>
            </div>
          </div>
        ) : tags.length === 0 ? (
          <div className={styles.secondBox}>Upload file to view tags</div>
        ) : (
          <div className={styles.secondBox}>
            <div>
              <span className={styles.txt1}>Tags for Images</span>
              <div className={styles.tagsDiv}>
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className={styles.tag}
                    style={{
                      backgroundColor: getRandomColor(Number(index)),
                    }}
                  >
                    {tag}

                    {/* <Image src={Cross} width={15} height={15} alt={"cross"} /> */}
                  </span>
                ))}
              </div>
            </div>
            <div
              style={{
                marginTop: "28px",
                marginBottom: "20px",
              }}
            >
              <span className={styles.txt1}>Profiles Addresses</span>
              {Array.from(profileTagMap.entries()).map(
                ([address, tags], index) => (
                  <div key={index} className={styles.innerdiv}>
                    <Name address={address} showAddress />
                    <div className={styles.flex}>
                      {tags.map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className={styles.tag}
                          style={{
                            backgroundColor: getRandomColor(Number(index)),
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}
              {/* </Stack> */}
            </div>
          </div>
        )}
      </div>

      <div className={styles.subBox}>
        <div className={styles.miniBox}>
          <Image
            src={Shop1}
            width={500}
            height={500}
            alt={"shop1"}
            style={{ borderRadius: "8px" }}
          />

          <button
            className="btn btn-primary form-submit"
            onClick={handleRedirect}
          >
            Sample Shop 1
          </button>
        </div>
        <div className={styles.miniBox}>
          <Image
            src={Shop1}
            width={500}
            height={500}
            alt={"shop1"}
            style={{ borderRadius: "8px" }}
          />
          <button
            className="btn btn-primary form-submit"
            onClick={handleRedirect2}
          >
            Sample Shop 2{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
