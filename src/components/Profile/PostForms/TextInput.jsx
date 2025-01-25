import { useTheme } from '@emotion/react'
import React, { useEffect } from 'react'
import { useStyles } from './postFormsStyles'
import { TextField } from '@mui/material'

const TextInput = ({inputRef,placeholder,value,onChange}) => {
    const theme = useTheme()
    const styles = useStyles({theme})

    useEffect(() => {
        const input = inputRef.current;
        if (input) {
          input.style.height = 'auto'; // Reset the height
          input.style.height = `${input.scrollHeight}px`; // Set the height to the scroll height
        }
      }, [value]);

    return (
        <TextField
            ref={inputRef}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            className={styles.input}
            InputLabelProps={{
            classes: {
                root: styles.label,
            },
            }}
        />
    )
}

export default TextInput