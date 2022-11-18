import React from "react";
import Box from "@mui/material/Box";
import Cookies from 'js-cookie'

export default function Welcome() {
  return (
    <Box component="main" marginTop={10} sx={{ flexGrow: 1, p: 3 }}>
      <div>
        <h1
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            color: "darkorange"
          }}
        >
          Welcome   { Cookies.get("admin") } !
        </h1>
      </div>
    </Box>
  );
}
