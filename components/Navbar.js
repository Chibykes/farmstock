import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { BsArrowLeft } from "react-icons/bs"
import { UserContext } from "../contexts/UserContext";
import { signOut } from "../hooks/firebase";


export default function Navbar({ text, noback }) {

    const router = useRouter();
    const { user, setUser, setUserDetails } = useContext(UserContext);

    return(
        <nav className='print:hidden flex justify-between items-center'>

            <div className="space-y-4">
                <p className='
                    relative font-bold 
                    after:bg-lime-600 after:absolute after:-bottom-2 after:left-0
                    after:h-1 after:w-full
                '>{text}</p>

                {!noback && 
                    <p 
                        className="
                            inline-flex gap-2 items-center
                            bg-lime-300 text-green-900 text-xs 
                            rounded-full px-4 py-1 font-bold
                        "
                        onClick={() => router.back()}
                    >
                        <BsArrowLeft />
                        Go Back
                    </p>
                }
            </div>


            <div className='' onClick={() => { 
                    signOut();
                    setUser(null);
                    setUserDetails(null);
                    router.push('/') 
                }}>
                <div className='w-14 h-14 grid place-content-center border-[3px] border-lime-600 rounded-full'>
                    <div className='relative w-12 h-12 rounded-full overflow-hidden'>
                    <Image
                        className="object-cover"
                        src={user?.photoURL}
                        alt="" 
                        fill
                    />
                    </div>
                </div>
            </div>

        </nav>
    )

}