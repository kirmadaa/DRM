import { Image } from "react-feather";

const getTitle = (value) => {
    let titleis = value
        ?.replace(/([A-Z])/g, " $1")
        ?.replace(/^./, function (str) {
            return str.toUpperCase();
        });
    return titleis.replace(/_/g, " ");
};

const images = {
    value: {
        data_type: 'image',
    },
    position: {
        startX: null,
        startY: null,

    },
    id: Math.random().toString(36).substr(2, 9) + new Date().getTime().toString(36),
    styles: {
        width: 100,
        height: 100,
        radiusType: "borderRadius",
        radiusUnit: "0",
        paddingUnit: "",
        paddingType: "padding",
        border: 0,
        borderColor: "",
        borderStyle: "solid",
        fontSize: 15,
        weight: 300,
        bold: false,
        font_style: "Normal",
        textAlign: "left",
        textTransform: "",
        italic: false,
        backgroundColor: "",
        labelAlign: "left",
        display: true
    }
}

const ElementsList = ({ itemInfo, uiState, setUiState, setItemInfo }) => {

    const addNewElement = (item) => {
        let copyState = { ...uiState }
        let copyItemState = { ...itemInfo }
        let afterRm = copyItemState['components']['children'].filter(it => it?.id !== item?.id)
        copyState['components']['children'].push(item)
        setUiState(copyState)
        setItemInfo({ components: { ...copyItemState['components'], children: afterRm} })
    }

    const addImage = () => {
        let copyState = { ...uiState }
        copyState['components']['children'].push(images)
        setUiState(copyState)
    }

    return (
        <div className='p-2 w-full'>
            <div className='mb-1 p-1 rounded-lg  bg-gray-100 w-full'>
                <div role="button" onClick={addImage} className='h-10 flex justify-start items-center'>
                    <Image className="text-gray-400 mr-1" size={16} />
                    <p className="text-primary txet">Image</p>
                </div>
            </div>
            {
                itemInfo?.components?.children?.map((item) => {
                    return (
                        <div className='mb-1 p-1 rounded-lg  bg-gray-100 w-full' key={item?.id}>
                            <div role="button" onClick={() => addNewElement(item)} className='flex justify-start items-center'>
                                <div>
                                    <p className="text-primary">{getTitle(item?.label?.field)}</p>
                                    <p className="text-xs text-gray-500">{typeof item?.value?.value === 'object' ? Object.values(item?.value?.value)[0] : item?.value?.value}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ElementsList;