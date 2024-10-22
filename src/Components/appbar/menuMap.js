

import { Link } from 'react-router-dom'
import MenuList from './profileMenu'
import { useLocation } from 'react-router-dom'
import { Fragment } from 'react';
import Dropdown from './dropdown'

const MenuMap = () => {
    const location = useLocation();

    const activeStyle = 'bg-primary text-white';
    const inactiveStyle = 'text-gray-600 font-[200]';
    return (
        <div className="bg-white py-3 w-full hidden sm:flex  sm:space-x-8">
            {
                MenuList?.map((item, i) => {
                    let { path, title, icon } = item
                    return (
                        <Fragment key={title}>
                            {item.children ? <Dropdown currentpath={location?.pathname} item={item} /> : <Link
                                to={path}
                                key={i}
                                className={`inline-flex items-center px-2 rounded-lg py-0.5 leading-2 transition duration-150 ease-in-out ${path === location?.pathname ? activeStyle : inactiveStyle}`}
                            >
                                {icon}
                                <span className='ml-2'>{title}</span>
                            </Link>}
                        </Fragment>
                    )
                })
            }
        </div>
    )
}

export default MenuMap;