import express from "express";
import cors from "cors";
import { usersList } from "./utils/users.js";
import { formatNumber, validate } from "./utils/helpers.js";

const app = express();

const delay = 5000; // 5 seconds

// Variable to keep track of the current response timeout
let currentTimeout: ReturnType<typeof setTimeout> | null;

app.use(express.json());
app.use(cors());

app.post("/users", (req, res) => {
  if (currentTimeout) {
    clearTimeout(currentTimeout);
  }

  // Start a new timeout for the current request
  currentTimeout = setTimeout(() => {
    const { email, number } = req.body;
    const formattedNumber = formatNumber(number);

    const validations = validate(formattedNumber, email);
    if (validations.length) {
      return res.status(403).send({ validations });
    }

    const result = usersList.filter((user) => {
      if (user.number)
        return (
          user.email.includes(email) &&
          user.number.includes(formattedNumber)
        );

      return user.email.includes(email);
    });
    res.send(result);
  }, delay);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001...");
});
