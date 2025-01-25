import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Formik, Form, ErrorMessage } from 'formik';
import { EditSchema } from "./EditSchema";
import EditField from "./EditField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";


export default function EditForm(){
    const {user} = useContext(AuthContext);
    const [initialValues, setInitialValues] = useState(null);
    const navigate = useNavigate();

    useEffect (() => {
        if(user){
            setInitialValues({
                username: user?.username,
                name: user?.name,
                email: user?.email,
                password: '',
                "confirm password": ''
            });
        }
    }, [user]);

    const capitalize =(name)=>{
        const words = name.split(" ");
    
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        return words.join(" ");

    }

    return(
      initialValues === null ? <div>Loading...</div> :

        <Formik
      initialValues={initialValues}
      validationSchema={EditSchema}
      onSubmit={(values, { setSubmitting }) => {
        const submitValues = async()=>{
          const response = await axiosInstance.patch(`/users/${user?.id}`, values);

        }
        try {
          submitValues();
          navigate('/home');
        } catch (error) {
          console.error(error);

      }}}
    >
      {({ isSubmitting, handleChange, handleBlur, values }) => (
        <Form>
            {Object.keys(values).map((key,index) => {
                return  <>
                    <EditField
                        key={index}
                        name={key}
                        label={capitalize(key)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        handleChange={handleChange}
                        onBlur={handleBlur}
                        value={values[key]}
                        helperText={<ErrorMessage name={key} />}
                        />
                    </> 
            }
            )}
          <div className="d-flex justify-content-center w-100 mt-3 mb-4" >

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            sx={{fontWeight:"bold",textTransform:"capitalize",borderRadius:4}}
            >
            Submit
          </Button>
          </div>

        </Form>
      )}
    </Formik>
  );
    
}