const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const updatedUserData = req.body;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user data with the new data from the request body
    users[userIndex] = { ...users[userIndex], ...updatedUserData };

    return res.json({
      status: "User Edited Successfully..",
      body: users[userIndex],
    });
  })
  .delete((req, res) => {
    return res.json({ status: "Pending..." });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  //   console.log(body);
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
