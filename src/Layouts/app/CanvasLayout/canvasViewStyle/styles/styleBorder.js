const StyleBorder = ({ activeStyle, setActiveStyle, selectedId, uiState, setUiState }) => {
    const { field, styles, id, type } = selectedId

    const handleChange = (name, value) => {
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
                    <h1 className="text-gray-600 uppercase">border</h1>
                    <input checked={activeStyle === 'border'} onChange={() => setActiveStyle('border')} id="checked-checkbox" type="checkbox" value="" className="w-6 h-6 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary" />
                </div>
                {activeStyle === 'border' && <>
                    <div className="flex justify-between items-center mt-2">
                        <input type="range" value={Number(styles?.border || 0)} onChange={(e) => handleChange('border', e.target.value)} max={10} className="w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-primary/10 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:bg-primary" />
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-xs mb-1">Border Style</p>
                            <select value={styles?.borderStyle} onChange={(e) => handleChange('borderStyle', e.target.value)} className=" focus:outline-none border px-1 rounded ">
                                <option value='dotted'>dotted</option>
                                <option value='dashed'>dashed</option>
                                <option value='solid'>solid</option>
                                <option value='double'>double</option>
                                <option value='groove'>groove</option>
                                <option value='ridge'>ridge</option>
                                <option value='inset'>inset</option>
                                <option value='outset'>outset</option>
                                <option value='none'>none</option>
                            </select>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs mb-1">Color</p>
                            <input value={styles?.borderColor} onChange={(e) => handleChange('borderColor', e.target.value)} type="color" className="w-8 h-8 p-0 rounded-md" />
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs py-2">Style</p>
                        <div className="w-full h-6" style={{
                            border: `${styles?.border}px ${styles?.borderStyle} ${styles?.borderColor}`
                        }} />
                    </div>
                </>}
            </div>
        </>
    )
}


export default StyleBorder;