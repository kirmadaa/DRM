import FolderAction from './folderAction'
import FolderHeader from './folderHeader';

const Folders = ({ valueandhooks }) => {
    const { listOfFolders, setSelectedType, selectedType } = valueandhooks

    return (
        <div className="w-full">
            <FolderHeader />
            <div
                role='button'
                onClick={() => setSelectedType(null)}
                className={`${selectedType === null ? 'bg-gray-50' : ''} p-2  w-full border-b cursor-pointer group hover:bg-gray-100 hover:text-primary text-gray-600`}>
                <div className='w-full flex justify-between items-center'>
                    All Reports
                </div>
            </div>
            {
                listOfFolders?.map((folder) => {
                    return (
                        <div
                            title={folder?.folderDescription}
                            role='button'
                            onClick={() => setSelectedType(folder)}
                            key={folder?._id}
                            className={`${selectedType?._id === folder?._id ? 'bg-gray-50' : ''}  w-full border-b cursor-pointer group hover:bg-gray-100 hover:text-primary text-gray-600 px-2 py-1`}>
                            <div className='w-full flex justify-between items-center'>
                                <span>
                                    {folder?.folderName}
                                </span>
                                <FolderAction folder={folder} folderid={folder?._id} />
                            </div>
                            <small className='truncate'>{folder?.folderDescription}</small>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Folders;