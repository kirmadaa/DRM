



const noNeedFor = ["organizationData",
  "tasksData",
  "callsData",
  "ownerData",
  "LeadsOwnerId",
  "LeadOwnerId",
  "DealOwnerId",
  "AccountOwnerId",
  "TaskOwnerId", "MeetingOwnerId",
  "callOwnerId", "Id", "id", "connectionId",
  "taskOwnerId", "connectionId",
  "ModifiedBy", "SmsOwnerId",
  "WhatsappOwnerId", "templateOwner",
  "siteVisitOwnerId", "meetingHostId",
  "orderedItems",
  "_id", "ContactOwnerId",
  "organizationId", "EmailOwnerId","AccountsOwnerId","CreatedBy",
  "noteOwnerId"];

const defaultStyle = {
  display: true,
  "radiusType": "borderRadius",
  "radiusUnit": "0",
  "paddingUnit": "",
  "paddingType": "padding",
  "border": 0,
  "borderColor": "",
  "borderStyle": "solid",
  "fontSize": 15,
  "weight": 300,
  "bold": false,
  "font_style": "Normal",
  "textAlign": "left",
  "textTransform": "",
  "italic": false,
  "backgroundColor": "",
  "labelAlign": "left",
}
export const CanvasPositionBuilder = (item, modulename) => {
  // let components = { children: [] }
  let infoStructure = { components: { children: [], border: 1, borderStyle: 'solid', icons: [] } }
  infoStructure['components']['avatar'] = {
    position: {
      startX: null,
      startY: null,
      width: null,
      height: null,
      singleCellWidth: 1,
      singleCellHeight: 1,
      imageWidth: 335
    },
    styles: {
      radiusType: "borderRadius",
      textAlign: "left",
      textTransform: "",
      backgroundColor: "transparent",
      width: "170",
      height: "170",
      display: true,
    }
  }

  for (let el in item) {
    if (!noNeedFor.includes(el)) {
      infoStructure['components']['children'].push({
        position: {
          startX: null,
          startY: null,
          width: null,
          height: null,
          singleCellWidth: 1,
          singleCellHeight: 1,
          imageWidth: 335
        },
        id:
          Math.random().toString(36).substr(2, 9) +
          new Date().getTime().toString(36),
        label: {
          field: el,
          styles: defaultStyle,
        },
        value: {
          data_type: typeof (item[el]),
          field: el,
          value: typeof (item[el]) === 'boolean' ? (item[el] ? 'Yes' : 'No') : item[el],
          styles: defaultStyle
        }
      })
    }
  }

  if (modulename === 'Leads' || modulename === 'Contacts' || modulename === 'Accounts') {
    for (let el in item?.organizationData) {
      if (!noNeedFor.includes(el)) {
        infoStructure['components']['children'].push({
          position: {
            startX: null,
            startY: null,
            width: null,
            height: null,
            singleCellWidth: 1,
            singleCellHeight: 1,
            imageWidth: 335
          },
          id:
            Math.random().toString(36).substr(2, 9) +
            new Date().getTime().toString(36),
          label: {
            field: el,
            styles: defaultStyle
          },
          value: {
            data_type: typeof (item[el]),
            field: el,
            value: typeof (item[el]) === 'boolean' ? (item[el] ? 'Yes' : 'No') : item[el],
            styles: defaultStyle
          }
        })
      }
    }
  }
  switch (modulename) {
    case 'Leads':

      break;

    case "Contacts":

      break;
    case "Accounts":
      // console.log(item)

      break;
    default:
      break;
  }
  return infoStructure
}


export const ModifyAndGetValueByModule = (modulename) => {
  let item = JSON.parse(localStorage.getItem('canvas-' + modulename))

  let infoStructure = { components: { children: [], border: 1, borderStyle: 'solid', icons: [] } }
  infoStructure['components']['avatar'] = {
    position: {
      startX: null,
      startY: null,
      width: null,
      height: null,
      singleCellWidth: 1,
      singleCellHeight: 1,
      imageWidth: 335
    },
    styles: {
      radiusType: "borderRadius",
      textAlign: "left",
      textTransform: "",
      backgroundColor: "transparent",
      width: "170",
      height: "170",
      display: true,
    }
  }

  for (let el in item) {
    if (!noNeedFor.includes(el)) {
      infoStructure['components']['children'].push({
        position: {
          startX: null,
          startY: null,
          width: null,
          height: null,
          singleCellWidth: 1,
          singleCellHeight: 1,
          imageWidth: 335
        },
        id:
          Math.random().toString(36).substr(2, 9) +
          new Date().getTime().toString(36),
        label: {
          field: el,
          styles: defaultStyle,
        },
        value: {
          data_type: typeof (item[el]),
          field: el,
          value: typeof (item[el]) === 'boolean' ? (item[el] ? 'Yes' : 'No') : item[el],
          styles: defaultStyle
        }
      })
    }
  }

  if (modulename === 'Leads' || modulename === 'Contacts' || modulename === 'Accounts') {
    for (let el in item?.organizationData) {
      if (!noNeedFor.includes(el)) {
        infoStructure['components']['children'].push({
          position: {
            startX: null,
            startY: null,
            width: null,
            height: null,
            singleCellWidth: 1,
            singleCellHeight: 1,
            imageWidth: 335
          },
          id:
            Math.random().toString(36).substr(2, 9) +
            new Date().getTime().toString(36),
          label: {
            field: el,
            styles: defaultStyle
          },
          value: {
            data_type: typeof (item[el]),
            field: el,
            value: typeof (item[el]) === 'boolean' ? (item[el] ? 'Yes' : 'No') : item[el],
            styles: defaultStyle
          }
        })
      }
    }
  }
  return infoStructure
}
