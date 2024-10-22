import React from "react";
import {
  Addicon,
  Arrowblue,
  Arrowdowns,
  Charticon,
  Checkicon,
  Closeicon,
  DeleteIcon,
  EditIcon,
  Mailicon,
  Microicon,
  Plusicon,
  SearchIcon,
  Staricon,
  Updateicon,
} from "../../../../assets/svgIcons";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DELETE_MACRO, GET_MACRO } from "../../../../Redux/actions/comman";
import { useSelector } from "react-redux";


const ManageMacro = () => {
  const dispatch = useDispatch()
  const [query] = useSearchParams()
  const navigate = useNavigate();
  const module = query.get('module')
  const { macros } = useSelector((state) => state.commanvar);

  useEffect(() => {
    dispatch(GET_MACRO(module))
  }, [])


  const deleteHandler = (macro) => {
    dispatch(DELETE_MACRO(macro._id)).then(res => {
      dispatch(GET_MACRO(module))
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between py-[22px] text-lg font-semibold leading-6 px-[60px] bg-white">
        Manage Macro
        <Microicon />
      </div>
      <div className="bg-[#F8F8FC] pt-[32px] px-[60px]">
        <div className="bg-white h-[823px] p-10 rounded-2xl">
          <div className="flex gap-6 pb-8">
            <table>
              <th>Micro</th>
              <th>Edit</th>
              <th>Delete</th>
              <tbody>
                {macros.map((macro) => {
                  return (
                    < tr >
                      <td>{macro.title}</td>
                      <td>
                        <div
                          className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                          onClick={() => navigate(`/crm/macro?module=${module}&id=${macro._id}`)}
                        >
                          <EditIcon />
                        </div>
                      </td>
                      <td>
                        <div
                          className="flex items-center gap-2 py-2 px-5 bg-[#E2F2FF] rounded-3xl text-sm text-[#243C7F] cursor-pointer"
                          onClick={() => deleteHandler(macro)}
                        >
                          <DeleteIcon />
                        </div></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div >
      </div >
    </div >
  );
};

export default ManageMacro;
