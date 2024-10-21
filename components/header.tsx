import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/favicon.ico';
import { Button } from './ui/button';
import { PenBox } from 'lucide-react';


const Header:React.FC = () => {
    return (
        <nav className="mx-auto py-2 px-4 flex justify-between items-center shadow-md border-b-2 ">
            <Link href={"/"} className="flex items-center">
                <Image src={logo} alt="logo" width={10} height={10} className='h-16 w-auto' />
            </Link>

            <div className='flex items-center gap-5'>
                <Link href={"events?create=true"}>
                    <Button className='flex items-center gap-2'>
                        <PenBox size={18} /> Create Event
                        </Button>
                </Link>
                <Button variant={'outline'}>
                    <Link href={'/sign-in'}>Sign In</Link>
                </Button>
            </div>
        </nav>
    )
}

export default Header;