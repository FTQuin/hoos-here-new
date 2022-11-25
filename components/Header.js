// images
import logoPic from '../public/logo 3.png'

// other
import Image from 'next/image'
import {Router, useRouter} from 'next/router'

// firebase
import firebaseApp from "../firebase/clientApp"
import { useAuthState } from "react-firebase-hooks/auth";
import {getAuth} from "firebase/auth";

export default function Header() {

  //Next.js router
  const router = useRouter();

  // firebase
  const [user, loading, error] = useAuthState(getAuth(firebaseApp));

  let pic = user ? user.photoURL : null;
  let name = user ? user.displayName : "None";

  return (
      <>
        <header className="flex bg-slate-900 text-white justify-between items-center flex-row w-full"
                onClick={() => router.push('/')}>
          <div className="flex items-center p-2">
            <Image className="justify-start"
                   src={logoPic}
                   height="100%"
                   width="100%"
                   alt="🐦"
            />
            <h1 className="text-3xl font-serif font-bold">
              Hoos Here
            </h1>
          </div>
          <div className="flex flex-row items-center p-2">
            <p className="p-3">
              {name}
            </p>
            {/*TODO: make with Image tag*/}
            <img className="max-h-16 rounded-3xl"
                src={pic}>
            </img>
          </div>
        </header>
      </>
  );
}