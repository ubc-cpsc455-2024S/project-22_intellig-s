import { useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import ItineraryCard from "../components/ItineraryCard";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectItineraries,
  getItinerariesAsync,
  deleteItineraryAsync,
} from "../redux/itinerarySlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itineraries = [
    {
      id: "17915cb5-4a23-4210-a841-a77dc2c9ccc6",
      location: "Toronto, Canada",
      startDate: "2024-08-02",
      endDate: "2024-08-05",
      imageUrl: "https://media.cntraveler.com/photos/5b2be6938b842c3b35c5d30c/2:1/w_2560%2Cc_limit/Toronto_getty-Images_748610951.jpg"
    },
    {
      id: "72315fe2-99eb-4462-afe0-79ad8dd02b8b",
      location: "Paris, France",
      startDate: "2024-09-12",
      endDate: "2024-09-15",
      imageUrl: "https://etias.com/assets/uploads/8%20Things%20To%20Do%20in%20Paris,%20France.jpg"
    },
    {
      id: "d698945b-d8bb-4b16-a084-b0c75647103a",
      location: "Delhi, India",
      startDate: "2024-04-19",
      endDate: "2024-04-20",
      imageUrl: "https://cdn.britannica.com/16/189816-050-5B006088/neighbourhood-Paharganj-New-Delhi-India.jpg",
      bounds: {
        north: 28.8834997,
        east: 77.3475704,
        south: 28.4046675,
        west: 76.8388921
      }
    },
    {
      id: "91b778a4-5d6f-4a6f-90f4-6f30dcd6daa6",
      location: "Vancouver, BC, Canada",
      startDate: "2024-04-16",
      endDate: "2024-04-17",
      imageUrl: "http://res.cloudinary.com/simpleview/image/upload/v1589990523/clients/vancouverbc/Vancouver_Aerial_2017_1__72115131-4a31-42dc-b369-7a5ccec8273f.jpg",
      bounds: {
        north: 49.3172939,
        east: -123.023068,
        south: 49.198177,
        west: -123.22474
      }
    }
  ];
  
  // or uncomment this if just wanna use all the itineraries from database
  // const itineraries = useSelector(selectItineraries);

  useEffect(() => {
    dispatch(getItinerariesAsync());
  }, [dispatch]);

  const handleDeleteItinerary = (id) => {
    dispatch(deleteItineraryAsync(id));
  };

  const openDetails = (id) => {
    navigate(`/itineraries/${id}`);
  };

  return (
    <Container sx={{ pt: 10, pb: 4, backgroundColor: "#EDE8F5", minHeight: "100vh" }}>
      <Typography variant="h4" color="primary">
        Home Page
      </Typography>
      <Typography color="secondary">Welcome to the home page.</Typography>
      <Container sx={{ mt: 5 }}>
        <SearchBar autoCompleteList={["test"]} />
        <Grid container spacing={4}>
          {itineraries.map((itinerary) => (
            <Grid item xs={12} sm={6} md={4} key={itinerary.id}>
              <ItineraryCard
                itinerary={itinerary}
                onDelete={handleDeleteItinerary}
                onOpen={openDetails}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default Home;
