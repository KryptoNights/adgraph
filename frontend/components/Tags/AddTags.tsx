import React, { useState } from "react";
import styles from "./addtags.module.css";
import { CircularProgress } from "@mui/material";

const Chip = ({ chip, onDelete }: { chip: any; onDelete: any }) => (
  <div className={styles.chip}>
    {chip}
    <span className="closebtn" onClick={() => onDelete(chip)}>
      &times;
    </span>
  </div>
);

const ChipInput = ({ chips, setChips }: { chips: any; setChips: any }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (inputValue.trim() && !chips.includes(inputValue.trim())) {
        setChips([...chips, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleDeleteChip = (chipToDelete: any) => {
    setChips(chips.filter((chip: any) => chip !== chipToDelete));
  };

  return (
    <div className="chip-input">
      {chips.map((chip: any) => (
        <Chip key={chip} chip={chip} onDelete={handleDeleteChip} />
      ))}
      <input
        className={styles.textfield}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter or Space"
      />
    </div>
  );
};

const AddTAgs = () => {
  const [chips, setChips] = useState([]);
  const [appName, setAppName] = useState("");

  const [address, setAddress] = React.useState("");
  React.useEffect(() => {
    const accounts = localStorage.getItem(
      "-walletlink:https://www.walletlink.org:Addresses"
    );
    if (accounts) {
      setAddress(accounts);
    }
  }, []);

  const handleAppNameChange = (event: any) => {
    setAppName(event.target.value);
  };

  const constructUrl = (tag: string, appName: string) => {
    console.log("Application Name:", appName);
    console.log("Chips:", chips);
    const baseUrl =
      "https://fleek-test.network/services/1/ipfs/bafkreihstluktgf3akcffuyt2svwqloicq6ircoxucofgbzeqecs676oki";
    const url = `${baseUrl}?profile=${address}&app=${appName}&tags=${tag}`;
    return url;
  };

  const [loading, setLoading] = React.useState(false);

  const HandlelikeFunction = async () => {
    setLoading(true);

    if (chips) {
      const tagsString = chips.join(",");
      const url = constructUrl(tagsString, appName);
      console.log("inside", url);

      try {
        const response = await fetch(url);
        console.log(response);
      } catch (error) {
        console.error("Error fetching URL:", error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.text1}>Application Name:</div>
        <input
          className={styles.textfield}
          value={appName}
          onChange={handleAppNameChange}
          placeholder="Enter Application name for which you want to add tag."
        />
        <div className={styles.chipsSection}>
          <div className={styles.text1}>Application Name:</div>
          <ChipInput chips={chips} setChips={setChips} />
        </div>
      </div>

      <button className="like-button" onClick={HandlelikeFunction}>
        {loading ? (
          <>
            <CircularProgress sx={{ color: "white" }} size={15} />
            <>Submit</>{" "}
          </>
        ) : (
          "    Submit"
        )}
      </button>
    </div>
  );
};

export default AddTAgs;
