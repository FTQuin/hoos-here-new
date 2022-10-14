import React from "react";
import AttendanceEntry from "../AttendanceEntry";

export default function ClassSummaryRow({student_id, dataset}) {
  // const [student, setStudent] = React.useState(dataset.students[student_id]);
  let student = dataset.students[student_id];

  return (
      <>
        <tr>
          <th className="border p-1">
            {student.name}
          </th>
          {Object.keys(student.attendance).map((date) => (
              <AttendanceEntry date={date} id={student_id} key={date + student_id} dataset={dataset}/>
          ))}
        </tr>
      </>
  );
}
