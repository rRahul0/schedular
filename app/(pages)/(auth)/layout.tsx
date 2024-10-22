import React from 'react';
import { ReactNode } from 'react';

const AuthLayout:React.FC<{ children: ReactNode }> = ({ children }) => {
    return(
        <div className='flex justify-center pt-32 '>
            {children}
        </div>
    )
}
export default AuthLayout;