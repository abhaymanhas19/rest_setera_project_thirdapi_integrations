import React from "react";
import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';

function LoaderScreen() {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
            background: "#fff",
            borderRadius: "10px"
        }}><CircularProgress size={50} sx={{
            color: "#103256"
        }} /></Box>
    )
}
export default LoaderScreen;