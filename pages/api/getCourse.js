// ***** DEPRECATED *****
// // ---- firebase ----
// // database
// import {ref, getDatabase, get, child,} from 'firebase/database';
//
// export default function handler(req, res) {
//   // req vars
//   const body = req.body;
//   const course_id = body['course_id'];
//
//   // database ref
//   let db = getDatabase();
//   let courseRef = ref(db,'courses/' + course_id);
//
//   get(child(courseRef, 'info/name')).then(s => {
//     res.status(200).json({ name: s.val() })
//   })
// }