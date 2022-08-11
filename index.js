const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

const port = process.env.PORT | '7000';


//Limiting Middleware
const limiter = rateLimit({
    max: 3,
    windowMs: 3 * 60 * 1000,
    message: 'Too many request from this IP, Please try again after 3 minutes'
});
app.use('*', limiter);



function calculateAge(birthday) {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

app.get('/api', (_, res) => {
  return res.json({ message: 'ok!', status: 200 });
});

app.get('/howold', (req, res) => {
  const dob = req.query.dob;
  const date = new Date(dob);

  if (!dob) {
    // you can change message, or remove this comment
    return res.json({ message: 'dob required in params', status: 422 });
  } else if (!date.getTime()) {
    // you can change message, or remove this comment
    return res.json({ message: 'invalid date provided', status: 422 });
  }

  const age = calculateAge(date);
  // you can change message, or remove this comment
  return res.json({ message: 'ok!', status: 200, data: { age } });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
