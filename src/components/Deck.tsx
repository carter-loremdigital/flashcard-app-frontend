// import { Card, CardContent, Typography } from "@mui/material";
// import Box from "@mui/material";
// import Divider from "@mui/material";
// import Typography from "@mui/material";
import { Box, Typography, Divider } from "@mui/material";

type Props = {
  index: number;
  name: string;
  description?: string;
};

const Deck = ({ index, name, description }: Props) => {
  return (
    <Box
      sx={{
        p: 2,
        border: "3px solid",
        borderColor: "black",
        height: 160,
        color: "#000",
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
        boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        ":hover": {
          boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)",
          transform: index % 2 ? "rotate(2deg)" : "rotate(-2deg)",
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </Typography>
      <Divider
        sx={(theme) => ({
          // my: 1,
          mb: 1,
          mx: -2,
          borderBottomWidth: 2,
          borderColor: theme.palette.secondary.main,
        })}
        variant="fullWidth"
      />
      <Box
        sx={{
          height: "100%",
          // Create blue horizontal lines using a repeating linear gradient
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 19px, lightblue 19px, lightblue 20px)",
          backgroundSize: "100% auto",
          mx: -2,
          px: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 6, // Limit to 6 lines
            WebkitBoxOrient: "vertical",
          }}
        >
          {description ? description : "No description"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Deck;
