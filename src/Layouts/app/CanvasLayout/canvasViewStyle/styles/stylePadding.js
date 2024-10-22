const StylePadding = ({ activeStyle, setActiveStyle, selectedId, uiState, setUiState }) => {
    const { field, styles, id, type } = selectedId


    const handleChange = (e) => {
        let { value, name } = e.target
        let afterUpdate = { ...uiState }
        afterUpdate['components']['children']?.map((it => {
            if (it?.id === id) {
                // if (type === 'label') {
                //     it['label']['styles'][name] = value
                // } else if (type === 'value') {
                //     it['value']['styles'][name] = value
                // } else {
                //     it['styles'][name] = value
                // }
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

    const handleChangeUnit = (e) => {
        let { value, name } = e.target
        let afterUpdate = { ...uiState }
        afterUpdate['components']['children']?.map((it => {
            if (it?.id === id) {
                if (type === 'label') {
                    it['label']['styles']['paddingUnit'] = value
                } else if (type === 'value') {
                    it['value']['styles']['paddingUnit'] = value
                } else {
                    it[field]['styles']['paddingUnit'] = value
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
                    <h1 className="text-gray-600 uppercase">padding</h1>
                    <input checked={activeStyle === 'padding'} onChange={() => setActiveStyle('padding')} id="checked-checkbox" type="checkbox" value="" className="w-6 h-6 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary" />
                </div>
                {activeStyle === 'padding' && <>
                    <div className="flex justify-between items-center mt-2">
                        <input type="range" value={styles?.paddingUnit || 0} onChange={handleChangeUnit} max={50} className="w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-primary/10 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:bg-primary" />
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-xs mb-1">Padding Style</p>
                            <select name="paddingType" onChange={handleChange} className=" focus:outline-none border px-1 rounded ">
                                <option value='padding'>Padding</option>
                                <option value='paddingTop'>Padding Top</option>
                                <option value='paddingLeft'>Padding Left</option>
                                <option value='paddingBottom'>Padding Bottom</option>
                                <option value='paddingRight'>Padding Right</option>
                            </select>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs mb-1">{styles?.radiusUnit}%</p>
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

export default StylePadding;