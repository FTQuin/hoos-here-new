// ---- components ----
import CourseCard from "../components/CourseCard";
import Header from '../components/Header';

// ---- firebase ----
import firebaseApp from "../firebase/clientApp";
// database
import { equalTo, query, ref, getDatabase, orderByChild, } from 'firebase/database';
import { useList } from "react-firebase-hooks/database";
// auth
import { getAuth } from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth";


export default function Dashboard() {

  // todo: add non authed behaviour
  // auth vars
  const [user, authLoading, authError] = useAuthState(getAuth(firebaseApp));

  // database refs
  let db = getDatabase();
  let coursesRef = ref(db,'classes');
  // todo: change all 'u0' to real uid
  let userRef = ref(db, 'users/' + 'u0');

  // course list hook
  // todo: add '.indexOn': 'info/prof' to security rules of /classes
  let q = query(coursesRef, orderByChild('info/prof'), equalTo('u0'))
  const [courseSnapshots, courseSnapLoading, courseSnapError] = useList(q);

  // render
  return (
      <>
        <Header/>
        <main
            className="flex bg-slate-900 w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="text-white p-2 text-3xl">
            Courses:
          </h1>
          <ul className="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
            {courseSnapshots.map((courseSnapshot) => (
                <li key={courseSnapshot.key}>
                  <CourseCard  key={courseSnapshot.key} course_id={courseSnapshot.key} course_name={courseSnapshot.child('info/name').val()}/>
                </li>
            ))}
            <li className="hover:bg-blue-500 bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg">
              Add Course
            </li>
          </ul>
        </main>
      </>
  );
}