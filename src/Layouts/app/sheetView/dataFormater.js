
const getTitle = (value) => {
    let titleis = value
      ?.replace(/([A-Z])/g, " $1")
      ?.replace(/^./, function (str) {
        return str.toUpperCase();
      });
    return titleis.replace(/_/g, "");
  };

export const DefaultDataFormater = (dataList) => {
    const columnNames = []
    if(dataList?.length > 0){
        let item = dataList[0]
        for(let keyname in item){
            if( typeof(item[keyname]) === 'string' || typeof(item[keyname]) === 'boolean' || typeof(item[keyname]) === 'number'){
                columnNames.push(keyname)
            }
        }
    }
    const defaultData = {
        "name": "sheet1",
        "freeze": "A1",
        "styles": [
            {
                "font": {
                    "bold": true
                }
            }
        ],
        "merges": [],
        "rows": {
            "0": {
                "cells": Object.fromEntries(
                    columnNames.map((name, index) => [index.toString(), { text: getTitle(name), style: 0 }])
                )
            },
            // "len": columnNames.length  // Set to columnNames.length to show only the first row as the header
        },
        "cols": {
            len: columnNames?.length
        },
        "validations": [],
        "autofilter": {}
    };

    // Add user data to the default data
    dataList.forEach((userData, rowIndex) => {
        const rowData = columnNames.map((name) => ({ text: userData[name] }));
        defaultData.rows[rowIndex + 1] = { cells: Object.fromEntries(rowData.map((cell, colIndex) => [colIndex.toString(), cell])) };
    });
    
    return defaultData
}

