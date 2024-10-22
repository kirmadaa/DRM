

import React, { memo, useState } from "react";
import { AddIcon, CodeIcon } from '../../../../assets/svgIcons'
import Styles from './styles'
import CardStyle from './styles/cardui'
// import Icons from './icons'
import ElementsList from './elements'
import { Edit } from "react-feather";

const ListOfFields = ({ selectedId, uiState, setUiState, itemInfo, setItemInfo, setSelectedId }) => {
    const [active, setActive] = useState('element')

    return (
        <div className="w-full p-0.5 flex justify-start">
            <div className="h-full border-r w-20 flex flex-col items-center">
                <div className="mb-5 w-full">
                    <div onClick={() => setActive('style')} role="button" className={`${active === 'style' ? 'bg-gray-200 text-primary w-full' : ''} w-full  p-1 hover:bg-primary hover:text-white text-gray-500 text-sm flex items-center flex-col`}>
                        <CodeIcon />
                        <p className="font-medium">Style</p>
                    </div>
                </div>
                <div className="mb-5 w-full">
                    <div onClick={() => setActive('cardStyle')} role="button" className={`${active === 'cardStyle' ? 'bg-gray-200 text-primary w-full' : ''} w-full  p-1 hover:bg-primary hover:text-white text-gray-500 text-sm flex items-center flex-col`}>
                        <Edit />
                        <p className="font-medium">Card</p>
                    </div>
                </div>
                <div className="mb-5 w-full">
                    <div onClick={() => setActive('element')} role="button" className={`${active === 'element' ? 'bg-gray-200 text-primary w-full' : ''} w-full  p-1 hover:bg-primary hover:text-white text-gray-500 text-sm flex items-center flex-col`}>
                        <AddIcon />
                        <p className="font-medium">Elements</p>
                    </div>
                </div>
            </div>
            {active === 'style' && <Styles setItemInfo={setItemInfo} setSelectedId={setSelectedId} uiState={uiState} setUiState={setUiState} selectedId={selectedId} itemInfo={itemInfo} />}
            {active === 'element' && <ElementsList
                uiState={uiState} setItemInfo={setItemInfo}
                setUiState={setUiState} itemInfo={itemInfo} />}
            {active === 'cardStyle' && <CardStyle uiState={uiState} setUiState={setUiState} />}
        </div>
    )
}

export default memo(ListOfFields);