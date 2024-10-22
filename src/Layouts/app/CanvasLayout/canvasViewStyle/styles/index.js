import { memo, useState } from "react";
import StyleHeightWidth from './styleHeightWidth';
import StyleBorderRadius from './styleBorderRadius';
import StylePadding from './stylePadding';
import StyleBorder from './styleBorder'
import StyletextAndFont from './styletextAndFont'
import Stylebackground from './stylebackground';

const Styles = (props) => {
    const { selectedId, uiState, setUiState } = props
    const { field, child,
    } = selectedId
    const [activeStyle, setActiveStyle] = useState('')

    return (
        <div className="w-full">
            {(field !== undefined || child) ? <>
                <StyletextAndFont activeStyle={activeStyle} setActiveStyle={setActiveStyle} uiState={uiState} selectedId={selectedId} setUiState={setUiState} />
                <Stylebackground activeStyle={activeStyle} setActiveStyle={setActiveStyle} uiState={uiState} selectedId={selectedId} setUiState={setUiState} />
                <StyleBorder activeStyle={activeStyle} setActiveStyle={setActiveStyle} uiState={uiState} selectedId={selectedId} setUiState={setUiState} />
                <StyleBorderRadius activeStyle={activeStyle} setActiveStyle={setActiveStyle} uiState={uiState} selectedId={selectedId} setUiState={setUiState} />
                <StyleHeightWidth activeStyle={activeStyle} setActiveStyle={setActiveStyle} uiState={uiState} selectedId={selectedId} setUiState={setUiState} />
                <StylePadding activeStyle={activeStyle} setActiveStyle={setActiveStyle} uiState={uiState} selectedId={selectedId} setUiState={setUiState} />
            </> : <div className="h-full text-primary flex justify-center items-center ">
                <h1>Click a element to style </h1>
            </div>}
        </div>
    )
}

export default memo(Styles);