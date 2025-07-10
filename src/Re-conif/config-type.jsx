import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ConfigType() {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to config-show when this component loads
    navigate("/config-type/config-show");
  }, [navigate]);

  return null; // Since we redirect, no UI is needed
}

export default ConfigType;
