import React from "react";
import TableList from "../../../Components/table";
// import TableList from "../../../../Components/table";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ADD_INVENTORY_FOR_OPPORTUNITY } from "../../../Redux/actions/comman";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function InventoryConnectionList() {
  const { id } = useParams();
  // const form = useSelector((state) => state.user.form);
  const { checkedListedData } = useSelector((state) => state.commanvar);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addInventoryForOpp = async () => {
    if (checkedListedData?.selectedRows?.length) {
      let newData = {
        DealId: id,
        Inventory: checkedListedData?.selectedRows,
      };
      const res = await dispatch(ADD_INVENTORY_FOR_OPPORTUNITY({ ...newData }));
      if (res?.status === 200) {
        navigate(`/crm/opportunities-details/${id}`);
      }
    } else {
      toast.warn("Please select inventories first!");
    }
  };

  return (
    <>
      {/* <InventorySubHeader form={form?.sections} /> */}
      <div className="text-end">
        <button
          type="button"
          className="bg-[#191242] text-[#fff] p-3 rounded-2xl m-2"
          onClick={() => addInventoryForOpp()}
        >
          Add selected Inventories
        </button>
      </div>
      <div className="flex gap-3 items-center  flex-col w-full">
        {/* <div className="flex gap-3 items-center justify-end w-full  mt-5">
          {form?.sections && <InventoryAction />}
        </div> */}
        <TableList key="inventory" moduleName="Inventory" />
      </div>
    </>
  );
}

export default InventoryConnectionList;
