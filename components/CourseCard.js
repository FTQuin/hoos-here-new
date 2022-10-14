import React from "react";
import {useRouter} from "next/router";

export default function CourseCard({course_id, course_name}) {

  //Next.js router
  const router = useRouter();

  return (
      <>
        <main className="bg-slate-700 hover:shadow-md group rounded-md p-3">
          <h3 className="text-white text-lg">
            {course_name}
          </h3>
          <button className="hover:bg-blue-900 text-white text-sm font-medium py-2 px-3 rounded-md"
                  onClick={() => router.push('/take-attendance/' + course_id)}>
            Take attendance
          </button>
          <button className="hover:bg-blue-900 text-white text-sm font-medium py-2 px-3 rounded-md"
                  onClick={() => router.push('/course/' + course_id)}>
            Course Summary
          </button>
        </main>
      </>
  );
}