import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Edit2 } from 'react-feather';
import { useDispatch } from 'react-redux';
import { UPDATE_USER_PROFILE_IMG } from '../../../../Redux/actions/userList';

export default function UpdateUserProfile({ avtar, selectedUser }) {
    let [isOpen, setIsOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch()

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleProfileUpdate = async () => {
        let base64Data = ''
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                base64Data = reader.result;
                let res = await dispatch(UPDATE_USER_PROFILE_IMG({ picture: base64Data }))
                if(res?.status === 200){
                    // dispatch()
                }
            };
            // Read the file as a data URL (Base64)
            reader.readAsDataURL(selectedFile);
        }
    }

    return (
        <>
            <div className="inset-0 flex items-center justify-center">
                <img
                    role='button'
                    onClick={openModal}
                    className="avatar object-cover h-[80px] w-[80px] min-w-[80px]"
                    src={avtar}
                    alt="Ash"
                />
            </div>

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
                        <div className="fixed inset-0 bg-black/25" />
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
                                        className="text-lg font-medium leading-6 "
                                    >
                                        Update Profile of {selectedUser?.lastName && <span className='text-primary'>( {selectedUser?.firstName}{" "}
                                            {selectedUser?.lastName})</span>}
                                    </Dialog.Title>
                                    <div className="flex items-center my-3">
                                        <label htmlFor="fileInput" className="w-full flex items-center flex-col relative cursor-pointer">
                                            <div className="group">
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    className="sr-only"
                                                    onChange={handleFileChange}
                                                />
                                                <div className="w-32 h-32 rounded-full overflow-hidden border border-primary">
                                                    {selectedFile ? (
                                                        <img
                                                            src={URL.createObjectURL(selectedFile)}
                                                            alt="Selected Avatar"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                            <Edit2 className="w-6 h-6" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="mt-2 text-sm font-medium text-blue-600 group-hover:text-blue-800">
                                                {selectedFile ? 'Change Avatar' : 'Upload Avatar'}
                                            </span>
                                        </label>
                                    </div>

                                    <div className="mt-4 flex justify-end ">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-primary/90 text-white px-4 py-2 text-sm font-medium  hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={handleProfileUpdate}
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
