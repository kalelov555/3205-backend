export const formatNumber = (number: string) => {
  return number.split("-").join("");
};

export const validate = (number: string, email: string) => {
  const validations = [];
  if (!email) {
    validations.push("Email is required!");
    return validations;
  }

  const regexNumber = new RegExp("^[0-9]*$");
  const isNumber = regexNumber.test(number);
  if (!isNumber)
    validations.push("Number is in incorrect format");

  const regexEmail = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const isEmail = regexEmail.test(email);
  if (!isEmail)
    validations.push("Email is in incorrect format");

  return validations;
};
