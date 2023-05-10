import React, { useState } from "react";
import { Button, Input, DatePicker, Space } from "antd";
import { CopyOutlined } from "@ant-design/icons";

const Interface = () => {
  const [surname, setSurname] = useState();
  const [date, setDate] = useState();
  const today = new Date();
  console.log({
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate,
  });

  const onChangeDate = (date, dateString) => {
    console.log("date");
    console.log(dateString);
  };

  const disabledDate = (current) => {
    // Calculate the minimum allowed date (18 years ago from today)
    const minAllowedDate = new Date();
    minAllowedDate.setFullYear(minAllowedDate.getFullYear() - 18);
    // Disable dates that are greater than or equal to the minimum allowed date
    return current && current >= minAllowedDate;
  };

  return (
    <Space direction="vertical">
      <h3>Dummy National Identity Generator</h3>

      <Input placeholder="Surname" />
      <DatePicker
        style={{ width: "100%" }}
        format={"DD-MM-YY"}
        disabledDate={disabledDate}
        // maxDate={subYears(new Date(), 18)}
        onChange={onChangeDate}
      />

      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Input size="large" placeholder="large size" disabled value="saadf" />
        <CopyOutlined
          style={{ fontSize: 20, marginLeft: 10 }}
          onMouseEnter={(e) => {
            e.target.style.cursor = "pointer";
          }}
          onClick={() => {
            console.log("click");
          }}
        />
      </div>

      <Button block>Generate</Button>
    </Space>
  );
};

export default Interface;
