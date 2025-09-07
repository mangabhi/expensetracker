const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sefora:sefora@cluster0.9toyt.mongodb.net/expensetracker?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));

connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

