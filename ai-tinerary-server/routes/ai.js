var express = require("express");
var router = express.Router();
// const { v4: uuid } = require("uuid");
const replicateIt = require("../replicate/replicate");

const initialItineraries = [
  {
    id: 1,
    name: "Trip to Paris",
    dates: "June 12 - June 13, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=3273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Explore Tokyo",
    dates: "August 15 - August 25, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1544885935-98dd03b09034?q=80&w=3059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "New York Adventure",
    dates: "September 5 - September 15, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

router.post("/itinerary", async function (req, res, next) {
  const response = await replicateIt();
  res.send(response);
});

router.get("/", function (req, res, next) {
  res.send(initialItineraries);
});

router.post("/", function (req, res, next) {
  const { name, description, age, image } = req.body;
  if (!name || !description || !age || !image) {
    return res.status(400).send("There is a member property missing");
  }

  const member = {
    id: uuid(),
    name: name,
    description: description,
    age: age,
    image: image,
  };
  members.push(member);
  res.send(member);
});

router.delete("/:memberId", function (req, res, next) {
  const memberId = req.params.memberId;
  const memberIndex = members.findIndex((member) => member.id == memberId);

  if (memberIndex === -1) {
    return res.status(404).send({ message: "Member not found" });
  }

  members.splice(memberIndex, 1);
  return res.status(200).send({ message: "Member deleted successfully" });
});

module.exports = router;
