import moment from "moment";

export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
export const removeDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};


export const DataIsDate = (itemInfo, key) => {
  let keynames = ['createdAt', 'updatedAt', 'createdTime', 'updatedTime']
  return keynames.includes(key) ? moment(itemInfo[key]).format('DD/MM/YYYY') : itemInfo[key];
}

export const getTitle = (value) => {
  console.log("valuevalue", value);
  if (value) {
    let titleis = value
      ?.replace(/([A-Z])/g, " $1")
      ?.replace(/^./, function (str) {
        return str.toUpperCase();
      });
    return titleis.replace(/_/g, "");
  }
  return "";
};

export const getValueOfItemTypeIsSelect = (formData, keyname, currentValue) => {
  // console.log("currentValue====>", formData, keyname, currentValue);

  // console.log("currentValue====>", currentValue);
  if (isNaN(Number(currentValue))) {
    return currentValue;
  } else {
    for (let form of formData) {
      let inputs = Object.values(form?.inputs)
      for (let input of inputs) {
        if (input?.type === 'Select' && (input?.value === keyname)) {
          return input?.options?.find(it => it?.value === currentValue)?.label

        }
      }
    }
    return currentValue;
  }
}

export const listOfDefaultPositions = [
  {
    "startX": 78,
    "startY": 26,
  },
  {
    "startX": 78,
    "startY": 37,
  },
  {
    "startX": 79,
    "startY": 49,
  },
  {
    "startX": 78,
    "startY": 61,
  },
  {
    "startX": 261,
    "startY": 16,
  },
  {
    "startX": 78,
    "startY": 14,
  },
  {
    "startX": 261,
    "startY": 29,
  },
  {
    "startX": 261,
    "startY": 43,
  },
  {
    "startX": 261,
    "startY": 55,
  }
]