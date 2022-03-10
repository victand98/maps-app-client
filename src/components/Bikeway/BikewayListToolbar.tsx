import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { BoxProps } from "@mui/system";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { Link } from "..";

export const BikewayListToolbar = (props: BoxProps) => {
  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Ciclovías
        </Typography>
        <Box sx={{ m: 1 }}>
          <Link href="/panel/ciclovias/nuevo" passHref withAnchor={false}>
            <Button color="primary" variant="contained">
              Añadir Nueva
            </Button>
          </Link>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <BiSearch />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Buscar Ciclovía"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
