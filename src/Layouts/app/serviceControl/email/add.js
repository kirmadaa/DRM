import { Dialog, Transition } from "@headlessui/react";
import { useEffect } from "react";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { GET_FILTERS, GET_USER_PROFILE } from "../../../../Redux/actions/user";
import { useDispatch } from "react-redux";
import { list } from "../../../../Components/module";

export default function AddTemplate({ saveTemplate }) {
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  const [module, setModule] = useState("Leads")
  let [payload, setPayload] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const filters = useSelector((state) => state.user.filters);


  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setPayload({ ...payload, [name]: value });

    if (value.includes('@')) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const updatedText = payload?.emailDescription?.replace('@', `{{${suggestion}}}`);
    setPayload({ ...payload, emailDescription: updatedText });
    setShowSuggestions(false);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleChange(e) {
    let { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  }

  function handleSave() {
    saveTemplate(payload);
    setIsOpen(false);
  }

  useEffect(() => {
    dispatch(GET_USER_PROFILE()).then((res) => {
      setPayload({ ...payload, EmailOwnerId: res.data?.data[0]?.userId });
    });
    const api = list[module] || {};
    dispatch(GET_FILTERS(api.filterApi));
  }, []);


  const onChangeHandlerModule = (e) => {
    const { value } = e?.target
    setModule(value)
    const api = list[value] || {};
    dispatch(GET_FILTERS(api.filterApi));
  }

  return (
    <>
      <div className=" flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add Template
        </button>
      </div>

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

          <div className="fixed inset-0 overflow-y-auto">
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add New Template
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="w-full">
                      <div className="my-4 w-full flex justify-between">
                        <select
                          className="form-control w-full placeholder-opacity-100 focus:outline-0 text-base"
                          placeholder="Select Module"
                          name="ChooseModule"
                          onChange={(e) => onChangeHandlerModule(e)}
                          value={module}
                        >
                          {Object.keys(list)?.map((item, index) => {
                            return (
                              <option key={index + item} value={item}>
                                {item}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                      <div className="my-4 w-full flex justify-between">
                        <input
                          onChange={handleChange}
                          name="emailTitle"
                          className="bg-blue-50 w-full border rounded-md font-[200] focus:outline-none  p-3"
                          placeholder="Email Subject"
                        />
                      </div>
                      <div className="w-full">
                        <textarea
                          rows={8}
                          value={payload?.emailDescription}
                          onChange={handleInputChange}
                          name="emailDescription"
                          className="bg-blue-50 w-full border rounded-md font-[200] focus:outline-none  p-2"
                          placeholder="Email Body"
                        />
                        {showSuggestions && (
                          <div className="suggestion-dropdown">
                            {filters.map((suggestion) => (
                              <div
                                key={suggestion}
                                className="suggestion"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center text-white rounded-md border border-transparent bg-primary/90 px-4 py-2 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleSave()}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
