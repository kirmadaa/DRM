import React from "react";
import { useSelector } from "react-redux";
import ListingCanvasViewLayout from '../../Components/canvasview/opportunity'
import FilterHeader from "../../Components/filterHeader";

function CanvasOpportunityList() {
    const form = useSelector((state) => state.user.form);

    return (
        <>
            <FilterHeader
                listPath='/crm/opportunities'
                canvasPath='/crm/opportunities/opportunities-canvas-list'
                kanvanPath='/crm/kanban-view?module=Opportunities'
                pageName="Opportunitie"
                module="Opportunities"
                form={form?.sections}
            />
            <ListingCanvasViewLayout key="Opportunities" moduleName="Opportunities" filterSHow={true} />
        </>
    );
}

export default CanvasOpportunityList;
