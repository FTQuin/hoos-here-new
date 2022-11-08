// import ClassSummaryRow from "./ClassSummaryRow";
import React, {memo, useEffect} from "react";
import AttendanceEntry from "../AttendanceEntry";

const ClassSummaryTable = memo(({course_obj}) => {
  if(!course_obj) return;

  let dates = Object.values(course_obj.dates).map((date) => {
    return date.info.date;
  })
  let students = [];

  let i = 0;
  for (const student in course_obj['students']) {
    students[i] = {'name': course_obj['students'][student]['name'], 'entry': []}
    for (const date in course_obj['dates']) {
      let val = course_obj['dates'][date]['records'][student];
      students[i]['entry'].push({'val': (val ? val : 0), 'date': date});
    }
    i++;
  }
  
  return (
      <>
        <div>
          <table className="">
            <tbody>
            {/*dates*/}
            <tr className="">
              <td className="border"></td>
              {dates?.map((date) => (
                  <td key={date}
                  className="border p-1">
                    <p>{new Date(date).toLocaleDateString('en-CA')}</p>
                  </td>
              ))}
              <td>➕</td>
            </tr>
            {/*students and attendance*/}
            {students.map((student) => (
                <ClassSummaryRow key={student['name']} student={student}/>
            ))}
            {/*add student*/}
            <tr>
               <td>➕</td>
            </tr>
            </tbody>
          </table>
        </div>
      </>
  );
});
export default ClassSummaryTable;

const ClassSummaryRow = memo(({student}) => {
  return (
      <>
        <tr>
          <th className="border p-1">
            {student.name}
          </th>
          {student.entry.map((entry) => (
              <AttendanceEntry val={entry.val} key={entry.date + student.name}/>
          ))}
        </tr>
      </>
  );
});

