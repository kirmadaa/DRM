import Draggable from 'react-draggable'; // The default
import defaultImage from '../../../../assets/other/default.jpg'
import { featherIconsMock } from '../../../../assets/icons/mockdata'
import { memo, useState } from 'react';
import moment from 'moment';
import StyleIcon from './icons/styleIcon';

const getTitle = (value) => {
  let titleis = value
    ?.replace(/([A-Z])/g, " $1")
    ?.replace(/^./, function (str) {
      return str.toUpperCase();
    });
  return titleis.replace(/_/g, " ");
};


export const isValueIsDate = (value, key) => {
  let keynames = ['createdAt', 'updatedAt', 'createdTime', 'updatedTime']
  return keynames.includes(key) ? moment(value).format('DD/MM/YYYY') : (typeof value === 'object' ? Object.values(value)[0] : value);
}
const GetElementByType = ({ item,
  setSelectedId, index, uiState, setOpenIcon, setUiState, selectedId,
  handleContact, openIcon }) => {

  if (item?.value?.data_type === 'image') {
    return <div
      role='button'
      style={{
        position: 'absolute',
        left: item?.position?.startX,
        top: item?.position?.startY,
        width: item?.styles?.width + 'px',
        height: item?.styles?.height + 'px',
        fontWeight: item?.styles?.weight,
        fontStyle: item?.styles?.italic ? 'italic' : 'normal',
        [item?.styles['radiusType']]: `${item?.styles?.radiusUnit}px`,
        [item?.styles['paddingType']]: `${item?.styles?.paddingUnit}%`,
        color: item?.styles?.color,
        fontSize: item?.styles?.fontSize,
        textAlign: item?.styles?.textAlign,
        textTransform: item?.styles?.textTransform,
        textDecoration: item?.styles?.textDecoration,
        backgroundColor: item?.styles?.backgroundColor,
        border: `${item?.styles?.border}px ${item?.styles?.borderStyle} ${item?.styles?.borderColor}`,
        backgroundImage: `url(${defaultImage})`
      }}
      onClick={() => setSelectedId({ item, type: 'image', styles: item?.styles, field: 'image' + index, id: item?.id })}
      className='w-12 h-12 rounded bg-no-repeat bg-cover ' />
  } else {
    return <div className='flex justify-start items-center space-x-1' style={{
      position: 'absolute',
      left: item?.position?.startX,
      top: item?.position?.startY,
    }}>
      <div
        // role='button'
        className='min-w-[170px] space-x-1 flex justify-start items-center text-gray-500'
        style={{
          display: item?.label?.styles?.display ? 'block' : 'none',
          width: item?.label?.styles?.width + 'px',
          height: item?.label?.styles?.height + 'px',
          [item?.label?.styles['radiusType']]: `${item?.label?.styles?.radiusUnit}px`,
          backgroundColor: item?.label?.styles?.backgroundColor,
          border: `${item?.label?.styles?.border}px ${item?.label?.styles?.borderStyle} ${item?.label?.styles?.borderColor}`,
        }}
        onClick={() => setSelectedId({ item, type: 'label', styles: item?.label?.styles, field: item?.label?.field, id: item?.id })}
      >
        <StyleIcon
          uiState={uiState}
          setUiState={setUiState}
          selectedId={selectedId}
          textStyle={{
            fontWeight: item?.label?.styles?.weight,
            fontStyle: item?.label?.styles?.italic ? 'italic' : 'normal',
            color: item?.label?.styles?.color,
            fontSize: item?.label?.styles?.fontSize,
            textAlign: item?.label?.styles?.textAlign,
            textTransform: item?.label?.styles?.textTransform,
            textDecoration: item?.label?.styles?.textDecoration,
            [item?.label?.styles['paddingType']]: `${item?.label?.styles?.paddingUnit}%`,
          }}
          setOpenIcon={setOpenIcon}
          color={featherIconsMock[item?.label?.icon?.color] || '#fff'}
          item={{ ...item, type: 'label' }}
          lable={getTitle(item?.label?.field)}
          type='label'
          openIcon={openIcon}
          handleContact={handleContact}
          icon={featherIconsMock[item?.label?.icon?.icon]} />
      </div>

      <div
        style={{
          display: item?.value?.styles?.display ? 'block' : 'none',
          width: item?.value?.styles?.width + 'px',
          height: item?.value?.styles?.height + 'px',
          [item?.value?.styles['radiusType']]: `${item?.value?.styles?.radiusUnit}px`,
          backgroundColor: item?.value?.styles?.backgroundColor,
          border: `${item?.value?.styles?.border}px ${item?.value?.styles?.borderStyle} ${item?.value?.styles?.borderColor}`,
        }}
        onClick={() => setSelectedId({ item, type: 'value', styles: item?.value?.styles, field: item?.value?.field, id: item?.id })} className='w-full space-x-1 text-primary flex justify-start items-center font-medium text-sm capitalize'>
        <StyleIcon
          uiState={uiState}
          setUiState={setUiState}
          selectedId={selectedId}
          setOpenIcon={setOpenIcon}
          textStyle={{
            fontWeight: item?.value?.styles?.weight,
            fontStyle: item?.value?.styles?.italic ? 'italic' : 'normal',
            color: item?.value?.styles?.color,
            fontSize: item?.value?.styles?.fontSize,
            textAlign: item?.value?.styles?.textAlign,
            textTransform: item?.value?.styles?.textTransform,
            textDecoration: item?.value?.styles?.textDecoration,
            [item?.value?.styles['paddingType']]: `${item?.value?.styles?.paddingUnit}%`,
          }}
          color={featherIconsMock[item?.value?.icon?.color] || '#fff'}
          item={{ ...item, type: 'value' }}
          lable={<span>{item?.value?.value === true ? 'Yes' : isValueIsDate(item?.value?.value, item?.value?.field) || 'N/A'}</span>}
          type='value'
          openIcon={openIcon}
          handleContact={handleContact}
          icon={featherIconsMock[item?.value?.icon?.icon]} />
      </div>
    </div>
  }
}

function DraggableComponent({ uiState, setUiState, setSelectedId, selectedId }) {
  const [openIcon, setOpenIcon] = useState(null)

  const handlePositionChange = (data, id) => {
    let afterUpdate = { ...uiState }
    afterUpdate['components']['children']?.map((it => {
      if (it?.id === id) {
        it['position']['startX'] = data?.lastX || 0
        it['position']['startY'] = data?.lastY || 0
      }
      return it
    }))
    setUiState(afterUpdate)
  }


  const handleContact = (e, item) => {
    e.preventDefault()
    setOpenIcon(item)
  }

  return (
    <div className='h-full'>
      <div style={{
        [uiState?.borderType || 'border']: `${uiState?.border}px ${uiState?.borderStyle} ${uiState?.borderColor}`,
        background: uiState?.background,
        width: uiState?.width,
        height: Number(uiState?.height || 300),
        [uiState?.radiusType || 'borderRadius']: `${uiState?.radiusUnit}px`,

      }} className='overflow-hidden relative shodow bg-white  rounded-md p-2'>
        <>
          {
            uiState?.components?.children?.map((el, i) => {
              return (
                <Draggable key={el?.id} defaultPosition={{
                  x: el?.position?.startX,
                  y: el?.position?.startY,
                }} onDrag={(e, data) => handlePositionChange(data, el?.id)}>
                  <div>
                    {/* {console.log(uiState)} */}
                    <GetElementByType
                      uiState={uiState}
                      setUiState={setUiState}
                      item={el}
                      openIcon={openIcon}
                      handleContact={handleContact}
                      index={i}
                      setOpenIcon={setOpenIcon}
                      selectedId={selectedId}
                      setSelectedId={setSelectedId} />
                  </div>
                </Draggable>
              )
            })
          }
        </>
      </div>
    </div>
  )
}
export default memo(DraggableComponent);