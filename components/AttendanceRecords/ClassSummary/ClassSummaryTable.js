import ClassSummaryRow from "./ClassSummaryRow";
import React, {useEffect} from "react";

// TODO: make real
// fake dataset
let dates_init = [
  new Date(2022, 6, 15).toISOString(),
  new Date(2022, 6, 16).toISOString(),
];
let students_init = {
  "1234": {
    name: "Jeff",
    attendance: {
      [dates_init[0]]: 0, [dates_init[1]]: 2,
    }
  },
  "1111": {
    name: "Bob",
    attendance: {
      [dates_init[0]]: 1, [dates_init[1]]: 1,
    }
  },
};
let values_init = ["❌️", "✔️", "🟡"];

let dataset_init = {
  "dates": dates_init,
  "students": students_init,
  "values": values_init,
};

export default function ClassSummaryTable(course_id, course_ref) {

  const [dataset, setDataset] = React.useState(dataset_init);
  const [students, setStudents] = React.useState(dataset.students);
  const [dates, setDates] = React.useState(dataset.dates);

  useEffect(() => {
    setStudents(old_students => {
      // get last date
      let last_date = dates[dates.length - 1];

      let new_students = {};

      for (const [key, value] of Object.entries(old_students)) {
        new_students[key] = value;
        value.attendance[last_date] = 0;
      }

      return new_students;
    });
  }, [dates]);

  function addDate() {
    setDates((past_dates) => {
      // get last day
      let last_date_index = past_dates.length - 1;
      let last_date = past_dates[last_date_index];
      last_date = new Date(last_date);
      // get next date
      let day = 24 * 60 * 60 * 1000;
      let new_date = new Date(last_date.getTime() + day);
      new_date = new_date.toISOString();
      // return new array of dates
      return past_dates.concat(new_date)
    })
    setDataset((past_dataset) => {
      past_dataset["dates"] = dates
      return past_dataset
    })
  }

  useEffect(() => {
    setDataset(old_students => {
      return old_students;
    });
  }, [students]);

  function addStudent() {
    setStudents((past_students) => {
      let new_students = past_students;
      // return new array of dates
      new_students["9999"] = {
        name: "Mark",
        attendance: past_students['1111']["attendance"],
      }
      return new_students;
    });
    setDataset((past_dataset) => {
      past_dataset["students"] = students
      return past_dataset
    })
  }

  return (
      <>
        <div>
          <table className="">
            <tbody>
            {/*dates*/}
            <tr className="">
              <td className="border"></td>
              {dates.map((date) => (
                  <td key={date}
                  className="border p-1">
                    <p>{new Date(date).toLocaleDateString('en-CA')}</p>
                  </td>
              ))}
              <td onClick={addDate}>➕</td>
            </tr>
            {/*students and attendance*/}
            {Object.keys(students).map((id) => (
                <ClassSummaryRow key={id} student_id={id} dataset={dataset}/>
            ))}
            {/*add student*/}
            <tr>
               <td onClick={addStudent}>➕</td>
            </tr>
            </tbody>
          </table>
        </div>
      </>
  );
}

