import Head from 'next/head'
import {useRouter} from 'next/router';

//firebase
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {oldFirebase} from "../firebase/clientApp";
import "firebase/compat/auth";

export default function Home() {

  //Next.js router
  const router = useRouter();

  // Firebase Auth
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/dashboard",
    // Google as the only included Auth Provider.
    // You could add and configure more here!
    signInOptions: [oldFirebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };

  // HTML
  return (
      <>
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
          <Head>
            <title>Hoos Here</title>
          </Head>
          {/*<Header />*/}
          <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
            <h1 className="text-6xl font-bold">
              This is a demo of <span className="font-bold">Hoos Here</span>
            </h1>
            <button
                className="hover:bg-blue-500 mt-5 bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg"
                onClick={() => router.push('/dashboard')}
                type={"button"}>
              Go to demo
            </button>
            <div className="p-3 bg-blue-500">
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={oldFirebase.auth()} />
            </div>
            <button onClick={() => oldFirebase.auth().signOut()}>
              Sign Out
            </button>
          </main>
        </div>
      </>
  );
}
