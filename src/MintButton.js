import React from "react";
import "./MintButton.css";

const MintButton = ({ onClick }) => {
    return (
        <button className="MintButton" onClick={onClick}>
            Mint Tickets
        </button>
    );
};

export default MintButton;
