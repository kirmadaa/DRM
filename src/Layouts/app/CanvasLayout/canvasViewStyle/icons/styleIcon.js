import { Dialog, Transition } from '@headlessui/react'
import { Fragment, memo } from 'react'
import Icons from '.'
import { Eye, EyeOff, Trash2 } from 'react-feather'

const MyModal = ({
    openIcon,
    handleContact,
    item, icon, type,
    setOpenIcon,
    textStyle,
    lable,
    setUiState,
    uiState
}) => {

    const hideLable = () => {
        let copyUi = { ...uiState }
        copyUi['components']['children']?.map((el) => {
            if (item?.id === el?.id) {
                el['label']['styles']['display'] = !el?.label?.styles?.display
                return el
            }
        })
        setUiState(copyUi)
    }

    const deleteValues = () => {
        let copyUi = { ...uiState }
        let rm = copyUi['components']['children'].filter(el => el?.id !== item?.id)
        setUiState({ components: { ...copyUi['components'], children: rm } })
    }

    const ApplyOnAllColorIcon = (e) => {
        let { value } = e.target
        let afterUpdate = { ...uiState }
        afterUpdate['components']['children']?.map((el) => {
            if (el[type]?.icon) {
                el[type]['icon']['color'] = value
            } else {
                alert('Please select a icon')
            }
            return el
        })
        setUiState(afterUpdate)
    }

    const changeIconColor = (e) => {
        let { value } = e.target
        let afterUpdate = { ...uiState }
        afterUpdate['components']['children']?.map((el) => {
            if (el?.id === item?.id) {
                if (el[type]?.icon) {
                    el[type]['icon']['color'] = value
                }
            }
            return el
        })
        setUiState(afterUpdate)
    }

    return (
        <>
            <button role='button' onContextMenu={(e) => handleContact(e, item)} className="focus:outline-none flex justify-start items-center ">
                <span style={{ color: item[type]?.icon?.color}}>
                    {icon}
                </span>
                <span style={textStyle}>
                    {lable}
                </span>
            </button>

            <Transition appear show={(openIcon?.id === item?.id && openIcon?.type === type)} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={(e) => setOpenIcon(null)}>
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
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="div"
                                        className="font-[400] w-full leading-6 text-gray-900"
                                    >
                                        <div className='flex justify-between items-center'>
                                            <p className='text-gray-600'>{openIcon?.label?.field}</p>
                                            <div className='flex justify-between items-center space-x-2'>
                                                <p> Label (Hide/Display)</p>
                                                {item?.label?.styles?.display ? <Eye onClick={hideLable} className='text-red-400' size={18} /> : <EyeOff onClick={hideLable} className='text-red-400' size={18} />}
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <p className='text-gray-600'>{ typeof openIcon?.value?.value === 'object' ? Object.values(openIcon?.value?.value)[0] : openIcon?.value?.value || 'N/A'}</p>
                                            <div className='flex justify-between items-center space-x-2'>
                                                <p> Remove ({item?.label?.field})</p>
                                                <Trash2 onClick={deleteValues} className='text-red-400' size={18} />
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <p className='text-gray-600'>Apply Color on All Icon</p>
                                            <input type='color' value={item[type]?.icon?.color} onChange={ApplyOnAllColorIcon} />
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <p className='text-gray-600'>Select Icon Color</p>
                                            <input type='color' value={item[type]?.icon?.color} onChange={changeIconColor} />
                                        </div>
                                      
                                    </Dialog.Title>

                                    <div className='my-3 border-t'>
                                        <Icons
                                            item={item}
                                            uiState={uiState}
                                            setUiState={setUiState} />
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


export default memo(MyModal);