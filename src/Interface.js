import React, { useState, useEffect } from "react";
import { Button, Input, DatePicker, Space, Alert } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import { validateNiD } from "../utils/generate-nid";

const Interface = () => {
  const [surname, setSurname] = useState();
  const [dateSelect, setDateSelect] = useState("");
  const [generatedString, setGeneratedString] = useState("");
  const [message, setMessage] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [surnameErrorMessage, setSurnameErrorMessage] = useState("");
  const [dateError, setDateError] = useState(false);
  const [dateErrorMessage, setDateErrorMessage] = useState("");

  const onChangeDate = (date, dateString) => {
    setDateSelect(dateString);
  };

  useEffect(() => {
    if (message || surnameError || dateError) {
      const timer = setTimeout(() => {
        setMessage(false);
        setDateError(false);
        setDateErrorMessage("");
        setSurnameError(false);
        setSurnameErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, surnameError, dateError]);

  const disabledDate = (current) => {
    // Calculate the minimum allowed date (18 years ago from today)
    const minAllowedDate = new Date();
    minAllowedDate.setFullYear(minAllowedDate.getFullYear() - 18);
    // Disable dates that are greater than or equal to the minimum allowed date
    return current && current >= minAllowedDate;
  };

  const generateNID = () => {
    if (!surname) {
      setSurnameError(true);
      setSurnameErrorMessage(
        "Please insert Surname for generating the Identity."
      );
    }
    if (!dateSelect) {
      setDateError(true);
      setDateErrorMessage("Please select date for generating the Identity.");
    }

    if (surname && dateSelect) {
      let tempString = "";

      tempString =
        surname.substring(0, 1).toUpperCase() +
        dateSelect.replace(/[^0-9\.]+/g, "");
      console.log(tempString);
      let x = validateNiD(tempString);

      setGeneratedString(x);
    }

    // console.log(generatedString);
  };

  return (
    <Space direction="vertical" style={{ width: "290px", height: "510px" }}>
      {/* --- Header Start here --- */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#984063",
          color: "white",
          padding: "10px",
          width: "100%",
        }}
      >
        <h3 style={{ textAlign: "center" }}>National Identity Generator</h3>
      </div>
      {/* --- Header End --- */}

      <div
        style={{
          position: "fixed",
          width: "280px",

          bottom: "90px",
        }}
      >
        {message && (
          <Alert
            message="Copied!"
            type="info"
            showIcon
            style={{ marginBottom: "10px" }}
          />
        )}
        {surnameError && (
          <Alert
            message={surnameErrorMessage}
            type="error"
            showIcon
            style={{ marginBottom: "10px" }}
          />
        )}

        {dateError && (
          <Alert
            message={dateErrorMessage}
            type="error"
            showIcon
            style={{ marginBottom: "10px" }}
          />
        )}
      </div>

      {/* --- Main Content Start here --- */}
      <div
        style={{
          marginTop: "50px",
          height: "200px",
          padding: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Input
          status={surnameError && "error"}
          placeholder="Surname"
          onChange={(e) => {
            setSurname(e.target.value);
          }}
        />
        <DatePicker
          status={dateError && "error"}
          style={{ width: "100%" }}
          format={"DD-MM-YY"}
          disabledDate={disabledDate}
          onChange={onChangeDate}
        />

        {/* input that generate the nid */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Input size="large" disabled value={generatedString} />
          <CopyOutlined
            style={{ fontSize: 20, marginLeft: 10 }}
            onMouseEnter={(e) => {
              e.target.style.cursor = "pointer";
            }}
            onClick={() => {
              navigator.clipboard.writeText(generatedString);
              setMessage(true);
            }}
          />
        </div>

        <Button block onClick={generateNID}>
          Generate
        </Button>
        {/* ---- Message output ---- */}

        {/* ---- Message output End Here --- */}
      </div>
      {/* --- Main Content End --- */}

      {/* ---- Footer start here ---- */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          backgroundColor: "#808588",
          width: "100%",
        }}
      >
        <h5 style={{ textAlign: "center", color: 'white' }}>Version 2.0</h5>
      </div>
      {/* --- Footer End --- */}
    </Space>
  );
};

export default Interface;
