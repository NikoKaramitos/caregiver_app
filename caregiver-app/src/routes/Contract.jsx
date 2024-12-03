import React from "react";
import { Routes, Route } from "react-router-dom";
import Contract from "../pages/Contract";

function ContractRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Contract />} />
    </Routes>
  );
}

export default ContractRoutes;
