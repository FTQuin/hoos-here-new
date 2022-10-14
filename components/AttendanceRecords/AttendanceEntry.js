import React from "react";

export default function AttendanceEntry({id, date, dataset}) {
  // use State for live changes
  const [vote, setVote] = React.useState(dataset.students[id].attendance[date]);

  function handleClick() {
    setVote((vote+1) % dataset.values.length);
    dataset.students[id].attendance[date] = vote;
  }

  return (
      <>
        <td className="border"
            onClick={handleClick}>
          <p className="text-center">
            {dataset.values[vote]}
          </p>
        </td>
      </>
  );
}
