import React from "react";
import styles from "./profile.module.css";
import { color } from "framer-motion";

const profiles = [
  { name: "Health", tags: ["Etc", "Event", "Personal", "Fun"] },
  { name: "Event", tags: ["Etc.", "Event", "Personal"] },
  { name: "Work", tags: ["Etc.", "Event", "Personal", "Fun"] },
  { name: "Personal", tags: ["Etc.", "Event", "Fun"] },
];

const tagColors = {
  Etc: "#d1c4e9",
  Event: "#b2fab4",
  Work: "#ffcc80",
  Personal: "#ffab91",
  Fun: "#ffe082",
  Health: "#b3e5fc",
};

const getRandomColor = (tagColors: any, tag: any) => {
  return tagColors[tag] || "#e0e0e0";
};

const Profile = ({ name, tags }: any) => {
  return (
    <>
      <div className={styles.ProfileName}>
        <h3
          style={{
            color: "black",
          }}
        >
          {name}
        </h3>
      </div>
      <div className={styles.profileTags}>
        {tags.map((tag: any, index: any) => (
          <span
            key={index}
            className={styles.tag}
            style={{ backgroundColor: getRandomColor(tagColors, tag) }}
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );
};

const ProfileList = () => {
  return (
    <div className={styles.profileList}>
      <div className={styles.header}>
        <span
          style={{
            color: "black",
          }}
        >
          Name
        </span>
        <span
          style={{
            color: "black",
          }}
        >
          Tags
        </span>
      </div>
      {profiles.map((profile, index) => (
        <Profile key={index} name={profile.name} tags={profile.tags} />
      ))}
    </div>
  );
};

export default ProfileList;
