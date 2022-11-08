// ---- components ----
import Header from "../components/Header";

// ---- firebase ----
import firebaseApp from "../firebase/clientApp";
// database
import {equalTo, query, set, ref, getDatabase, orderByChild, push, child} from 'firebase/database';
// auth
import { getAuth } from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth";

// ---- other ----
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useList} from "react-firebase-hooks/database";


export default function addCourse() {
  // ---- vars ----
  //Next.js router
  const router = useRouter();

  // auth vars
  const [user, authLoading, authError] = useAuthState(getAuth(firebaseApp));

  // database refs
  let db = getDatabase();
  let [userRef, setUserRef] = useState(null);
  let coursesRef = ref(db,'courses');

  useEffect(() => {
    // skip if authLoading, redirect to index if not authed
    if (authLoading) return;
    if (!user){
      router.push("/");
      return;
    }

    // set user ref once there is a user
    setUserRef(ref(db, 'users/' + user.uid));

  }, [authLoading]);

  // ---- logic ----
  // on submit handler
  let onSubmit = (e) => {
    e.preventDefault();
    let name = e.target[0].value;
    createCourse(name);
  };
  // create course handler
  function createCourse(name){
    if (name && user && userRef) {
      push(coursesRef, {
        'info': {
          'name': name,
          'prof': user.uid
        }
      }).then((c) => {
        set(child(userRef, 'courses/' + c.key), true);
        router.push('course/' + c.key);
      });
    } else {
      console.log('submit error');
    }
  }

  // ---- render ----
  return (
    <>
      <Header/>

      <main className="flex bg-slate-900 w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <form onSubmit={onSubmit}>
          <label htmlFor='courseName'>Course Name: </label>
          <input required className={'text-black'} type={'text'} name={'courseName'} size={30} id={'courseName'}/>
          <br/>
          <input type={'submit'} value={'Add Course'} />
        </form>
      </main>
    </>
  );
}