// ---- components ----
import Header from '../../components/Header';

// ---- other ----
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function Course() {
  // ---- vars ----
  // Next.js router
  const router = useRouter();
  let course_id = router.query.id;

  // attendance vars
  let [submitted, setSubmitted] = useState(false);
  let [courseName, setCourseName] = useState();

  // ---- logic ----
  // request to get course name from course id
  useEffect(() => {
    // wait for the useRouter hook to asynchronously get the course id
    if (!course_id) return;

    // if course_id has val, call api to get course from db
    const fetchCourse = async () => {
      const response = await fetch(`/api/getCourse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({'course_id': course_id}),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const courseInfo = await response.json();
      setCourseName(courseInfo.name);
    }
    fetchCourse();
  }, [course_id]);

  // request to submit attendance entry
  const onSubmit = async (e) => {
    e.preventDefault();
    let student_id = e.target.elements[0].value;
    const response = await fetch("/api/submitAttendEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({'course_id': course_id,
                                  'student_id': student_id}),
    });

    if (!response.ok)
      throw new Error(`Error: ${response.statusMessage}`);

    const data = await response.json();
    console.log('POST: ', data);
    setSubmitted(true);
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