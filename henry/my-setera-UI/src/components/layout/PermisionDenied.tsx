import React from "react";
import { Box } from "@mui/material";
import NotInterestedIcon from '@mui/icons-material/NotInterested';
function PermisionDenied() {
    return (
        <Box className="cm-global-tabs-wrapper" sx={{ marginTop: "10px", textAlign: "center" }}>
            <Box className="cm-global-tab-inner-content" >
                <Box sx={{ width: "100%" }}>
                    <NotInterestedIcon sx={{ width: "2em", height: "2em", }} />
                </Box>
                <h2 style={{ width: "100%"  }}>Permission Denied</h2>
            </Box>
        </Box>
    )
}
export default PermisionDenied;