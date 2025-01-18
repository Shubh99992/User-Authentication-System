const fs = require('fs');
const joi = require('joi');

// schema using Joi
const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  age: joi.number().integer().min(18).required(),
  state: joi.string().required(),
  password: joi.string().min(6).required()
});

const signup = (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const users = JSON.parse(fs.readFileSync('./users.json'));
  const newUser = req.body;
  users.push(newUser);
  fs.writeFileSync('./users.json', JSON.stringify(users));

  res.status(201).send('User registered successfully');
};

const login = (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync('./users.json'));
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).send('Email or password is wrong');
  
  res.status(200).send('Login successful');
};

module.exports = { signup, login };
