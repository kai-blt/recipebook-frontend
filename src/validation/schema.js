import * as yup from "yup";

export default yup.object().shape({
  name: yup
    .string()
    .required("Please enter a recipe name")
    .matches("^[a-zA-Z0-9_ ]*$", "Your title must use the characters a-z, A-Z, 0-9 or _")
    .min(3, "Please provide a recipe name that is 3 or more characters in length"),
  type: yup
    .string(),
  imageURL: yup
    .string()
    .url("Please enter a valid url"),   
  quantity: yup
    .string(),
  measurement: yup
    .string(),
  ingredientname: yup
    .string(),
  group: yup
    .string(),
  instructions: yup
    .string()
    
});
