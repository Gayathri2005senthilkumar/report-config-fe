// src/Config/config-view.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Box,
  Checkbox,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useQueryGetpi from "@/api/useQueryGetApi";
import useMutationCustom from "@/api/useMutationCustom";
import getAPIMap from "@/api/ApiUrls";

function ConfigView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, setState] = useState();
  const addMutation = useMutationCustom({
      onSuccess: () => {
        refetchEditData();
        alert("Config saved successfully!");
        // navigate("/config-type/config-show");
      },
      onError: (err) => {
        console.error("❌ Error:", err);
        alert("❌ Failed to save config");
      },
    });
   const { data,refetch:refetchEditData } = useQuery({
      queryKey: ["config", `/${id}`],
      queryFn: useQueryGetpi,
      refetchOnWindowFocus: false,
    });

    /** Fetch columnMapping data */
  const { data: columnData } = useQuery({
    queryKey: ["columnMapping"],
    queryFn: () => useQueryGetpi({ queryKey: ["columnMapping", ""] }),
    refetchOnWindowFocus: false,
  });

  useEffect(()=>{
    setState(columnData);
  }, [columnData])

  const responsefields =useMemo(()=>{
    if(data?.data&& state?.data?.results) {
      const responseField = data?.data.ResponseFields.map((main)=>{
              const filterData = state?.data?.results?.find((item)=>item.id===main.column_mapping);
              return filterData
      })
      return responseField;
    }
    return [];
  },[state, data])

  const handleChange= (e) => {
    const checkboxId= parseInt(e.target.value);
    const apiData = {...data?.data};
    debugger;
    console.log('edit Data', apiData?.ResponseFields)
    console.log('value', e.target.value);
    apiData.ResponseFields = apiData?.ResponseFields.map((item)=>{
      if(item.column_mapping=== checkboxId) {
        item.enable = e.target.checked;
      }
      return item;
    });
    //add here search fields

    addMutation.mutate({
        url: `${getAPIMap("config")}/${id}`,
        method: "put",
        data: apiData,
      });
    
  }


  if (!data?.data) {
    return <div className="p-6 text-center text-gray-500">No data available</div>;
  }

  return (
    <div className="p-6">
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Card
        sx={{
          maxWidth: 500,
          margin: "auto",
          padding: 2,
          boxShadow: 4,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Config Details
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box mb={1}>
            <Typography variant="body1"><strong>ID:</strong> {data?.data.id}</Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body1"><strong>Title:</strong> {data?.data.title}</Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body1"><strong>Name:</strong> {data?.data.name}</Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body1"><strong>Normalized Name:</strong> {data?.data.normalized_name}</Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body1"><strong>Enabled:</strong> {data?.data.enable ? "Yes" : "No"}</Typography>
          </Box>
   <div className="mx-4 my-12">
            <Typography variant="body1"><strong>Response Fields:</strong></Typography>
            <Box mb={1} sx={{
              background: "#eee",
            }}>
            <table className="table-fixed w-full text-left">
              <tr><th>Name</th><th>Enable</th></tr>
           {Array.isArray(responsefields) && 
           responsefields?.map((item)=>{
            console.log('responsefields',responsefields)
            return (
              <tr>
                <td>{item?.label}</td>
                <td><Checkbox className="cursor-pointer" checked={item?.enable} value={item.id} onChange={handleChange}  /></td>
              </tr>
          )
           })
           }
            </table>
            </Box>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ConfigView;
