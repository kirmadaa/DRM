
const ItemResult = ({ item }) => {
    let { buildingName, documentName, address, area, locality, sellerName } = item
    return (
        <div className="px-2 pb-2 bg-white rounded-lg shadow  w-full transition ease-in-out delay-0 hover:-translate-2 hover:border hover:border-btnColorPrimary  hover:shadow-md hover: duration-300 ">
            <div className="flex justify-start items-center">
                <div className=" w-5/12 flex justify-start items-center space-x-1">
                    <i className='bx bx-building-house text-gray-400 text-xl' />
                    <h1 className="capitalize text-lg text-gray-600 font-[300] ">
                        {buildingName || 'N/A'}
                    </h1>
                </div>
                <div className="w-7/12 mt-2 grid grid-2 grid-cols-3 gap-3">
                    <div className=" border-r flex-col flex justify-center ">
                        <p className="text-primary font-[400]">{area || 'N/A'}</p>
                        <p className="text-gray-500 font-[300] text-xs">SQF</p>
                    </div>
                    <div className=" border-r flex-col flex justify-center ">
                        <p className="text-primary font-[400]">{locality || 'N/A'} </p>
                        <p className="text-gray-500 font-[300] text-xs">Locality</p>
                    </div>
                    <div>
                        <p className="text-primary font-[400] capitalize">{documentName || 'N/A'}</p>
                        <p className="text-gray-500 font-[300] text-xs">Document Name</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-start items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-500">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <p className="ml-1 text-gray-500 text-sm font-[300]">{address || 'N/A'}</p>
            </div>
        </div>
    )
}

export default ItemResult