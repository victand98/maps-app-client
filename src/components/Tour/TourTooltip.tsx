import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { UITour } from "./UITour";

export const TourTooltip: FC<UITour.TourTooltipProps> = (props) => {
  const {
    continuous,
    index,
    step,
    backProps,
    closeProps,
    primaryProps,
    tooltipProps,
    skipProps,
    isLastStep,
    size,
  } = props;

  return (
    <Card sx={{ width: "380px", maxWidth: "100%" }} {...tooltipProps}>
      <CardContent>
        {step.title && (
          <Typography gutterBottom variant="h6" component="h2">
            {step.title}
          </Typography>
        )}

        {typeof step.content === "string" ? (
          <Typography variant="body2">{step.content}</Typography>
        ) : (
          step.content
        )}
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: isLastStep ? "flex-end" : "space-between",
        }}
      >
        {!isLastStep && (
          <Button color="inherit" variant="text" {...skipProps}>
            {skipProps.title}
          </Button>
        )}

        <div>
          {index > 0 && (
            <Button color="primary" variant="text" {...backProps}>
              {backProps.title}
            </Button>
          )}

          <Button
            color="primary"
            variant={isLastStep ? "contained" : "outlined"}
            {...primaryProps}
          >
            {primaryProps.title} ({index + 1}/{size})
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};
