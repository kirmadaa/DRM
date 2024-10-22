import React, { useState } from "react";
import { Minus, Plus } from "react-feather";
import { DeleteIcon, EditIcon } from "../assets/svgIcons";
//
export function TreeItem({
  title,
  children,
  setIsOpen,
  isOpen,
  handleActive,
  tree,
  setRoleByIdData,
  activeBtn,
  setActiveBtn
}) {
  const [isOpens, setIsOpens] = useState(isOpen);
  console.log("hello ---->", title,
    children,

    isOpen,
    tree,
    isOpens
  );
  return (
    <div className="my-2">
      <div className="list-item"
        onClick={() => {

          setIsOpens(!isOpens)
          // setActiveBtn(activeBtn)
          // setIsOpen(activeBtn == 2 ? false : !isOpen)
          // alert("hello")
        }}
      >
        <div>
          {children ? (
            isOpen || isOpens ? (
              <button className="bg-[#FFEAEF] rounded-lg text-[#F95250] p-3">
                <Minus />
              </button>
            ) : (
              <button className="bg-[#DCFCE7] rounded-lg text-[#22C55E] p-3">
                <Plus />
              </button>
            )
          ) : (
            <button className="bg-[#FFEAEF] rounded-lg text-[#F95250] p-3">
              <Minus />
            </button>
          )}
        </div>
        <div className="flex items-center main_div_role">
          <span className="border-dashed border-t-2 w-[30px] h-[3px] "></span>
          <span className="ml-2">{title}</span>
          <div className="flex ml-4 edit_delete_div">
            <span
              className="p-1 rounded bg-[#DCFCE7]"
              onClick={() => {
                setRoleByIdData(tree);
                handleActive(1);
              }}
            >
              <EditIcon />
            </span>{" "}
            {/* <span className="p-1 ml-2 rounded bg-[#FFEAEF]">
              <DeleteIcon />
            </span> */}
          </div>
        </div>
      </div>
      {isOpen || isOpens ? (
        <div className="list-item-subtree ">{children}</div>
      ) : (
        ""
      )}
    </div>
  );
}

export function TreeView({ children }) {
  return <>{children}</>;
}
