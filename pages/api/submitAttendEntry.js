// ---- firebase ----
// database
import {ref, getDatabase, set, limitToFirst, orderByValue, get, child, push, query, orderByChild, equalTo,} from 'firebase/database';
import {useList} from "react-firebase-hooks/database";

export default async function handler(req, res){

  // req vars
  const body = req.body;
  const course_id = body['course_id'];
  const student_id = body['student_id'];

  // check course id is there
  if (!course_id) {
    return res.status(404).json({
      status: 404,
      message: 'Not Found'
    });
  }

  // database ref
  let db = getDatabase();
  let datesRef = ref(db, 'courses/' + course_id + '/dates');
  let studentRef = ref(db, 'courses/' + course_id + '/students');

  // get course
  let q = query(datesRef, orderByChild('info/open'), equalTo(true), limitToFirst(1))
  // let q = query(datesRef, orderByChild('info/open'));

  get(q).then((s) => {
    s.forEach((d) => {
      let student_name = student_id.split('@')[0];
      set(child(datesRef, d.key + '/records/' + student_name), 1)
      set(child(studentRef, student_name), {name: student_name});
      return res.json(s.val());
    });
  }).catch((e) => {
    console.log(e);
    return res.status(404).json({
      status: 404,
      message: 'Not Found'
    });
  });
}