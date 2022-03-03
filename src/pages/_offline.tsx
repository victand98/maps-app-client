import { ErrorLayout, Link } from "@components";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React, { ReactElement } from "react";

const Offline = () => (
  <Box
    sx={{
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Typography align="center" color="textPrimary" variant="h1">
      Esta es una página alternativa sin conexión
    </Typography>
    <Typography align="center" color="textPrimary" variant="subtitle2">
      Cuando esté desconectado, cualquier ruta de página volverá a esta página
    </Typography>
    <Box sx={{ textAlign: "center" }}>
      <img
        alt="Under development"
        src="/images/404.svg"
        style={{
          marginTop: 50,
          display: "inline-block",
          maxWidth: "100%",
          width: 560,
        }}
      />
    </Box>
    <Link href="/" passHref withAnchor={false}>
      <Button
        component="a"
        startIcon={<ArrowBack fontSize="small" />}
        sx={{ mt: 3 }}
        variant="contained"
      >
        Volver a la página principal
      </Button>
    </Link>
  </Box>
);

Offline.getLayout = (page: ReactElement) => <ErrorLayout>{page}</ErrorLayout>;

export default Offline;
