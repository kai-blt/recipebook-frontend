import { useState } from 'react';
import * as yup from 'yup';
import schema from '../../validation/schema';

//Initial Form Values
export const initialFormValues = {
  name: "(Enter Title)",
  type: "(Enter Type)",
  imageURL: "",
  ingredients: [{ quantity: "", measurement: "", name: "", ingredientgroup: "" }],
  steps: [{stepnumber: 1, instructions: ""}]
};

export const initialErrors = {
  name: "",
  type: "",
  imageURL: "",
  quantity: "",
  ingredientname: "",
  measurement: "",
  group: "",
  instructions: ""
};

//Form Helper Functions
export const useFormHelpers = () => {
  const [formValues, setFormValues] = useState(initialFormValues);  
  const [errors, setErrors] = useState(initialErrors);

  const addIngredient = (e, index) => {
    e.preventDefault();
    const addIngredients = { ...formValues };
    addIngredients.ingredients.splice(index + 1, 0, {quantity: "", measurement: "", name: "", ingredientgroup: ""});
    setFormValues(addIngredients);
  };

  
  const delIngredient = (e, ingIndex) => {
    e.preventDefault();
    if (formValues.ingredients.length !== 1) {
        const delIngredient = formValues.ingredients.filter((ing, index)=> index !== ingIndex); 
        setFormValues({ ...formValues, ingredients: delIngredient });
    };
  };

  const addStep = (e, index) => {
    e.preventDefault();
    const addSteps = { ...formValues };
    addSteps.steps.splice(index + 1, 0, {stepnumber: index + 1, instructions: ""});
    addSteps.steps.map((step, index) => step.stepnumber = index + 1);
    setFormValues(addSteps);
  };

  const delStep = (e, stpIndex) => {
    e.preventDefault();
    if (formValues.steps.length !== 1) {
        const delSteps = formValues.steps.filter((stp, index) => index !== stpIndex);  
        delSteps.map((step, index) => step.stepnumber = index + 1);
        setFormValues({ ...formValues, steps: delSteps });  
    };
  };

  const handleChange = (e, index) => {
    yup.reach(schema, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setErrors({...errors, [e.target.name]: ""})
      })
      .catch(err => {
        setErrors({...errors, [e.target.name]: err.errors[0] })
      });

    switch(e.target.name) {
      case "ingredientname":
        const newIngName = [ ...formValues.ingredients ];
        newIngName[index].name = e.target.value;
        setFormValues({...formValues, ingredients: newIngName });
        break;
      case "quantity":
        const newIngQuantity = [ ...formValues.ingredients ];
        newIngQuantity[index].quantity = e.target.value;  
        setFormValues({ ...formValues, ingredients: newIngQuantity });
        break;
      case "measurement":
        const newIngMeasurement = [ ...formValues.ingredients ];
        newIngMeasurement[index].measurement = e.target.value;  
        setFormValues({ ...formValues, ingredients: newIngMeasurement });
        break;
      case "group":
        const newGroup = [ ...formValues.ingredients ];
        newGroup[index].ingredientgroup = e.target.value;  
        setFormValues({ ...formValues, ingredients: newGroup });
        break;
      case "instructions":
        const newSteps = [ ...formValues.steps ];
        newSteps[index].instructions = e.target.value;        
        setFormValues({ ...formValues, steps: newSteps });
        break;
      default:
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        break;
    };
  }; 

  return {
    initialFormValues,
    initialErrors,
    errors,
    setErrors,
    formValues,
    setFormValues,
    addIngredient,
    delIngredient,
    addStep,
    delStep,
    handleChange };
};

