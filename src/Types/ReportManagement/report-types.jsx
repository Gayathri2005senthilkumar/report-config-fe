import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ReportTypes() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to Show page
    navigate("/report-types/Show");
  }, [navigate]);

  return null; // No UI needed since it's redirecting
}

export default ReportTypes;
