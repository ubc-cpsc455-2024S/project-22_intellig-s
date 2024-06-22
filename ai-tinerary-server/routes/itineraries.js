var express = require("express");
var router = express.Router();
const { v4: uuid } = require("uuid");

const createItinerary = require("../replicate/createItinerary");

const itineraries = [
  {
    id: uuid(),
    location: "Paris, France",
    date_range: "July 14, 2024 - July 16, 2024",
    days: [
      {
        day: "July 14, 2023",
        activities: [
          {
            time: "9:00 AM",
            location: "Eiffel Tower",
            duration: "2 hours",
          },
          {
            time: "11:30 AM",
            location: "Lunch at Le Comptoir du Relais",
            duration: "1.5 hours",
          },
          {
            time: "1:30 PM",
            location: "Louvre Museum",
            duration: "3 hours",
          },
        ],
      },
      {
        day: "July 15, 2023",
        activities: [
          {
            time: "9:00 AM",
            location: "Montmartre",
            duration: "2 hours",
          },
          {
            time: "12:00 PM",
            location: "Lunch at Le Consulat",
            duration: "1.5 hours",
          },
          {
            time: "2:00 PM",
            location: "Palace of Versailles",
            duration: "5 hours",
          },
        ],
      },
      {
        day: "July 16, 2023",
        activities: [
          {
            time: "9:00 AM",
            location: "Notre Dame Cathedral",
            duration: "1.5 hours",
          },
          {
            time: "11:30 AM",
            location: "Lunch at Breizh Café",
            duration: "1.5 hours",
          },
          {
            time: "1:30 PM",
            location: "Champs-Élysées",
            duration: "2 hours",
          },
        ],
      },
    ],
  },
  {
    id: uuid(),
    location: "Calgary, Canada",
    date_range: "January 10, 2024 - January 14, 2024",
    days: [
      {
        day: "January 10, 2024",
        activities: [
          {
            activity: {
              time: "10:00 AM",
              location: "Calgary Tower",
              duration: "2 hours",
            },
          },
          {
            activity: {
              time: "1:00 PM",
              location: "The Beltliner",
              duration: "2 hours",
            },
          },
        ],
      },
      {
        day: "January 11, 2024",
        activities: [
          {
            activity: {
              time: "9:00 AM",
              location: "Glenbow Museum",
              duration: "3 hours",
            },
          },
          {
            activity: {
              time: "7:00 PM",
              location: "National on 10th",
              duration: "3 hours",
            },
          },
        ],
      },
      {
        day: "January 12, 2024",
        activities: [
          {
            activity: {
              time: "10:00 AM",
              location: "Prince's Island Park",
              duration: "2 hours",
            },
          },
          {
            activity: {
              time: "6:00 PM",
              location: "Bow River Pathway",
              duration: "2 hours",
            },
          },
        ],
      },
      {
        day: "January 13, 2024",
        activities: [
          {
            activity: {
              time: "9:30 AM",
              location: "Calgary Zoo",
              duration: "4 hours",
            },
          },
        ],
      },
      {
        day: "January 14, 2024",
        activities: [
          {
            activity: {
              time: "11:00 AM",
              location: "TELUS Spark Science Centre",
              duration: "3 hours",
            },
          },
        ],
      },
    ],
  },
];

/* GET itineraries listing. */
router.get("/", function (req, res, next) {
  res.send(itineraries);
});

router.post("/", async function (req, res, next) {
  const { location, date_range } = req.body;

  const response = await createItinerary(location, date_range);

  let itinerary = {
    id: uuid(),
    location: location,
    date_range: date_range,
    ...JSON.parse(response),
  };
  console.log(itinerary);
  itineraries.push(itinerary);
  res.send(itinerary);
});

router.delete("/:itineraryId", function (req, res, next) {
  const itineraryId = req.params.itineraryId;
  const itineraryIndex = itineraries.findIndex(
    (itinerary) => itinerary.id == itineraryId
  );

  if (itineraryIndex === -1) {
    return res.status(404).send({ message: "Itinerary not found" });
  }

  itineraries.splice(itineraryIndex, 1);
  return res.status(200).send({ message: "Itinerary deleted successfully" });
});

module.exports = router;
