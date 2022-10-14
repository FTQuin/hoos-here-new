import Header from '../../components/Header';
import LiveAttendanceList from "../../components/AttendanceRecords/LiveAttendance/LiveAttendanceList";

import {useRouter} from "next/router";
import { useQRCode } from 'next-qrcode';


export default function TakeAttendance() {

  const router = useRouter();
  let course_name = router.query.id;
  const { Canvas } = useQRCode();

  return (
      <>
        <Header/>
        <main className="flex flex-col">
          <p className="text-lg m-auto">
            Scan so that we know Hoos Here
          </p>
          <div className="m-auto p-3 ">
            <Canvas
                text={'https://github.com/bunlong/next-qrcode'}
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