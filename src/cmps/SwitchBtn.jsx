import { useEffect, useState } from 'react'
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';

export function SwitchBtn({ btnName, label, isOn, onChange }) {

    return (
        <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">{label}</FormLabel>
            <FormControlLabel
                control={
                    <Switch checked={isOn} onChange={onChange} name={btnName} />
                }
            />

        </FormControl>
    );
}