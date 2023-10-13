const express = require('express');
const cors = require('cors');
const app = express();
const apiRouter = require('./router/route.js')
const port = 5000;

app.use(express.json());
app.use(cors());
app.use('/api', apiRouter);


app.get('/', (req, res)=>{
    res.send("Hello from server")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
