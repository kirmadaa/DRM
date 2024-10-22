const StyleHeightWidth = ({ activeStyle, setActiveStyle, selectedId, uiState, setUiState }) => {
    const { styles, id, type } = selectedId

    const handleChange = (e) => {
        let { value, name } = e.target
        let afterUpdate = { ...uiState }
        afterUpdate['components']['children']?.map((it => {
            if (it?.id === id) {
                if (type === 'label') {
                    it['label']['styles'][name] = value
                } else if (type === 'value') {
                    it['value']['styles'][name] = value
                } else {
                    it['styles'][name] = value
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
                    <h1 className="text-gray-600 uppercase">height x width</h1>
                    <input checked={activeStyle === 'widthnheight'} onChange={() => setActiveStyle('widthnheight')} id="checked-checkbox" type="checkbox" value="" className="w-6 h-6 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary" />
                </div>
                {activeStyle === 'widthnheight' && <>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-sm">Width</p>
                        <input name="width" type="text" value={styles?.width} placeholder="auto, 1, etc.." onChange={handleChange} className="w-1/2 focus:outline-none bg-gray-300 px-2 text-gray-500 rounded-md border appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-primary/10 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:bg-primary" />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-sm">Height</p>
                        <input name="height" type="text" value={styles?.height} placeholder="auto, 1, etc.." onChange={handleChange} className="w-1/2 focus:outline-none bg-gray-300 px-2 text-gray-500 rounded-md border appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-primary/10 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:bg-primary" />
                    </div>
                </>}
            </div>
        </>
    )
}

export default StyleHeightWidth