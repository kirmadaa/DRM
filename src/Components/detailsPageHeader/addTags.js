import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function Addtags() {
    let [isOpen, setIsOpen] = useState(false)
    const [newTag, setNewTag] = useState('')
    const [listOfTags, setListOfTags] = useState('')

    const dispatch = useDispatch()
    const listOfTag = useSelector((state) => state.user?.listOfTags);

    useEffect(() => {
        if (listOfTag && typeof (listOfTag) == "object") {
            setListOfTags(listOfTag)
        } else {
            setListOfTags([])
        }
    }, [listOfTag])

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!listOfTags.includes(newTag) && newTag?.trim() !== '') {
            dispatch({ type: 'ADD_NEW_TAGS', data: [...listOfTags, newTag] })
            setNewTag('')
        } else if (newTag?.trim() !== '') {
            toast.error('This Tag already exists .')
        }
    }

    const deleteTags = (item) => {
        dispatch({ type: 'ADD_NEW_TAGS', data: listOfTags?.filter(tag => tag !== item) })
    }

    return (
        <>

            <div role='button' onClick={openModal} className='overflow-x-scroll  w-[300px] space-x-1 inline-flex justify-start outline-none text-xs px-3 py-0.5'>
                {console.log("listOfTagslistOfTags", listOfTags, listOfTags.length, typeof (listOfTags))}
                {(listOfTags && listOfTags?.length > 0) ?
                    listOfTags.map(tag => {
                        return <div className='min-w-max' key={tag}>
                            <span className='w-full bg-blue-100 text-blue-400 px-2 py-1 rounded-full font-[500]' >{tag} </span>
                        </div>
                    }) : 'Add tag'
                }
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
                                    <div className='flex justify-between items-center '>
                                        <p>Create New Tag</p>
                                        <button onClick={closeModal} className='border p-2 w-8 h-8 outline-none rounded-full  inline-flex justify-center items-center'>x</button>
                                    </div>
                                    <div>
                                        <form className='flex justify-start items-center space-x-2 my-2' onSubmit={handleSubmit}>
                                            <input value={newTag || ''} onChange={(e) => setNewTag(e.target.value)} className='w-full border p-2 outline-none rounded-lg ' placeholder='Tag name' />

                                            <button
                                                type="submit"
                                                className="bg-primary px-2 py-2 text-white rounded-md"
                                            >
                                                Create
                                            </button>
                                        </form>
                                        {/*  <div className='h-[300px] overflow-y-scroll mt-1 '>
                                            <div className='flex flex-wrap gap-1 '>
                                                {(listOfTags && listOfTags?.length > 0) ?
                                                    listOfTags?.map((tag, i) => {
                                                        return (
                                                            <button onClick={() => deleteTags(tag)} key={tag} className=' h-8 bg-amber-50 border border-amber-400 px-2 py-1 rounded-full inline-flex justify-start items-center'>
                                                                {tag}
                                                                <span className='w-6 h-6 ml-2 text-xs text-gray-500 inline-flex justify-center items-center border rounded-full bg-amber-300 '>x</span>
                                                            </button>
                                                        )
                                                    })
                                                    : null
                                                }
                                            </div>
                                        </div> */}
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
