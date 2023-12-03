import express from "express";
const app = express()
import routes from "./routes.mjs";
import mongoose from "mongoose";
import uri from "./conection.mjs";
const Uri = uri() 
console.log(Uri)
mongoose.connect(Uri)
  .then(() => {
    console.log('database connected');
  })
  .catch(err => {
    console.log(err);
    throw err; // Relanza el error para que sea capturado más adelante si la conexión falla
  });
app.use(routes)
app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));