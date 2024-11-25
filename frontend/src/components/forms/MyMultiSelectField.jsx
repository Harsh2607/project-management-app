import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, selectedValues, theme) {
    return {
        fontWeight: selectedValues.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function MyMultiSelectField({ control, name, label, options, width }) {
    const theme = useTheme();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={[]} // Ensure this matches your form's initialization
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl
                    sx={{ mt: 1, width: width }}
                    error={!!error} // Add error styling to the FormControl
                >
                    <InputLabel id={`${name}-label`}>{label}</InputLabel>
                    <Select
                        labelId={`${name}-label`}
                        id={`${name}-select`}
                        multiple
                        value={value || []} // Ensure `value` is always an array
                        onChange={(event) => onChange(event.target.value)}
                        input={<OutlinedInput id={`${name}-select-multiple-chip`} label={label} />}
                        renderValue={(selected) => (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                {selected.map((id) => {
                                    const selectedOption = options.find((option) => option.id === id);
                                    return selectedOption ? (
                                        <Chip key={id} label={selectedOption.name} />
                                    ) : null;
                                })}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {options.map((option) => (
                            <MenuItem
                                key={option.id}
                                value={option.id}
                                style={getStyles(option.name, value || [], theme)}
                            >
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
            )}
        />
    );
}
