import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { withFormik, Form, Field  } from "formik";
import * as yup from "yup";
import { __values } from 'tslib';
import ListMod from './List';


function FormMod ({values, errors, touched, status}) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (status) {
          setUsers([...users, status]);
        }
      }, [status]);
    return(
        <div>
            <Form>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field key="name" type="text" name="name" placeholder=" Username" className="field"></Field>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field key="email" type="text" name="email" placeholder=" Email" className="field"></Field>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field key="password" type="password" name="password" placeholder=" Password" className="field"></Field>
                <label className="tos">
                    <Field key="terms" type="checkbox" name="terms" checked={values.terms} ></Field>
                    Terms of Service
                </label>
                <button type="submit">Submit</button>
            </Form>
            <div className="cardContainer">
                <ListMod users={users}/>
            </div>
        </div>
    )
}
const formikHOC = withFormik({
    mapPropsToValues({ name, email, password, terms}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },
    validationSchema: yup.object().shape({
        name: yup.string()
            .max(100, "100 characters max")
            .required("Name is required"),
        email: yup.string()
            .email("Email not valid")
            .required("Email is required"),
        password: yup.string()
            .min(6, "Password must be 6 characters or longer")
            .required("Password is required")
    }),
    handleSubmit(values, {setStatus}) {
        axios.post('https://reqres.in/api/users/', values)
        .then(response => {
            console.log(response.data);
            setStatus(response.data);
            //setUsers(response.data);
        });
    }
})(FormMod);

export default formikHOC