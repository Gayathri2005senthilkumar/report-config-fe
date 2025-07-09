import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ColumnTypes() {
  const navigate = useNavigate();

  // Navigate on mount
  useEffect(() => {
    navigate("/column-type/column-show");
  }, [navigate]);

  return null; 
}

export default ColumnTypes;
