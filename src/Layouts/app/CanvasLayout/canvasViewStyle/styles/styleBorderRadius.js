const StyleBorderRadius = ({ activeStyle, setActiveStyle, selectedId, uiState, setUiState }) => {
    const { field, styles, id, type } = selectedId

    const handleChange = (e) => {
        let { value, name } = e.target
        let afterUpdate = { ...uiState }

        afterUpdate['components']['children']?.map((it => {
            if (it?.id === id) {
                if (type === 'label') {
                    it['label']['styles'][name] = value
                } else if (type === 'value') {
                    it['value']['styles'][name] = value
                }
            }
            return it
        }))
        setUiState(afterUpdate)
    }

    const handleChangeUnit = (e) => {
        let afterUpdate = { ...uiState }
        afterUpdate['components']['children']?.map((it => {
            if (it?.id === id) {
                if (type === 'label') {
                    it['label']['styles']['radiusUnit'] = e.target.value
                } else if (type === 'value') {
                    it['value']['styles']['radiusUnit'] = e.target.value
                } else {
                    it['styles']['radiusUnit'] = e.target.value
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
                    <h1 className="text-gray-600 uppercase">Radius Unit</h1>
                    <input checked={activeStyle === 'radius'} onChange={() => setActiveStyle('radius')} id="checked-checkbox" type="checkbox" value="" className="w-6 h-6 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary" />
                </div>
                {activeStyle === 'radius' && <>
                    <div className="flex justify-between items-center mt-2">
                        <input type="range" value={styles?.radiusUnit || 0} onChange={handleChangeUnit} max={50} className="w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-primary/10 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:bg-primary" />
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-xs mb-1">Border Style</p>
                            <select name="radiusType" onChange={handleChange} className=" focus:outline-none border px-1 rounded ">
                                <option value='borderRadius'>Border Radius</option>
                                <option value='borderTopLeftRadius'>Top Left</option>
                                <option value='borderTopRightRadius'>Top Right</option>
                                <option value='borderBottomLeftRadius'>Bottom Left</option>
                                <option value='borderBottomRightRadius'>Bottom Right</option>
                            </select>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs mb-1">{styles?.radiusUnit}px</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs mb-1">Style</p>
                        <div className="w-full h-6" style={{
                            border: `${styles?.border}px ${styles?.borderStyle} ${styles?.borderColor}`
                        }} />
                    </div>
                </>}
            </div>
        </>
    )
}

export default StyleBorderRadius;