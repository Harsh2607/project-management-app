import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";

export default function MySelectField({ label, name, control, width, onChange, value, options }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth sx={{ width: width, mt: 1 }}>
          <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
          <Select
            {...field}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            onChange={(e) => {
              field.onChange(e); // Update react-hook-form state
              onChange?.(e.target.value); // Call custom onChange if provided
            }}
            sx={{
              textAlign: "left", // Align text to the left
              display: "flex", // Ensure flex display for proper alignment
              justifyContent: "flex-start", // Align content to the start
            }}
            value={value ?? field.value}
            error={!!fieldState.error} // Set error state
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200, // Limit dropdown height
                  overflow: "auto",
                },
              },
            }}
          >
            {options.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ color: "#D32F2F" }}>
            {fieldState.error?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
