import React, {memo, useState} from "react";

const AttendanceEntry = memo(({val}) => {
  let [value, setVal] = useState(val);

  function handleClick() {
    console.log("clicked");
    setVal((value+1) % 3);
  }

  return (
      <>
        <td className="border"
            onClick={handleClick}>
          <div className="text-center">
            {value}
          </div>
        </td>
      </>
  );
});
export default AttendanceEntry;