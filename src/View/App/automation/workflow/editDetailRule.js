import React from "react";
import { useParams } from "react-router";
import RuleDetailsEdit from "../../../../Layouts/app/automation/workflow/rules/RuleEditDetail";

const EditDetailRule = () => {
  const { id } = useParams();

  return (
    <div>
      <RuleDetailsEdit ruleId={id} />
    </div>
  );
};

export default EditDetailRule;
