import { Fragment, useEffect, useMemo, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDown } from 'feather-icons-react/build/IconComponents'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { GET_FOMR_LAYOUT_BY_MODULE } from '../../../Redux/actions/modules'

export default function GetFormByModuleName({ modulename, selected, setSelected, selectedId, disabled = false }) {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const formbyModuleName = useSelector((state) => state?.ModulesReducer?.formbyModuleName);

  useMemo(() => {
    if (!selectedId) {
      if (formbyModuleName?.formData) {
        setSelected(formbyModuleName?.formData[0])
      }
    } else {
      let item = formbyModuleName?.formData?.find(it => it?._id === selectedId)
      setSelected(item)
    }

  }, [formbyModuleName, selectedId])

  useEffect(() => {
    dispatch(GET_FOMR_LAYOUT_BY_MODULE(1, 200, modulename));
  }, [])

  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="flex justify-start items-center space-x-2 pr-2 relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Listbox.Button disabled={disabled} className="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selected?.remark || selected?.formTitle}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDown
                  className="h-5 w-5 text-gray-400"
                />
              </span>
            </Listbox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {formbyModuleName?.formData?.map((item) => (
                <Listbox.Option
                  key={item?._id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none p-2 pr-4 ${active ? 'bg-primary text-white' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {item?.remark || item?.formTitle}
                      </span>

                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
