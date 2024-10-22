
import React, { useEffect } from "react";
import "x-data-spreadsheet/dist/xspreadsheet.css";
import Spreadsheet from "x-data-spreadsheet";
import './sheet.css'
import { DefaultDataFormater } from './dataFormater'

const updatedOption = (rows) => {
    return {
        mode: "edit",
        showToolbar: true,
        showGrid: true,
        showContextmenu: true,
        row: {
            len: rows,
            height: 30,
        },
    };
}

const MySpreadsheetComponent = ({ data, showRows, setModifiedData, sheetByModuleName }) => {

    useEffect(() => {
        let xSheet = document.querySelector('#mysheetContainer > div');
        if (xSheet) {
            xSheet.remove()
        }
        const defaultData = sheetByModuleName ? sheetByModuleName : DefaultDataFormater(data)
        const el = document.createElement("div");
        document.getElementById('mysheetContainer').appendChild(el);
        const spreadsheetInstance = new Spreadsheet(el, updatedOption(showRows));
        spreadsheetInstance?.loadData(defaultData);
        spreadsheetInstance?.change(modifiedData => {
            setModifiedData(modifiedData)
        });

    }, [data, sheetByModuleName, showRows]);

    return (
        <div className="shadow-lg overflow-hidden bg-white">
            <div id="mysheetContainer" />
        </div>
    );
};

export default MySpreadsheetComponent;
