import { Card, CardContent, Typography } from "@mui/material";

type Props = {
  title: string;
};

const Deck = ({ title }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h2" component="h1" gutterBottom>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Deck;
