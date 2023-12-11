// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const status = err.status || 500; 
  const message = err.message || "Error interno del servidor"; 
  console.error(err); 
  res.status(status).send(message); 
};
