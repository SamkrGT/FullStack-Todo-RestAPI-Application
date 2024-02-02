import {useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
import { createTodoApi, retriveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useEffect, useState } from "react"
import { Form, Formik, Field, ErrorMessage } from 'formik'
import moment from "moment"

export default function TodoComponent(){

    const {id} = useParams()
    const navigate  = useNavigate()

    const[description, setDescription] = useState('')
    const[targetDate, setTargetDate] = useState('')

    const authContext = useAuth()

    const username = authContext.username

    useEffect( () => retriveTodos())

    function retriveTodos(){
        if(id != -1){
            retriveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
        }
    }

    function onSubmit(values){
        console.log(values)
        
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        if(id == -1){
            createTodoApi(username, todo)
            .then(response => {
                navigate("/todos")
            })
            .catch(error => console.log(error))
        }
        else{
            updateTodoApi(username, id, todo)
            .then(response => {
                navigate("/todos")
            })
            .catch(error => console.log(error))
        }
    }

    function validate(values){

        let errors = {
            
        }

        if(values.description.length<5){
            errors.description = 'Enter atleast 5 characters'
        }

        if(values.targetDate === null || values.targetDate === "" || !moment(values.targetDate).isValid()){
            errors.targetDate = 'Enter valid date'
        }
        
        console.log(errors)

        return errors;
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{description, targetDate}} 
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
                >
                    {
                        (props) => (
                            <Form>

                                <ErrorMessage 
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <ErrorMessage 
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                </fieldset>
                                
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate" />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}