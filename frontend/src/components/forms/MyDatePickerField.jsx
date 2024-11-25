import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";

export default function MyDatePickerField(props) {
  const { label, name, control, width } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <DatePicker
            {...field} // Spread the field props
            label={label}
            sx={{ width: width, mt: 1 }}
            onChange={(value) => field.onChange(value)}
            value={field.value}
            slotProps={{
              textField: {
                variant: "outlined",
                error: !!fieldState.error, // Set error state
                helperText: fieldState.error ? fieldState.error.message : "", // Display error message if exists
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
