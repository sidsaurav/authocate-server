const loginUser = (req, res) => {
  const username = req.body.username
  const password = req.body.password
  res.send(`Username: ${username}, Password: ${password}`)
}

const logoutUser = (req, res) => {
  res.send('logout user')
}
const signupUser = (req, res) => {
  res, send('signup user')
}

const getUser = (req, res) => {
  res.send('get user')
}

module.exports = {
  loginUser,
  logoutUser,
  signupUser,
  getUser,
}
