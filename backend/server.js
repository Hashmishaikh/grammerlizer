import path from 'path';
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectToMongoDb from "./db/connectToMongoDb.js";
import cors from 'cors'

import authRouters from "./routes/auth.routes.js";
import grammerCorrection from "./routes/grammerCorrection.routes.js";
import payments from './routes/payment.routes.js'
import handleCompletePayment from "./webhooks/handleComplePayment.js";
// import { updateSubscriptionStatus } from './controller/stripe.js';
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:80','https://grammartoolweb.onrender.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  // allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};
app.use(cors(corsOptions));

dotenv.config();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use("/api", handleCompletePayment); //webhook of payment 

app.use(express.json()); //to parse data from the income data (req.body)
app.use(cookieParser()); //to parse the cookie of the incoming data

// api || router
// app.get("/", (req, res) => {
//   res.send("hi everyone");
// });
app.use("/api/auth", authRouters);
app.use("/api/grammer-correction", grammerCorrection);
app.use("/api/payments", payments);

app.use(express.static(path.join(__dirname,'/frontend/dist')));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server running on port ${PORT}`);
});
