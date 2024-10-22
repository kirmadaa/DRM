import { Dialog, Transition } from '@headlessui/react'
import { Fragment, memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { UPDATE_FOLDER, GET_LIST_OF_FOLDERS } from "../../../../Redux/actions/reports";

const EditFolder = ({ valueHooks }) =>{
  const {folder, isOpen, setIsOpen} = valueHooks
  const dispatch = useDispatch()
  const [payload, setPayload] = useState(folder)

  function closeModal() {
    setIsOpen(false)
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    setPayload({ ...payload, [name]: value })
  }


  const editNewFolder = async () => {
    let data = {
      folderId : folder?._id,
      description : payload?.description || payload?.folderDescription,
      name : payload?.name || payload?.folderName,
    }
    let res = await dispatch(UPDATE_FOLDER(data))
    if (res?.status === 200) {
      setIsOpen(false)
      dispatch(GET_LIST_OF_FOLDERS())
    }
  }

  return (
    <>
    
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Update Folder ({payload?.name || payload?.folderName })
                  </Dialog.Title>
                  <div className="mt-2">
                    <p>Name</p>
                    <input onChange={handleChange} value={payload?.name || payload?.folderName } name='name' className='border p-1 w-full rounded-md px-1 focus:outline-none' placeholder='Folder name ' />

                    <p className='mt-3'>Description</p>
                    <textarea rows={2} onChange={handleChange} value={payload?.description || payload?.folderDescription} name='description' className='border p-1 w-full rounded-md px-1 focus:outline-none' placeholder='Description ....' />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={editNewFolder}
                    >
                      Update
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default memo(EditFolder)
