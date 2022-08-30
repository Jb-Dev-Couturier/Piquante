import PasswordValidator from 'password-validator'

const passwordModel = new PasswordValidator()

passwordModel
  .is()
  .min(10)
  .is()
  .max(64)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();  

  export default passwordModel;