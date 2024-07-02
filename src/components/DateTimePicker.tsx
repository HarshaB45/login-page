import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";

function Datepicker() {
  const [value, setValue] = useState(new Date());
  return (
    <div className="p-5">
      <DateTimePicker onChange={setValue} value={value}></DateTimePicker>
    </div>
  );
}

export default Datepicker;
