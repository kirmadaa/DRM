import { Eye } from 'feather-icons-react/build/IconComponents';
import React, { useState } from 'react';

function FileUpload({ form, field, dataValue, disabled }) {
  const [base64, setBase64] = useState(dataValue)

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64String = event.target.result.split(',')[1];
        form.setFieldValue(
          field.name,
          base64String
        );
        setBase64(base64String)
      }
      reader.readAsDataURL(selectedFile);
    }
  };

  function getMimeTypeFromBase64(base64String) {

    const header = base64String.substring(0, 20);
    const mimeTypeMap = {
      '/9j/': 'image/jpeg',
      'iVBORw0KGgo=': 'image/png',
      'JVBERi0xLj': 'application/pdf',

    };
    for (const headerPattern in mimeTypeMap) {
      if (header.startsWith(headerPattern)) {
        return mimeTypeMap[headerPattern];
      }
    }

    return null;
  }

  const openPdfInNewTab = () => {
    if (base64) {
      let pdfBlob = ''
      if (getMimeTypeFromBase64(base64) === 'application/pdf') {
        pdfBlob = new Blob([Uint8Array.from(atob(base64), c => c.charCodeAt(0))], {
          type: 'application/pdf',
        });
      } else {
        pdfBlob = new Blob([Uint8Array.from(atob(base64), c => c.charCodeAt(0))], {
          type: 'image/png',
        });
      }

      const pdfBlobUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfBlobUrl, '_blank');
    }
  };
  return (
    <span>
      <input type="file" onChange={handleFileInputChange} disabled={disabled} />
      {base64 && <tr> <h5>View <Eye onClick={() => { if (!disabled) { openPdfInNewTab(base64) } }} /></h5></tr>}
    </span>
  );
}

export default FileUpload;
