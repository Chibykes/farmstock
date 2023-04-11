import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'
import { UserContext } from '../contexts/UserContext';
import { auth, get_single_doc } from '../hooks/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useLayoutEffect, useState } from 'react';

export default function App({ Component, pageProps }) {

  const [authUser] = useAuthState(auth);
  const [user, setUser] = useState(null);

  const [ userDetails, setUserDetails ] = useState({  });

  useLayoutEffect(() => {
    if(authUser){
      setUser(authUser);
      (async() => {
        setUserDetails(await get_single_doc("farms", authUser.uid));
      })()
    }
  }, [authUser]);

  return (
    <UserContext.Provider value={{ user, userDetails, setUserDetails }}>
      <Component {...pageProps} />
      <Toaster containerClassName='text-xs' />
    </UserContext.Provider>
  )
}
