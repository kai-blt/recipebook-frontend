import * as yup from "yup";

export default yup.object().shape({
    name: yup
        .string()
        .required("Please enter a recipe name")
        .min(3, "Recipe name must be 3 or more characters"),
    type: yup
        .string(),
    imageURL: yup
        .string(),   
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
