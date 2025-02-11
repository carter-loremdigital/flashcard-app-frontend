import { Box, Typography, Divider } from "@mui/material";
type Props = {
  id: number;
  question: string;
  answer: string;
};

const Flashcard = ({ id, question, answer }: Props) => {
  return (
    <Box
      key={id}
      sx={{
        border: "3px solid black",
        p: 2,
        mb: 2,
        boxShadow: "4px 4px 0px black",
        backgroundColor: "#fffff0",
      }}
    >
      <Typography variant="h6">Q: {question}</Typography>
      <Divider
        sx={(theme) => ({
          my: 2,
          borderBottomWidth: 2,
          borderColor: theme.palette.primary.main,
          borderBottomStyle: "dashed",
        })}
      />
      <Typography variant="body1">A: {answer}</Typography>
    </Box>
  );
};

export default Flashcard;
