

const CardUI = ({ uiState, setUiState }) => {

    const handleChange = (e) => {
        let { value, name } = e.target
        let copy = { ...uiState }
        copy[name] = value
        setUiState(copy)
    }

    const handleChangeUnit = (e) => {
        let { value } = e.target
        let copy = { ...uiState }
        copy['radiusUnit'] = value
        setUiState(copy)
    }

    return (
        <div className="w-full p-2">
            <div className="py-2">
                <div className="border-b py-2 ">
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-sm">Width</p>
                        <input name="width" type="text" value={uiState['components']?.width} placeholder="auto, 1, etc.." onChange={handleChange} className="w-1/2 focus:outline-none bg-gray-300 px-2 text-gray-500 rounded-md border appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-primary/10 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:bg-primary" />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-sm">Height</p>
                        <input name="height" type="text" value={uiState['components']?.height} placeholder="auto, 1, etc.." onChange={handleChange} className="w-1/2 focus:outline-none bg-gray-300 px-2 text-gray-500 rounded-md border appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-primary/10 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:bg-primary" />
                    </div>
                </div>

                <div className="border-b py-2 flex justify-between items-start">
                    <div>
                        <input value={uiState['components']?.backgroundColor} name="background" onChange={handleChange} className="w-20 border focus:outline-none rounded-md px-1 text-primary" />
                        <p className='text-xs'>Background</p>
                    </div>
                    <input value={uiState['components']?.backgroundColor} name="background" onChange={handleChange} type="color" className="w-8 h-8 p-0 rounded-md" />
                </div>

                <div className="border-b py-2">
                    <div className="flex justify-between items-center">
                        <h1 className="text-gray-600">Radius Unit</h1>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <input type="range" value={Number(uiState?.radiusUnit) || 0} onChange={handleChangeUnit} max={50} className="w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-primary/10 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:bg-primary" />
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-xs mb-1">Border Style</p>
                            <select name="radiusType" onChange={handleChange} className=" focus:outline-none border px-1 rounded ">
                                <option value=''>Radius Type</option>
                                <option value='borderRadius'>Border Radius</option>
                                <option value='borderTopLeftRadius'>Top Left</option>
                                <option value='borderTopRightRadius'>Top Right</option>
                                <option value='borderBottomLeftRadius'>Bottom Left</option>
                                <option value='borderBottomRightRadius'>Bottom Right</option>
                            </select>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs mb-1">{uiState?.radiusUnit}px</p>
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <div className="w-full py-1.5">
                        <p className="text-gray-500 text-xs mb-1">Border Type</p>
                        <select name="borderType" onChange={handleChange} className="w-full focus:outline-none border px-1 rounded ">
                            <option value=''>Border Type</option>
                            <option value='border'>Border</option>
                            <option value='borderLeft'> Left</option>
                            <option value='borderRight'> Right</option>
                            <option value='borderBottom'> Bottom</option>
                            <option value='borderTop'> Top</option>
                        </select>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <input type="range" value={Number(uiState?.border || 0)} name="border" onChange={handleChange} max={10} className="w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-primary/10 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:bg-primary" />
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-xs mb-1">Border Style</p>
                            <select value={uiState?.borderStyle} name="borderStyle" onChange={handleChange} className=" focus:outline-none border px-1 rounded ">
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
                            <input value={uiState?.borderColor || '#959798'} name="borderColor" onChange={handleChange} type="color" className="w-8 h-8 p-0 rounded-md" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CardUI;