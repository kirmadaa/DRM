import CreateNewFolder from './createNewFolder'

const FolderHeader = () => {
    return (
        <div className="py-2 w-full px-2 p-1">
            <div className="flex justify-between items-center ">
                <h1 className="text-lg font-semibold">Folders</h1>
                <CreateNewFolder />
            </div>
        </div>
    )
}
export default FolderHeader