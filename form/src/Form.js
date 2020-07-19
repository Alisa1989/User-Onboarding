import React, {useState} from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required("Must input a name"),
    email: yup.string().email("Must be a valid email address").required("Must input an email"),
    password: yup.string().required("Must input a password"),
    program: yup.string(),
    details: yup.string(),
    terms: yup.boolean().oneOf([true], "Read and Agree terms of use")
});

const Form = () => {

const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    program: "",
    details: "",
    terms: false
});

const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    password: "",
    program: "",
    details: "",
    terms: ""
})

const validate = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrorState({
          ...errorState,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0]
        });
      });
  };

const inputChange = e => {
    e.persist();
    console.log("input changed", e.target.value, e.target.checked);
    validate(e);
    let value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({...formState, [e.target.name]: value});
}

const formSubmit = e => {
    e.preventDefault();
    console.log("form submitted");
    axios
      .post("https://reqres.in/api/users", formState)
      .then(response => console.log(response))
      .catch(err => console.log(err));
}

    return (
    <form>
        <label>
            Name
            <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={formState.name}
            onChange={inputChange}
            />
            {errorState.name.length > 0 ? (     
          <p className="error">{errorState.name}</p>
        ) : null}
        </label>
        <label>
            Email
            <input
            type="email"
            name="email"
            id="email"
            placeholder="Input Email"
            value={formState.email}
            onChange={inputChange}
            />
            {errorState.email.length > 0 ? (
          <p className="error">{errorState.email}</p>
        ) : null}
        </label>
        <label>
            Password
            <input
            type="password"
            name="password"
            id="password"
            placeholder="Input Password"
            value={formState.password}
            onChange={inputChange}
            />
            {errorState.password.length > 0 ? (
          <p className="error">{errorState.password}</p>
        ) : null}
        </label>
        <label htmlFor="program">
        What program are you interested in?
        <select
          name="program"
          id="program"
          value={formState.position}
          onChange={inputChange}
        >
          <option value=" ">Please select an option</option>
          <option value="Private Yoga Sessions">Private Yoga Sessions</option>
          <option value="Intro to meditation">Intro to meditation</option>
          <option value="Health Coaching">Health Coaching</option>
        </select>
      </label>
      <label htmlFor="details">
        Is there something you would like me to know?
        <textarea
          type="text"
          name="details"
          id="details"
          placeholder="example: pains, concerns, difficulties, dietary restrictions..."
          value={formState.details}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="terms">
        Terms and Conditions
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
      </label>
      <button>Submit</button>
    </form>
     );
 }

export default Form;
