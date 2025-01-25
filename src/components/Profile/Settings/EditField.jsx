import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Field } from "formik";
import { useState } from "react";

export default function EditField({name, label, handleChange, handleBlur, value,helperText}) {
    const [showPassword, setShowPassword] = useState(false);
    const getIcon =()=>{
        if(name == "password" || name == "confirm password"){
            return {
                
                    endAdornment: (
                        <InputAdornment position="end">

                        <IconButton onClick={()=>setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                        </InputAdornment>
                    )
                
                }

        } 
        return {}
    }
    const getPrefix = ()=>{
        if(name =='username'){
            return {
                startAdornment: (
                    <InputAdornment position="start">
                        @
                    </InputAdornment>
                )
            }
        }
        return {}
    }

    const getType =()=>{
        if(name == "password" || name == "confirm password"){
            return showPassword ? "text" : "password"
        }
        return "text"
    }

    return (
        <div>
            <Field
                as={TextField}
                name={name}
                label={label}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                type={getType()}
                helperText={helperText}
                slotProps={{input: {...getPrefix(),...getIcon()}}}
            />
        </div>
)
}