export  const emailCheck = (req, res, next) => {
  const validEmail = (email) => {
    let emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let isRegexTrue = emailRegexp.test(email);
    isRegexTrue ? next() : res.status(400).json({ message: 'mail non valide' });
  };
  validEmail(req.body.email);
};