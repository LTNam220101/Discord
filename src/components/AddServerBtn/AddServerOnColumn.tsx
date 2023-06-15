import React, { useState } from "react"
import { Box, Tooltip, Typography, useTheme, Stack } from "@mui/material"
import * as colors from "@mui/material/colors"
import NiceModal from "@ebay/nice-modal-react"
import AddServerDialog from "./AddServerDialog"

function AddServerBtn() {
  const theme = useTheme()

  const [isHover, setIsHover] = useState(false)

  return (
    <Tooltip title={"Add new Server"} placement="right">
      <Stack
        width="100%"
        direction="row"
        spacing={1}
        pr={2}
        justifyContent="space-between"
        alignItems="center"
        onClick={() => {
            NiceModal.show(AddServerDialog)
        }}
      >
        <Box
          height={"20px"}
          width="3px"
          sx={{
            bgcolor: isHover ? "white" : "transparent",
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5
          }}
        ></Box>

        <Box
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          height={48}
          width={48}
          borderRadius={isHover ? "35%" : "50%"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor={
            theme.palette.mode === "light" ? colors.grey[300] : colors.grey[800]
          }
          sx={{
            ":hover": {
              cursor: "pointer",
              borderRadius: "35%",
              backgroundColor: colors.green[600],
              color: theme.palette.common.white
            },
            transition: "all 0.25s ease-out"
          }}
          color={colors.green[500]}
        >
          <Typography variant="h4">+</Typography>
        </Box>
      </Stack>
    </Tooltip>
  )
}

export default AddServerBtn
