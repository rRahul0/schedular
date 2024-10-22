import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/favicon.ico';
import { checkUser } from '@/lib/checkUser';
import { Button } from './ui/button';
import UserMenu from '@/components/user-menu';
import { PenBox } from 'lucide-react';
import {
    SignInButton,
    SignedIn,
    SignedOut
} from '@clerk/nextjs'

const Header: React.FC = async() => {
    await checkUser();
    return (
        <nav className="mx-auto py-2 px-4 flex justify-between items-center shadow-md border-b-2 bg-white">
            <Link href={"/"} className="flex items-center">
                <Image src={logo} alt="logo" width={10} height={10} className='h-16 w-auto' />
            </Link>

            <div className='flex items-center gap-5'>
                <Link href={"events?create=true"}>
                    <Button className='flex items-center gap-2'>
                        <PenBox size={18} /> Create Event
                    </Button>
                </Link>
                <SignedOut>
                    <SignInButton forceRedirectUrl="/dashboard">
                        <Button variant={'outline'}> Sign In </Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserMenu />
                </SignedIn>
            </div>
        </nav>
    )
}

export default Header;