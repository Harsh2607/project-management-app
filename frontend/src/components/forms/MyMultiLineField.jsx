import * as React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function MyMultiLineField(props) {
  const { label, placeholder, name, control, width } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field} // Spread the field props
          id="outlined-multiline-static"
          label={label}
          sx={{ width: width, mt: 1 }}
          multiline
          rows={1}
          onChange={field.onChange}
          value={field.value}
          placeholder={placeholder}
          error={!!fieldState.error} // Set error state
          helperText={fieldState.error ? fieldState.error.message : ""} // Display error message if exists
        />
      )}
    />
  );
}
