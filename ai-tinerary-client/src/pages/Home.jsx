import { Container, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <Container
      sx={{ mt: 4 }}
      style={{ backgroundColor: "#EDE8F5", height: "100vh" }}
    >
      <Typography variant="h4" color="primary">
        Home Page
      </Typography>
      <Typography color="secondary">Welcome to the home page.</Typography>
      <Container sx={{ mt: 5 }}>
        <SearchBar autoCompleteList={["test"]} />
      </Container>
    </Container>
  );
};

export default Home;
