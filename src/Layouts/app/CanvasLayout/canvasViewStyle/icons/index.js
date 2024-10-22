import { memo } from 'react'
import { featherIconsMock } from '../../../../../assets/icons/mockdata'

const getActive = (item, type, name) => {
    try {
        return item[type]['icon']['icon'] === name
    } catch (error) {
        return false
    }
}
const Icons = ({ uiState, setUiState, item }) => {
    const { type, id } = item

    const handleAddIcon = (icon) => {
        let copyUi = { ...uiState }
        copyUi['components']['children']?.map((item) => {
            if (item?.id === id) {
                if (item[type]?.icon?.icon) {
                    delete item[type]['icon']
                } else {
                    item[type]['icon'] = { icon, color: '', size: '' }
                }
            }
            return item
        })
        setUiState(copyUi)
    }

    return (
        <div className='w-full'>
            <div className='w-full overflow-scroll grid gap-2 grid-cols-9 p-3 px-2'>
                {Object.keys(featherIconsMock)?.map(((icon, i) => {
                    return (
                        <button onClick={() => handleAddIcon(icon)} key={i} className={` ${getActive(item, type, icon) ? 'bg-primary text-white' : 'text-gray-500 '} focus:outline-none rounded-md h-12 flex justify-center items-center shadow-md p-2`}>
                            {featherIconsMock[icon]}
                        </button>
                    )
                }))}
            </div>
        </div>
    )
}
export default memo(Icons);