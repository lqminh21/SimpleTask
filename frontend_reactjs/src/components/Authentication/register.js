
import { Button, Form, FormField, Grid, GridColumn, Input, Label, Segment } from "semantic-ui-react"
import { useFormik } from "formik"
import * as Yup from 'yup'
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Register (){

    const navigate = useNavigate()

    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")
    // const [confirmPassword, setConfirmPassword] = useState("")
    // const [email, setEmail] = useState("")

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
          username: Yup.string()
            .min(6,"Minium 6 characters")
            .max(12,"Maximum 12 characters")
            .required("Required!"),
          email: Yup.string()
            .email("Invalid Email")
            .required("Required!"),
          password: Yup.string()
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,"Password isn't match")
            .required("Required!"),
          confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Password's not match")
          .required("Required!")
        }),
        onSubmit: (values) => {
          axios.post("http://localhost:8080/register",{
            username: formik.values.username,
            email: formik.values.email,
            password: formik.values.password
          })
          .then((res) => {
            alert(JSON.stringify(res.data))
            navigate('/login')
          })
        }
    })

    return(
        
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <GridColumn style = {{maxWidth: '50vh'}}>
            <Form onSubmit={formik.handleSubmit} >
                <Segment padded inverted={true} color="teal">
                    <FormField>
                        <Label size="large" color="teal">Username</Label>
                        <Input
                            type="text"
                            name="username"
                            placeholder = 'Enter Username'
                            value={formik.values.username}
                            onChange={formik.handleChange} 
                            required="required"
                            />
      
                            {formik.errors.username && formik.touched.username && (
                              <p>{formik.errors.username}</p>
                            )}
                    </FormField>
                    <FormField>
                        <Label size="large" color="teal">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder = 'Enter Password'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            required="required"/>
                            {formik.errors.email && formik.touched.email && (
                              <p>{formik.errors.email}</p>
                            )}
                    </FormField>
                    <FormField>
                        <Label size="large" color="teal">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder = 'Enter Password'
                            value={formik.values.password}
                            onChange={formik.handleChange} 
                            required="required"
                            />
      
                            {formik.errors.password && formik.touched.password && (
                              <p>{formik.errors.password}</p>
                            )}
                    </FormField>
                    <FormField>
                        <Label size="large" color="teal">Confirm Password</Label>
                        <Input
                            type="confirmPassword"
                            name="confirmPassword"
                            placeholder = 'Confirm Password'
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange} 
                            required="required"
                            />
      
                            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                              <p>{formik.errors.confirmPassword}</p>
                            )}
                    </FormField>
                    <Button circular fluid type="submit">Submit</Button>
                </Segment>
            </Form>
            </GridColumn>
        </Grid>
    )
}
