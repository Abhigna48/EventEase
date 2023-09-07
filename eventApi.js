const exp = require("express");
const eventApp=exp.Router();
const errorHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const verifyToken=require('./middlewares/verifyToken');


// Create a new event (POST request)
eventApp.post("/create", verifyToken, errorHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required." });
  }

  const newEvent = { id: events.length + 1, title };
  events.push(newEvent);

  res.status(201).json(newEvent);
}));

// Get all events (GET request)
eventApp.get("/events", verifyToken, errorHandler(async (req, res) => {
  res.status(200).json(events);
}));


// Update an existing event by ID (PUT request)
eventApp.put("/update/:eventId", verifyToken, errorHandler(async (req, res) => {
  const eventId = parseInt(req.params.eventId);
  const { title } = req.body;

  const eventIndex = events.findIndex((e) => e.id === eventId);

  if (eventIndex === -1) {
    return res.status(404).json({ message: "Event not found." });
  }

  if (!title) {
    return res.status(400).json({ message: "Title is required." });
  }

  events[eventIndex].title = title;
  res.status(200).json(events[eventIndex]);
}));

// Delete an event by ID (DELETE request)
eventApp.delete("/delete/:eventId", verifyToken, errorHandler(async (req, res) => {
  const eventId = parseInt(req.params.eventId);

  const eventIndex = events.findIndex((e) => e.id === eventId);

  if (eventIndex === -1) {
    return res.status(404).json({ message: "Event not found." });
  }

  events.splice(eventIndex, 1);
  res.status(204).send();
}));

module.exports = eventApp;