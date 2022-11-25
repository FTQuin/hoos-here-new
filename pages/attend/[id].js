// ---- components ----
import Header from '../../components/Header';

// ---- other ----
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {child, equalTo, get, getDatabase, limitToFirst, orderByChild, query, ref, set} from "firebase/database";

export default function Course() {
  // ---- vars ----
  // Next.js router
  const router = useRouter();
  let course_id = router.query.id;

  // database ref
  let db = getDatabase();

  // attendance vars
  let [submitted, setSubmitted] = useState(false);
  let [courseName, setCourseName] = useState();

  // ---- logic ----
  // request to get course name from course id
  useEffect(() => {
    // wait for the useRouter hook to asynchronously get the course id and database
    if (!course_id || !db) return;

    // if course_id and db has val, course from db
    let courseRef = ref(db,'courses/' + course_id);

    get(child(courseRef, 'info/name')).then(s => {
      setCourseName(s.val());
    })
  }, [course_id]);

  // request to submit attendance entry
  const onSubmit = async (e) => {
    e.preventDefault();
    let student_id = e.target.elements[0].value;
    // const response = await fetch("/api/submitAttendEntry", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({'course_id': course_id,
    //                               'student_id': student_id}),
    // });
    //
    // if (!response.ok)
    //   throw new Error(`Error: ${response.statusMessage}`);
    //
    // const data = await response.json();
    // console.log('POST: ', data);

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
        setSubmitted(true);
      });
    }).catch((e) => {
      console.log(e);
    });
  };

  // ---- render ----
  return (
    <>
      <Header/>

      <main className="flex justify-center align-middle">
        {!submitted && (<>
          <form className="flex-col justify-items-center p-2 justify-center"
                onSubmit={onSubmit}>
            <h1>Welcome to {courseName}</h1>
            <h2>Please enter your email to attend</h2>

            <input required className="text-black" type="email" size="30"/>
            <br/>
            <input type="submit" value={"Im Here"} />
          </form>
        </>)}
        {submitted && <h1>You Are Now Here!</h1>}
      </main>
    </>
  );
}