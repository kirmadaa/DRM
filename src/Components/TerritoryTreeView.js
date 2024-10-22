import React, { useState } from "react";
import { EditIcon, SmallLeftArrow, DeleteIcon } from "../assets/svgIcons";
import { Minus, Plus } from "react-feather";

export function TreeItem({
  title,
  children,
  isOpen,
  handleActive,
  tree,
  setTerriotryByIdData,
  setDeleteTerritoryModal,
  setDeleteTerritory,
  type
}) {
  const [isOpens, setIsOpens] = useState(false);
  return (
    <div className="my-2">
      <div
        className="list-item"
        onClick={() => setIsOpens(!isOpens)}
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
        {/* <div>
          {children ? (
            isOpen || isOpens ? (
              <input
                // checked
                onChange={() => setIsOpens(!isOpens)}
                id="purple-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500focus:ring-2"
              />
            ) : (
              <input
                // checked
                onChange={() => setIsOpens(!isOpens)}
                id="purple-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500focus:ring-2"
              />
            )
          ) : (
            <input
              // checked
              onChange={() => setIsOpens(!isOpens)}
              id="purple-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500focus:ring-2"
            />
          )}
        </div> */}
        <div
          className="flex items-center main_div_role"
        // onClick={() => handleActive(1)}
        >
          <span className="border-dashed border-t-2 w-[30px] h-[3px] "></span>
          <span className="ml-2">{title}</span>
          <div className="flex ml-4 edit_delete_div">
            <span
              className="p-1 rounded bg-[#DCFCE7]"
              onClick={() => {
                setTerriotryByIdData(tree);
                handleActive(1);
              }}
            >
              {type === "createTerritory" && <EditIcon />}
              {type === "asignRuleForTerriotry" && <SmallLeftArrow />}
            </span>{" "}
            {type === "createTerritory" &&
              < span
                className="p-1 ml-2 rounded bg-[#FFEAEF]"
                onClick={() => {
                  setDeleteTerritory(tree)
                  setDeleteTerritoryModal(true)
                }}
              >
                <DeleteIcon />
              </span>}
          </div>
        </div>
      </div>
      {
        isOpen || isOpens ? (
          <div className="list-item-subtree ">{children}</div>
        ) : (
          ""
        )
      }
    </div >
  );
}

export function TreeView({ children }) {
  return <>{children}</>;
}
