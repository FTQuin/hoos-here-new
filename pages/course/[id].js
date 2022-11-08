// ---- components ----
import Header from '../../components/Header';
import ClassSummaryTable from '../../components/AttendanceRecords/ClassSummary/ClassSummaryTable';

// ---- firebase ----
import firebaseApp from "../../firebase/clientApp";
// database
import {off, onValue, child, ref, getDatabase, query, orderByChild, equalTo, get,} from 'firebase/database';
import { useObjectVal } from "react-firebase-hooks/database";
// auth
import { getAuth } from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth";

// ---- other ----
import {useRouter} from "next/router";
import {useEffect, useState} from "react";


export default function Course() {
  // ---- vars ----
  //Next.js router
  const router = useRouter();
  let course_id = router.query.id;

  // auth vars
  const [user, authLoading, authError] = useAuthState(getAuth(firebaseApp));
  // redirect to index if not authed
  useEffect(() => {
    if (!user && !authLoading) router.push("/");
  }, [authLoading]);

  // database refs
  const db = getDatabase();
  const courseRef = ref(db, 'courses/' + course_id);

  // course vars
  const [course, setCourse] = useState(null)

  // ---- logic ----
  useEffect(() => {
    get(courseRef).then((snapshot) => {
      setCourse(snapshot.val());
    });
  }, [user]);

  // ---- render ----
  return (
    <>
      <Header/>

      <main className="flex flex-col justify-center align-middle">
        <h1 className="text-3xl p-2 mx-auto">
          {course ? course.info.name : 'Loading'}
          <span>⚙</span>
        </h1>
        <div className="p-4">
          {course ? <ClassSummaryTable course_obj={course}/> : 'Loading'}
        </div>
      </main>
    </>
  );
}