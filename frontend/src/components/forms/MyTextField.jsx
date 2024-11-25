import * as React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function MyTextField(props) {
  const { label, placeholder, name, control, width } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field} // Spread the field props to the TextField
          id="outlined-basic"
          label={label}
          sx={{ width: width, mt: 1 }}
          onChange={field.onChange}
          value={field.value}
          variant="outlined"
          placeholder={placeholder}
          error={!!fieldState.error} // Set error state
          helperText={fieldState.error ? fieldState.error.message : ""} // Display error message if exists
        />
      )}
    />
  );
}
