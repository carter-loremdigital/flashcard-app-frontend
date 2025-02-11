import { Box, Typography, Paper, Link } from "@mui/material";
import { Circle, Code, GitHub, Public } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        color: "white",
        py: 2,
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Paper
        sx={{ maxWidth: "max-content", backgroundColor: "#fdfd96", mx: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: { xs: "center" },
            gap: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Made by
            <Link
              href="https://github.com/carter-loremdigital"
              target="_blank"
              sx={{
                ml: 0.5,
                display: "inline-flex",
                alignItems: "center",
                textWrap: "nowrap",
              }}
            >
              <GitHub />
              carter-loremdigital
            </Link>
          </Typography>
          <Circle
            sx={{
              width: "8px",
              height: "8px",
              display: { xs: "none", sm: "inherit" },
            }}
          />
          <Link
            variant="body1"
            href="https://github.com/carter-loremdigital/flashcard-app-frontend"
            target="_blank"
            sx={{
              ml: 0.5,
              display: "inline-flex",
              alignItems: "center",
              textWrap: "nowrap",
            }}
          >
            <Code />
            Source Code
          </Link>
          <Circle
            sx={{
              width: "8px",
              height: "8px",
            }}
          />
          <Link
            variant="body1"
            href="https://www.loremdigital.co/"
            target="_blank"
            sx={{
              ml: 0.5,
              display: "inline-flex",
              alignItems: "center",
              textWrap: "nowrap",
            }}
          >
            <Public />
            loremdigital.co
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Footer;
