const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config();

const app = express();
app.use(cors({
  origin:"*"
}))

app.use(express.json())

app.post('/download',async(req,res)=>{
  const {vidUrl} = req.body
  const options = {

    method: 'GET',
    url: process.env.url,
    params: {
      url: vidUrl
    },
    headers: {
      'X-RapidAPI-Key': process.env.Key,
      'X-RapidAPI-Host': process.env.Host
    }
  };

  try {
    const response = await axios.request(options);
    const responseData = response.data;

    // Send the response data back to the frontend
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching the video' });
  }
});


app.listen(4000,()=>{
  console.log("server running")
})