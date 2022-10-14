// ---- components ----
import Header from '../../components/Header';
import ClassSummaryTable from '../../components/AttendanceRecords/ClassSummary/ClassSummaryTable';

// ---- other ----
import {useRouter} from "next/router";

// ---- firebase ----
import firebaseApp from "../../firebase/clientApp";
// database
import { child, ref, getDatabase, } from 'firebase/database';
import { useObjectVal } from "react-firebase-hooks/database";
// auth
import { getAuth } from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth";


export default function Course() {
  // ---- vars ----

  // todo: add non authed behaviour
  // auth vars
  const [user, authLoading, authError] = useAuthState(getAuth(firebaseApp));

  // router
  const router = useRouter();
  let course_id = router.query.id;

  // database refs
  let db = getDatabase();
  let courseRef = ref(db, 'classes/' + course_id);

  // courseName var
  const [courseName, courseNameLoading, courseNameError] = useObjectVal(child(courseRef, 'info/name'));

  // ---- render ----
  return (
      <>
        <Header/>
        <main className="flex flex-col justify-center align-middle">
          {courseName &&
            <h1 className="text-3xl p-2 mx-auto">
              {courseName}
              <span>⚙</span>
            </h1>
          }
          <div className="p-4">
            <ClassSummaryTable course_id={course_id} course_ref={courseRef}/>
          </div>

        </main>
      </>
  );
}