import Draggable from "react-draggable"; // The default
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GET_CANVAS_VIEW } from "../../../Redux/actions/comman";
import defaultImage from "../../../assets/other/default.jpg";
import moment from "moment";
import { featherIconsMock } from "../../../assets/icons/mockdata";
import {
  getValueOfItemTypeIsSelect,
  listOfDefaultPositions,
} from "../../../utility/serviceMethod";
import { CanvasPositionBuilder } from "../../../utility/canvasPositionBuilder";

const getTitle = (value) => {
  let titleis = value
    ?.replace(/([A-Z])/g, " $1")
    ?.replace(/^./, function (str) {
      return str?.toUpperCase();
    });
  return titleis?.replace(/_/g, " ");
};

export const isValueIsDate = (value, key) => {
  let keynames = ["createdAt", "updatedAt", "createdTime", "updatedTime"];
  return keynames.includes(key)
    ? moment(value).format("DD/MM/YYYY")
    : typeof value === "object"
      ? value ? Object?.values(value)[0] : null
      : value;
};

const GetElementByType = ({ item, sections, onRowClicked }) => {
  if (item?.value?.data_type === "image") {
    return (
      <div
        onClick={onRowClicked}
        role="button"
        style={{
          position: "absolute",
          left: item?.position?.startX,
          top: item?.position?.startY,
          width: item?.styles?.width + "px",
          height: item?.styles?.height + "px",
          fontWeight: item?.styles?.weight,
          fontStyle: item?.styles?.italic ? "italic" : "normal",
          [item?.styles["radiusType"]]: `${item?.styles?.radiusUnit}px`,
          [item?.styles["paddingType"]]: `${item?.styles?.paddingUnit}%`,
          color: item?.styles?.color || "#e5e7eb",
          fontSize: item?.styles?.fontSize,
          textAlign: item?.styles?.textAlign,
          textTransform: item?.styles?.textTransform,
          textDecoration: item?.styles?.textDecoration,
          backgroundColor: item?.styles?.backgroundColor,
          border: `${item?.styles?.border}px ${item?.styles?.borderStyle} ${item?.styles?.borderColor}`,
          backgroundImage: `url(${defaultImage})`,
        }}
        className="w-12 h-12 rounded bg-no-repeat bg-cover "
      />
    );
  } else {
    return (
      <div
        className="flex justify-start items-center space-x-1"
        onClick={onRowClicked}
        style={{
          position: "absolute",
          left: item?.position?.startX,
          top: item?.position?.startY,
        }}
      >
        {!item?.label?.styles?.display ? (
          ""
        ) : (
          <div
            role="button"
            className="min-w-[170px] space-x-1 flex justify-start items-center"
            style={{
              width: item?.label?.styles?.width + "px",
              height: item?.label?.styles?.height + "px",
              [item?.label?.styles[
                "radiusType"
              ]]: `${item?.label?.styles?.radiusUnit}px`,
              backgroundColor: item?.label?.styles?.backgroundColor,
              border: `${item?.label?.styles?.border}px ${item?.label?.styles?.borderStyle} ${item?.label?.styles?.borderColor}`,
            }}
          >
            <span style={{ color: item?.lable?.icon?.color }}>
              {featherIconsMock[item?.label?.icon?.icon]}
            </span>
            <span
              style={{
                fontWeight: item?.label?.styles?.weight,
                fontStyle: item?.label?.styles?.italic ? "italic" : "normal",
                color: item?.label?.styles?.color || "#959798",
                fontSize: item?.label?.styles?.fontSize,
                textAlign: item?.label?.styles?.textAlign,
                textTransform: item?.label?.styles?.textTransform,
                textDecoration: item?.label?.styles?.textDecoration,
                margin: "10px",
                [item?.label?.styles[
                  "paddingType"
                ]]: `${item?.label?.styles?.paddingUnit}%`,
              }}
            >
              {getTitle(item?.label?.field)}
            </span>
          </div>
        )
        }
        <div
          role="button"
          className="min-w-[170px] space-x-1 flex justify-start items-center"
          style={{
            // width: item?.value?.styles?.width + "px",
            // height: item?.value?.styles?.height + "px",
            [item?.value?.styles[
              "radiusType"
            ]]: `${item?.value?.styles?.radiusUnit}px`,
            backgroundColor: item?.value?.styles?.backgroundColor,
            border: `${item?.value?.styles?.border}px ${item?.value?.styles?.borderStyle} ${item?.value?.styles?.borderColor}`,
          }}
        >
          <span style={{ color: item?.value?.icon?.color }}>
            {featherIconsMock[item?.value?.icon?.icon]}
          </span>
          <span
            style={{
              fontWeight: item?.value?.styles?.weight,
              fontStyle: item?.value?.styles?.italic ? "italic" : "normal",
              color: item?.value?.styles?.color || "#959798",
              fontSize: item?.value?.styles?.fontSize,
              textAlign: item?.value?.styles?.textAlign,
              textTransform: item?.value?.styles?.textTransform,
              textDecoration: item?.value?.styles?.textDecoration,
              width: "180Px",
              // display: "-webkit-box",
              // webkit: 33,
              // overflow: "hidden",
              //maxHeight: "calc(3 * 1.5 * 14px)",
              //lineHeight: "1.5px",
              [item?.value?.styles[
                "paddingType"
              ]]: `${item?.value?.styles?.paddingUnit}%`,
            }}

          >

            {getValueOfItemTypeIsSelect(
              sections,
              item?.value?.field,
              isValueIsDate(item?.value?.value, item?.value?.field) || "N/A"
            )}
          </span>
        </div>
      </div >
    );
  }
};

function CanvasCard({
  modulename,
  setSelectedId,
  itemInfo,
  handleCheckRow,
  isSelected,
  sections,
  onRowClicked,
}) {
  const dispatch = useDispatch();
  const [afterItemInfoModified, setAfterItemInfoModified] = useState(null);
  const [uiState, setUiState] = useState(null);

  const getCanvasView = async () => {
    let res = await dispatch(GET_CANVAS_VIEW(modulename));
    // console.log("res====>", res);
    let uiIs = res?.data?.data?.canvasviewData[0]?.payload;

    if (!uiIs) {
      let addedPositions = CanvasPositionBuilder(itemInfo, modulename)[
        "components"
      ]["children"]?.map((el, i) => {
        if (i < listOfDefaultPositions?.length) {
          el["position"] = listOfDefaultPositions[i];
        }
        return el;
      });
      let rmNoPositions = addedPositions?.filter(
        (el) => el?.position?.startX !== null && el?.position?.startY !== null
      );
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
          display: true,
        },
        value: { data_type: "image" },
      });
      setUiState({
        components: {
          children: rmNoPositions,
          border: 1,
          borderStyle: "solid",
        },
        icons: [],
      });
    } else {
      setUiState(uiIs);
    }
  };

  useState(() => {
    let copyinfo = {};
    for (let el in itemInfo) {
      if (typeof itemInfo[el] != "object") {
        copyinfo[el] = itemInfo[el] || "N/A";
      }
    }
    for (let orEl in itemInfo["organizationData"]) {
      copyinfo[`org-${orEl}`] = itemInfo[orEl] || "N/A";
    }
    for (let ownEl in itemInfo["ownerData"]) {
      copyinfo[`owner-${ownEl}`] = itemInfo[ownEl] || "N/A";
    }
    setAfterItemInfoModified(copyinfo);
  }, []);

  useEffect(() => {
    getCanvasView();
  }, []);

  return (
    <div className="relative mb-2">
      <input
        id="userselect-checkbox"
        onChange={(e) => handleCheckRow(isSelected, itemInfo)}
        type="checkbox"
        checked={isSelected}
        className="w-6 h-6 absolute top-4 left-4 z-10 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary"
      />
      <div
        style={{
          [uiState?.borderType ||
            "border"]: `${uiState?.border}px ${uiState?.borderStyle} ${uiState?.borderColor}`,
          background: uiState?.background,
          width: uiState?.width,
          // height: Number(uiState?.height || 300),
          [uiState?.radiusType || "borderRadius"]: `${uiState?.radiusUnit}px`,
        }}
        className="-mt-6 w-full relative shodow bg-white rounded-md p-2 min-h-[220px] max-h-[3000px]"
      >
        {/* {console.log("uiState?.components?.children===>", uiState?.components)} */}
        {uiState?.components?.children?.map((el, i) => {
          return (
            <Draggable
              key={el?.id}
              defaultPosition={{
                x: el?.position?.startX + 10,
                y: el?.position?.startY + 10,
              }}
              disabled={true}
            >
              <div>
                <GetElementByType
                  item={el}
                  itemInfo={itemInfo}
                  sections={sections}
                  afterItemInfoModified={afterItemInfoModified}
                  index={i}
                  onRowClicked={onRowClicked}
                  setSelectedId={setSelectedId}
                />
              </div>
            </Draggable>
          );
        })}
      </div>
    </div>
  );
}
export default memo(CanvasCard);
