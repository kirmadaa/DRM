import React, { useRef, useEffect, useState } from 'react';
import 'handsontable/dist/handsontable.full.css';
import Handsontable from 'react-handsontable';
import axios from 'axios';

function MyDataTable() {
  const tableRef = useRef(null);
  const [data, setData] = useState([
    ['John Doe', 25, 'john@example.com'],
    ['Jane Smith', 30, 'jane@example.com'],
    // ...more data
  ]);
  const [modifiedRow, setModifiedRow] = useState(null);

  useEffect(() => {
    function handleSave() {
      if (modifiedRow) {
        setModifiedRow(null);
      }
    }

    const saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', handleSave);

    return () => {
      saveButton.removeEventListener('click', handleSave);
    };
  }, [modifiedRow]);

  return (
    <div>
      <Handsontable
        ref={tableRef}
        data={data}
        columns={[
          { data: 0, title: 'Name' },
          { data: 1, title: 'Age' },
          { data: 2, title: 'Email' },
        ]}
        rowHeaders={true}
        colHeaders={['Name', 'Age', 'Email']}
        afterChange={(changes, source) => {
          if (source === 'edit') {
            const [modifiedRowIndex, modifiedColumnIndex] = changes[0];
            const modifiedCellValue = changes[0][3];

            const updatedData = [...data];
            updatedData[modifiedRowIndex][modifiedColumnIndex] = modifiedCellValue;
            setData(updatedData);

            const modifiedRowData = updatedData[modifiedRowIndex];
            setModifiedRow(modifiedRowData);
          }
        }}
      />

      <button id="save-button">Save</button>
    </div>
  );
}


export default MyDataTable