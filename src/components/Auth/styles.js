import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'gray', // Default border color
      },
      '&:hover fieldset': {
        borderColor: 'white', // Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white', // Border color when focused
      },
    },

    '& .MuiInputBase-input': {
      color: 'white', // Text color
    },
    '& .MuiInputLabel-root': {
      color: 'white', // Label color
    },
  },
  input: {
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    marginTop: '1rem !important',
    color: 'white',
    borderColor: 'white',
    borderRadius: "30px !important",
    width: "fit-content",
    marginBottom: "1rem !important",
  },
});

export default useStyles;