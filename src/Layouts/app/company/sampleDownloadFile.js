

import React from 'react';

class ExcelDownloadButton extends React.Component {
  render() {
    return (
      <div className=' space-x-2 flex justify-start items-center'>
        <p>Download Sample file</p>
        <a className='text-primary font-semibold' href='/holidaySample.xlsx' download>Download Excel</a>
      </div>
    );
  }
}

export default ExcelDownloadButton;
