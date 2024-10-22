
import { Dialog, Transition, Menu } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ChevronDown } from "react-feather";

function CurlRequest() {
    const curlCode = `curl --location 'http://localhost:3001/v1/insert-lead' \
  --header 'x-api-key: MORnxxktKzQUXJeWdIUd' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "LeadTitles": "API Test",
      "Email": "info@gmail.com",
      "Phone": 989786765,
      "LeadsSource": "Gooogle",
      "FirstName": "",
      "LastName ": "",
      "Title": "",
      "Fax": "",
      "Mobile": "",
      "Website": "",
      "LeadStatus": "",
      "Industry": "",
      "NoofEmployees": "",
      "AnnualRevenue": "",
      "Rating": "",
      "CreatedBy": "",
      "EmailOptOut": "",
      "SkypeID": "",
      "ModifiedBy": "",
      "CreatedTime": "",
      "ModifiedTime": "",
      "Salutation": "",
      "SecondaryEmail": "",
      "Twitter": "",
      "LastActivityTime": "",
      "LeadConversionTime": "",
      "UnsubscribedMode": "",
      "UnsubscribedTime": "",
      "ConvertedAccount": "",
      "ConvertedContact": "",
      "ConvertedDeal": "",
      "Street": "",
      "City": "",
      "State": "",
      "ZipCode": "",
      "Country": "",
      "Description": ""
  }'`;

    return (
        <pre>
            <code style={{ color: 'green' }}>{curlCode}</code>
        </pre>
    );
}


const Axios = () => {
    const axios = `const axios = require('axios');
    let data = JSON.stringify({
      "LeadTitles": "API Test",
      "Email": "info@gmail.com",
      "Phone": 989786765,
      "LeadsSource": "Gooogle",
      "FirstName": "",
      "LastName ": "",
      "Title": "",
      "Fax": "",
      "Mobile": "",
      "Website": "",
      "LeadStatus": "",
      "Industry": "",
      "NoofEmployees": "",
      "AnnualRevenue": "",
      "Rating": "",
      "CreatedBy": "",
      "EmailOptOut": "",
      "SkypeID": "",
      "ModifiedBy": "",
      "CreatedTime": "",
      "ModifiedTime": "",
      "Salutation": "",
      "SecondaryEmail": "",
      "Twitter": "",
      "LastActivityTime": "",
      "LeadConversionTime": "",
      "UnsubscribedMode": "",
      "UnsubscribedTime": "",
      "ConvertedAccount": "",
      "ConvertedContact": "",
      "ConvertedDeal": "",
      "Street": "",
      "City": "",
      "State": "",
      "ZipCode": "",
      "Country": "",
      "Description": ""
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/v1/insert-lead',
      headers: { 
        'x-api-key': 'MORnxxktKzQUXJeWdIUd', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    `
    return (
        <pre>
            <code style={{ color: 'green' }}>{axios}</code>
        </pre>
    )
}

const Python = () => {
    const python = `
    import requests
    import json
    
    url = "http://localhost:3001/v1/insert-lead"
    
    payload = json.dumps({
      "LeadTitles": "API Test",
      "Email": "info@gmail.com",
      "Phone": 989786765,
      "LeadsSource": "Gooogle",
      "FirstName": "",
      "LastName ": "",
      "Title": "",
      "Fax": "",
      "Mobile": "",
      "Website": "",
      "LeadStatus": "",
      "Industry": "",
      "NoofEmployees": "",
      "AnnualRevenue": "",
      "Rating": "",
      "CreatedBy": "",
      "EmailOptOut": "",
      "SkypeID": "",
      "ModifiedBy": "",
      "CreatedTime": "",
      "ModifiedTime": "",
      "Salutation": "",
      "SecondaryEmail": "",
      "Twitter": "",
      "LastActivityTime": "",
      "LeadConversionTime": "",
      "UnsubscribedMode": "",
      "UnsubscribedTime": "",
      "ConvertedAccount": "",
      "ConvertedContact": "",
      "ConvertedDeal": "",
      "Street": "",
      "City": "",
      "State": "",
      "ZipCode": "",
      "Country": "",
      "Description": ""
    })
    headers = {
      'x-api-key': 'MORnxxktKzQUXJeWdIUd',
      'Content-Type': 'application/json'
    }
    
    response = requests.request("POST", url, headers=headers, data=payload)
    
    print(response.text)
    `
    return (
        <pre>
            <code style={{ color: 'green' }}>{python}</code>
        </pre>
    )
}


function CodeExample({ selectCode }) {
    return (
        <div className='bg-black rounded-lg mt-3 d-flex align-items-center justify-content-lg-center'>
            <div className='flex justify-start gap-2 p-2 '>
                <div className='h-4 w-4 rounded-full bg-red-500' />
                <div className='h-4 w-4 rounded-full bg-yellow-500' />
                <div className='h-4 w-4 rounded-full bg-green-500' />
            </div>
            <div className='overflow-scroll py-8 px-3 '>
                {selectCode === 'Curl' && <CurlRequest />}
                {selectCode === 'Axios' && <Axios />}
                {selectCode === 'Python' && <Python />}
            </div>
        </div>
    );
}

export default function Developer() {
    let [isOpen, setIsOpen] = useState(false)
    const [selectCode, setSelectCode] = useState('Axios');

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
                Developer
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-scroll">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-screen transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="mt-2">
                                        <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <Menu.Button className="inline-flex items-center w-full justify-center rounded-lg px-3 py-2 text-sm font-medium bg-primary text-white hover:bg-opacity-90">
                                                    {selectCode}
                                                    <ChevronDown size={16} />
                                                </Menu.Button>
                                            </div>
                                            <Menu.Items style={{ zIndex: 1000 }}  className="absolute left-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {
                                                    ['Axios', 'Curl', 'Python'].map((item) => {
                                                        return (
                                                            <Menu.Item key={item}>
                                                                {({ active }) => (
                                                                    <button
                                                                        onClick={() => setSelectCode(item)}
                                                                        className={`${active ? "bg-primary text-white" : "text-gray-900"
                                                                            } group flex w-full items-center px-5 py-[10px] text-sm`}
                                                                    >
                                                                        {item}
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        )
                                                    })
                                                }

                                            </Menu.Items>
                                        </Menu>
                                        <CodeExample selectCode={selectCode} />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
