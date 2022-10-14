import LiveAttendanceRow from "./LiveAttendanceRow";
import React, {useEffect} from "react";

// TODO: make real
// fake dataset
let dates_init = [
  new Date(2022, 6, 15).toISOString(),
];
let students_init = {
  "1234": {
    name: "Jeff",
    attendance: {
      [dates_init[0]]: 0,
    }
  },
  "1111": {
    name: "Bob",
    attendance: {
      [dates_init[0]]: 1,
    }
  },
};
let values_init = ["❌️", "✔️", "🟡"];

let dataset_init = {
  "dates": dates_init,
  "students": students_init,
  "values": values_init,
};

export default function LiveAttendanceList() {

  const [dataset, setDataset] = React.useState(dataset_init);
  const [students, setStudents] = React.useState(dataset.students);
  const [dates, setDates] = React.useState(dataset.dates);

  useEffect(() => {
    setStudents(old_students => {
      // get last date
      let last_date = dates[dates.length - 1];

      let new_students = {
        "1234": {
          name: "Jeff",
          attendance: {
            [dates_init[0]]: 0, [dates_init[1]]: 1,
          }
        }
      }

      for (const [key, value] of Object.entries(old_students)) {
        new_students[key] = value;
        value.attendance[last_date] = 0;
      }

      return new_students;
    });
  }, [dates]);

  function addDate() {
    return setDates((past_dates) => {
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
  }

  useEffect(() => {
    setStudents(old_students => {
      return old_students;
    });
  }, [students]);

  function addStudent() {
    return setStudents((past_students) => {
      let new_students = past_students;
      // return new array of dates
      students["9999"] = {
        name: "Mark",
        attendance: past_students['1111']["attendance"],
      }
      console.log(students);
      return students;
    });
  }

  return (
      <>
        <main>
          <table className="">
            <tbody>
            {/*students and attendance*/}
            {Object.keys(dataset.students).map((id) => (
                <LiveAttendanceRow key={id} student_id={id} dataset={dataset} setDataset={setDataset}/>
            ))}
            {/*add student*/}
            <tr>
               <td onClick={addStudent}>➕</td>
            </tr>
            </tbody>
          </table>
        </main>
      </>
  );
}

