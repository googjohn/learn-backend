const express = require('express');
const app = express();

const PORT = 3005

app.use('/api/contacts', require('./routes/contactRoutes'))
// app.use('/api/contacts/:id', require('./routes/contactRoutes'))
// app.use('/api/contacts', require('./routes/contactRoutes'))
// app.use('/api/contacts', require('./routes/contactRoutes'))
// app.use('/api/contacts', require('./routes/contactRoutes'))
// app.use('/api/contacts/:id', require('./routes/contactRoutes'))
app.use('/api/users', require('./routes/userRoutes'))






app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`)
})