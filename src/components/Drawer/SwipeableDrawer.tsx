import { Global } from "@emotion/react";
import {
  Box,
  styled,
  SwipeableDrawer as MUISwipeableDrawer,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { FC } from "react";
import { UIDrawer } from "./UIDrawer";

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export const SwipeableDrawer: FC<UIDrawer.SwipeableDrawerProps> = (props) => {
  const { children, header, ...rest } = props;

  return (
    <>
      <Global
        styles={{
          ".swipeable-drawer > .MuiPaper-root": {
            height: `calc(60% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <MUISwipeableDrawer
        className={`swipeable-drawer`}
        anchor="bottom"
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        {...rest}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          {header}
        </StyledBox>

        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          {children}
        </StyledBox>
      </MUISwipeableDrawer>
    </>
  );
};
