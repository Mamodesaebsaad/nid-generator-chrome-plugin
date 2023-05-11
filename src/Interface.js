import React, { useState, useEffect } from "react";
import { Button, Input, DatePicker, Space, Alert } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import { validateNiD } from "../utils/generate-nid";

const Interface = () => {
  const [surname, setSurname] = useState();
  const [dateSelect, setDateSelect] = useState("");
  const [generatedString, setGeneratedString] = useState("");
  const [message, setMessage] = useState(false);

  const onChangeDate = (date, dateString) => {
    setDateSelect(dateString);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // console.log({ selectionDate: dateSelect });

  const disabledDate = (current) => {
    // Calculate the minimum allowed date (18 years ago from today)
    const minAllowedDate = new Date();
    minAllowedDate.setFullYear(minAllowedDate.getFullYear() - 18);
    // Disable dates that are greater than or equal to the minimum allowed date
    return current && current >= minAllowedDate;
  };

  const generateNID = () => {
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
    <Space direction="vertical" style={{ width: "290px" }}>
      <h3 style={{ display: "flex", justifyContent: "center", backgroundColor: 'blue', padding: '10px', color: 'white' }}>Dummy NID Generator</h3>

      <Input
        placeholder="Surname"
        onChange={(e) => {
          setSurname(e.target.value);
        }}
      />
      <DatePicker
        style={{ width: "100%" }}
        format={"DD-MM-YY"}
        disabledDate={disabledDate}
        onChange={onChangeDate}
      />

      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Input
          size="large"
          disabled
          value={generatedString}
        />
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
      {message && <Alert message="Copied!" type="info" showIcon />}

      <Button block onClick={generateNID}>
        Generate
      </Button>
    </Space>
  );
};

export default Interface;
