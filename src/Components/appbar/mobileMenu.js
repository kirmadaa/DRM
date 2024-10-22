
import { Link, useLocation } from 'react-router-dom';
import MenuList from './profileMenu'
import Drawer from '../drawer'
import { useState } from 'react';

const MobileMenu = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false)

    const activeStyle = 'border-b border-orange-500 text-orange-500 font-medium';
    const inactiveStyle = 'text-gray-600';

    return (
        <div className="-mr-2 flex items-center sm:hidden">
            <button
                onClick={() => {
                    setIsOpen(true);
                }}
                className='inline-flex items-center justify-center w-10 h-10 rounded-md text-btnColorPrimary focus:outline-none focus:bg-gray-100 focus:text-gray-500'>
                <i className='text-2xl bx bx-menu'></i>
            </button>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className='flex flex-col p-2'>
                    {
                        MenuList?.map((item, i) => {
                            let { path, title, icon } = item
                            return (
                                <Link
                                    to={path}
                                    key={i}
                                    className={`hover:text-primary inline-flex items-center px-1 pt-1 leading-2 transition duration-150 ease-in-out ${path === location?.pathname ? activeStyle : inactiveStyle}`}
                                >
                                    {icon}
                                    <span className='ml-2'>{title}</span>
                                </Link>
                            )
                        })
                    }
                </div>
            </Drawer>
        </div>
    )
}

export default MobileMenu;