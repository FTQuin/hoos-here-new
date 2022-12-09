// ---- components ----
import Header from '../../components/Header';
import LiveAttendanceList from "../../components/AttendanceRecords/LiveAttendance/LiveAttendanceList";

// ---- firebase ----
import firebaseApp from "../../firebase/clientApp";
// database
import {equalTo, query, set, ref, getDatabase, orderByChild, get, push, child,} from 'firebase/database';
// auth
import { getAuth } from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth";
import {useEffect} from "react";
// ---- other ----
import {useRouter} from "next/router";
import { useQRCode } from 'next-qrcode';


export default function TakeAttendance() {
  // ---- vars ----
  //Next.js router
  const router = useRouter();
  let course_id = router.query.id;
  // QR code library
  const { Canvas } = useQRCode();

  // todo: add non authed behaviour
  // auth vars
  const [user, authLoading, authError] = useAuthState(getAuth(firebaseApp));

  // database refs
  let db = getDatabase();
  let courseRef = ref(db,'courses/' + course_id);
  // todo: change all 'u0' to real uid
  let userRef = ref(db, 'users/' + 'u0');

  // ---- logic ----
  // add date to course
  useEffect(() => {
    async function addDate() {
      let student_keys = {};
      await get(child(courseRef, "students")).then((s) => {
        s.forEach((s1) => {
          student_keys[s1.key] = 0;
        });
      });

      await push(child(courseRef, "dates"), {
        info: {
          "date": Date.now(),
        },
        records: student_keys
      }).then((s) => {
        set(child(courseRef, "info/openCourse"), s.key);
      });

    }

    if(user) addDate();
  }, [user]);

  return (
    <>
      <Header/>

      <main className="flex flex-col">
        <p className="text-lg m-auto">
          Scan so that we know Hoos Here
        </p>
        {/*QR Code*/}
        <div className="m-auto p-3 ">
          <Canvas
            text={'https://main.d1dl7joszkicd7.amplifyapp.com/attend/' + course_id}
            // text={window.location.origin + course_id}
            options={{
              type: 'image/jpeg',
              quality: 0.3,
              level: 'M',
              margin: 0,
              scale: 4,
              width: 300,
              color: {
                dark: '#0f172a',
                light: '#eeeeee',
              },
            }}
          />
        </div>
        {/*Live Attendance View*/}
        <div className="flex flex-col m-auto">
          <input id="liveAttendanceButton" type="checkbox" className="peer sr-only " />
          <label htmlFor="liveAttendanceButton" className="mt-4 bg-slate-700 p-3 rounded-lg transition hover:scale-105 hover:bg-slate-600 hover:shadow-lg hover:shadow-white/25">
            View Live Attendance
          </label>
          <div className="transition invisible peer-checked:visible opacity-0 peer-checked:opacity-100 pee m-auto p-3">
            <LiveAttendanceList />
          </div>
        </div>
      </main>
    </>
  );
}