
// import SearchList from './listOfResult'

import { memo, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { IPANEL_SEARCH } from '../../../Redux/actions/ipanel'
import { useSelector } from "react-redux"
import ScrollToBottom from "react-scroll-to-bottom"
import ItemResult from './item'
import { ArrowLeft, ArrowRight } from "feather-icons-react/build/IconComponents";
import ReactPaginate from "react-paginate";

const IpanelLayout = () => {
    const lastSearch = JSON.parse(localStorage.getItem('lastSearchOfIpanel'))
    const [searchHistory, setSearchHistory] = useState(lastSearch)
    const mainSearchResult = useSelector(state => state?.ipanelState?.mainSearchResult)
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(lastSearch?.start)

    const findData = (e) => {
        e.preventDefault()
        const debounceTimer = setTimeout(() => {
            if (query.trim()) {
                dispatch(IPANEL_SEARCH(0, 10, query.trim()))
            }
        }, 800)

        return () => {
            clearTimeout(debounceTimer)
        }
    }

    useMemo(() => {
        if (mainSearchResult?.list?.length > 0) {
            setSearchHistory(mainSearchResult)
            localStorage.setItem('lastSearchOfIpanel', JSON.stringify(mainSearchResult))
        }
    }, [mainSearchResult])


    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
        const newPage = page.selected + 1;
        if (newPage !== currentPage) {
            setCurrentPage(newPage);
            let end = Number(page.selected) === 0 ? 1 : Number(page.selected);
            dispatch(IPANEL_SEARCH(end * 10, (end * 10) + 10, query || searchHistory?.key));
        }
    }

    const count = Number(Math.ceil(searchHistory?.total / 10));
    return (
        <div className="relative h-screen">
            {searchHistory?.total > 0 && <div className="flex justify-between p-2">
                <h1 className="font-semibold text-primary">
                    {searchHistory?.total} Results ({searchHistory?.key})
                </h1>
                <div className="bg-white shadow rounded-[20px]">
                    <ReactPaginate
                        previousLabel={<ArrowLeft size={18} />}
                        nextLabel={<ArrowRight size={18} />}
                        pageCount={count || 1}
                        activeClassName='active'
                        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                        onPageChange={page => handlePagination(page)}
                        containerClassName={'pagination react-paginate gap-2 text-sm flex justify-end my-2'}
                    />
                </div>
            </div>}
            <ScrollToBottom className='h-screen'>
                {
                    searchHistory?.list?.map((item, i) => {
                        return (
                            <div key={item?.tid} className="px-2 grid gap-4 grid-cols-1 lg:grid-cols-1 md:grid-cols-1">
                                <ItemResult item={item} />
                            </div>
                        )
                    })
                }
                {mainSearchResult?.list?.length === 0 && <div className="min-h-[100px] flex justify-center flex-col items-center w-full border bg-gray-100 rounded-lg">
                    <h1 className="font-[500] text-primary">
                        No Result found for this query ({query})
                    </h1>
                </div>}
            </ScrollToBottom>
            <div className="fixed bottom-16 w-full flex justify-center">
                <form onSubmit={findData} className="bg-white flex justify-start items-center border w-6/12 my-2 px-2 right-0 h-12 shadow-lg  rounded-md">
                    <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search ...." className=" h-full focus:outline-none text-gray-500 rounded-md w-full px-2" />
                    <button type='submit' className=" focus:outline-none ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}
export default memo(IpanelLayout)