import SideAction from "./sideAction";
import Card from "./card";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_NEW_CANVAS_VIEW, GET_CANVAS_VIEW } from "../../../../Redux/actions/comman";
import { listOfDefaultPositions } from "../../../../utility/serviceMethod";
import { ModifyAndGetValueByModule } from '../../../../utility/canvasPositionBuilder'

const CanvasViewLayout = () => {
    const { modulename } = useParams()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search.split('?')[1])
    const listingPath = searchParams.get('listingPath')
    const [uiState, setUiState] = useState({})
    const [selectedId, setSelectedId] = useState('')
    const [itemInfo, setItemInfo] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handelSave = async () => {
        await dispatch(ADD_NEW_CANVAS_VIEW({ payload: uiState, moduleTitle: modulename }))
        navigate(listingPath)
    }

    const getCanvasView = async () => {
        let res = await dispatch(GET_CANVAS_VIEW(modulename))
        let uiIs = res?.data?.data?.canvasviewData[0]?.payload

        if (!uiIs) {
            let addedPositions = ModifyAndGetValueByModule(modulename)['components']['children']?.map((el, i) => {
                if (i < listOfDefaultPositions?.length) {
                    el['position'] = listOfDefaultPositions[i]
                }
                return el
            })
            let rmNoPositions = addedPositions?.filter(el => el?.position?.startX !== null && el?.position?.startY !== null)
            rmNoPositions.push({
                id:
                    Math.random().toString(36).substr(2, 9) +
                    new Date().getTime().toString(36),
                position: { startX: 18, startY: 20 },
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
                },
                value: { data_type: 'image' }
            })
            setUiState({ components: { children: rmNoPositions, border: 1, borderStyle: 'solid' }, icons: [] })
        } else {
            setUiState(uiIs || { components: { children: [], border: 1, borderStyle: 'solid' }, icons: [] })
        }
        setItemInfo(ModifyAndGetValueByModule(modulename))
    }

    useEffect(() => {
        getCanvasView()
    }, [])

    return (
        <div>
            <div className="space-x-1 my-2 flex justify-start">
                <div className="w-1/4 Z-50 bg-white h-full">
                    <SideAction setSelectedId={setSelectedId} itemInfo={itemInfo} setItemInfo={setItemInfo} uiState={uiState} setUiState={setUiState} selectedId={selectedId} />
                </div>
                <div className="w-3/4 relative mx-2">
                    <div className="flex justify-end rounded-md p-2 shadow my-2 bg-white">
                        <button className="bg-primary px-3 py-2 rounded-xl text-white" onClick={handelSave}>
                            Save
                        </button>
                    </div>
                    <Card
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        uiState={uiState} setUiState={setUiState} />
                </div>
            </div>
        </div>
    )
}

export default CanvasViewLayout;