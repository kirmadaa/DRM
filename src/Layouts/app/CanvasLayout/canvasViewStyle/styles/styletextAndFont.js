import Textsize from "./textSize";
import FontStyles from './fontStyle'

const StyletextAndFont = ({ activeStyle, setActiveStyle, selectedId, uiState, setUiState }) => {
    const { field, styles, id, type } = selectedId

    const handleColor = (e) => {
        let { value } = e.target
        let afterUpdate = { ...uiState }
        afterUpdate['components']['children']?.map((it => {
            if (it?.id === id) {
                if (type === 'label') {
                    it['label']['styles']['color'] = value
                } else if (type === 'value') {
                    it['value']['styles']['color'] = value
                } else {
                    it['styles']['color'] = value
                }
            }
            return it
        }))
        setUiState(afterUpdate)
    }

    const handleFontStyle = (font) => {
        let afterUpdate = { ...uiState }
        afterUpdate['components']['children']?.map((it => {
            if (it?.id === id) {
                if (type === 'label') {
                    it['label']['styles']['weight'] = font?.weight
                    it['label']['styles']['font_style'] = font?.font_style
                    it['label']['styles']['italic'] = font?.italic
                } else if (type === 'value') {
                    it['value']['styles']['weight'] = font?.weight
                    it['value']['styles']['font_style'] = font?.font_style
                    it['value']['styles']['italic'] = font?.italic
                } else {
                    it['styles']['weight'] = font?.weight
                    it['styles']['font_style'] = font?.font_style
                    it['styles']['italic'] = font?.italic
                }
            }
            return it
        }))
        setUiState(afterUpdate)
    }

    const handletextDecoration = (style, name) => {
        let afterUpdate = { ...uiState }
        afterUpdate['components']['children']?.map((it => {
            if (it?.id === id) {
                if (type === 'label') {
                    if (it['label']['styles'][name]) {
                        delete it['label']['styles'][name]
                    } else {
                        it['label']['styles'][name] = style
                    }
                }
                if (type === 'value') {
                    if (it['value']['styles'][name]) {
                        delete it['value']['styles'][name]
                    } else {
                        it['value']['styles'][name] = style
                    }
                }
            }
            return it
        }))
        setUiState(afterUpdate)
    }

    return (
        <div className="border-b pb-4 p-2">
            <div className="flex justify-between items-center">
                <h1 className="text-gray-600 uppercase">Text Style</h1>
                <input checked={activeStyle === 'text'} onChange={() => setActiveStyle('text')} id="checked-checkbox" type="checkbox" className="w-6 h-6 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary" />
            </div>
            {activeStyle === 'text' && <>
                <div className="py-2">
                    <div className="flex justify-between items-center">
                        <input value={styles?.color || ''} onChange={handleColor} type="text" className="rounded-md focus:outline-none border w-28" />
                        <input value={styles?.color || ''} onChange={handleColor} type="color" className="w-8 h-8 rounded-md" />
                    </div>
                    <div className="mt-2 flex justify-between items-center space-x-1">
                        <Textsize textSize={styles?.fontSize} handletextDecoration={handletextDecoration} />
                        <FontStyles styles={styles} handleFontStyle={handleFontStyle} />
                    </div>
                </div>
                <div className="grid grid-cols-6 px-2 gap-1">
                    <button onClick={() => handletextDecoration('capitalize', 'textTransform')} className={`font-semibold hover:bg-primary/10 w-full h-10 hover:text-primary ${styles?.textTransform === 'capitalize' ? 'bg-primary text-white' : ''}`}>
                        Aa
                    </button>
                    <button onClick={() => handletextDecoration('lowercase', 'textTransform')} className={`font-semibold hover:bg-primary/10 w-full h-10 hover:text-primary ${styles?.textTransform === 'lowercase' ? 'bg-primary text-white' : ''}`}>
                        aa
                    </button>
                    <button onClick={() => handletextDecoration('line-through', 'textDecoration')} title="cute" className={`line-through font-semibold hover:bg-primary/10 w-full h-10 hover:text-primary ${styles?.textDecoration === 'line-through' ? 'bg-primary text-white' : ''}`}>
                        aa
                    </button>
                    <button onClick={() => handletextDecoration('left', 'textAlign')} className={`line-through font-semibold hover:bg-primary/10 w-full h-10 hover:text-primary ${styles?.align === 'left' ? 'bg-primary text-white' : ''}`}>
                        <i className='bx bx-align-left' />
                    </button>
                    <button onClick={() => handletextDecoration('center', 'textAlign')} className={`line-through font-semibold hover:bg-primary/10 w-full h-10 hover:text-primary ${styles?.align === 'center' ? 'bg-primary text-white' : ''}`}>
                        <i className='bx bx-align-middle' />
                    </button>
                    <button onClick={() => handletextDecoration('right', 'textAlign')} className={`line-through font-semibold hover:bg-primary/10 w-full h-10 hover:text-primary ${styles?.align === 'right' ? 'bg-primary text-white' : ''}`}>
                        <i className='bx bx-align-right' />
                    </button>
                </div>
            </>}
        </div>
    )
}


export default StyletextAndFont;