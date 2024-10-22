
const Stylebackground = ({ activeStyle, setActiveStyle, selectedId, uiState, setUiState }) => {
    const { field, styles, id, type } = selectedId

    const handleColor = (e) => {
        let afterUpdate = { ...uiState }
        afterUpdate['components']['children']?.map((it => {
            if (it?.id === id) {
                if (type === 'label') {
                    it['label']['styles']['backgroundColor'] = e.target.value
                } else if (type === 'value') {
                    it['value']['styles']['backgroundColor'] = e.target.value
                } else {
                    it['styles']['backgroundColor'] = e.target.value
                }
            }
            return it
        }))
        setUiState(afterUpdate)
    }

    return (
        <>
            <div className="border-b pb-2 p-2">
                <div className="flex justify-between items-center">
                    <h1 className="text-gray-600 uppercase">background</h1>
                    <input checked={activeStyle === 'background'} onChange={() => setActiveStyle('background')} id="checked-checkbox" type="checkbox" value="" className="w-6 h-6 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary" />
                </div>
                {activeStyle === 'background' && <div className="flex justify-between items-start mt-2">
                    <div>
                        <input value={styles?.backgroundColor} onChange={handleColor} className="w-20 border focus:outline-none rounded-md px-1 text-primary" />
                        <p className='text-xs'>Hex</p>
                    </div>
                    <input value={styles?.backgroundColor} onChange={handleColor} type="color" className="w-8 h-8 p-0 rounded-md" />
                </div>}
            </div>
        </>
    )
}

export default Stylebackground