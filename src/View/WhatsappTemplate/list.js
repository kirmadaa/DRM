import React from "react";
import TableList from "../../Components/table";
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WhatsappSubHeader from "./WhatsappSubHeader";

function WhatsappTemplateList() {
  const form = useSelector((state) => state.user.form);

  return (
    <>
      <WhatsappSubHeader form={form?.sections} />
      <div className="flex gap-3 items-center  flex-col w-full">
        {/* <div className="flex gap-3 items-center justify-end w-full">
          {form?.sections && (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Link
                  to="/crm/create-whatsapp"
                  className="inline-flex items-center gap-3 w-full justify-center rounded-2xl border-[1.5px] px-4 py-3 text-sm font-medium bg-primary text-white hover:bg-opacity-90 mt-5"
                >
                  Create Whatsapp
                </Link>
              </div>
            </Menu>
          )}
        </div> */}

        <TableList key="Whatsapp" moduleName="Whatsapp" />
      </div>
    </>
  );
}

export default WhatsappTemplateList;
