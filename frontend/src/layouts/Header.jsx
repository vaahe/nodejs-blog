import React, { useState } from 'react';
import { styles } from '../styles/Header';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/features/user/userSlices';


export const Header = () => {
    const [isDropped, setIsDropped] = useState(false);
    const users = useSelector(selectUser);
    const firstChar = users.user.name.slice(0, 1);


    const handleDropdown = () => {
        setIsDropped(!isDropped);
    }

    const handleLogOut = () => {
        localStorage.removeItem('token');
    }

    return (
        <div className="fixed w-full border-b-black border z-30 flex bg-white dark:bg-[#0F172A] p-2 items-center justify-between h-16 px-10">
            <div className="logo ml-12 dark:text-white  transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
                Blog
            </div>

            <div className='flex flex-col items-center relative'>
                <button onClick={handleDropdown}>
                    <div className='flex items-center'>
                        <div className='h-[40px] w-[40px] rounded-full bg-green-700 text-white text-2xl text-center leading-[38px] font-semibold mx-2'>{firstChar}</div>
                        <span>{users.user.name}</span>
                    </div>
                </button>
                <div className={`${isDropped ? 'visible' : 'invisible'} ${styles.dropdown.main}`}>
                    <ul className={styles.dropdown.list}>
                        <Link to="/" className={styles.dropdown.listItem}>
                            Dashboard
                        </Link>

                        <Link to="/" className={styles.dropdown.listItem}>
                            Dashboard
                        </Link>

                        <Link to="/signin" className={styles.dropdown.listItem} onClick={handleLogOut}>
                            Sign out
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}
