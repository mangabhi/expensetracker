const express = require('express');
const connectDB = require('./dbconnect');
const app = express();
const path = require('path')
const port = process.env.PORT || 5000;

app.use(express.json());
const usersRoute = require('./routes/usersRoutes');
const transactionsRoute = require('./routes/transactionsRoute')

app.use('/api/users', usersRoute);
app.use('/api/transactions/' , transactionsRoute)

if(process.env.NODE_ENV === 'production')
{
     app.use('/' , express.static('client/build'))

     app.get('*' , (req, res)=>{
         res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
     })
}

app.listen(port, () => {
  console.log(`NodeJs started at PORT http://localhost:${port}`);
});