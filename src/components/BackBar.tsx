import { Box, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

type Props = {
  href: string;
};

const BackBar = ({ href }: Props) => {
  return (
    <Box sx={{ borderRadius: 2 }}>
      <Box
        sx={{
          backgroundColor: "#a7dbd8",
          border: "3px solid black",
          display: "flex",
          boxShadow: "6px 6px 0px black",
          borderRadius: 0,
        }}
      >
        <IconButton
          href={href}
          sx={{
            margin: "4px",
            width: "40px",
            height: "40px",
            minWidth: 0,
            border: "2px solid black",
            boxShadow: "2px 2px 0px black",
            color: "black",
            backgroundColor: "lightgray",
            borderRadius: 0,
            ":hover": {
              backgroundColor: "lightgray",
              filter: "brightness(90%)", // Reduce brightness by 10%
              boxShadow: "2px 2px 0px black",
            },
          }}
          aria-label="back"
        >
          <ArrowBack />
        </IconButton>
      </Box>
    </Box>
  );
};

export default BackBar;
