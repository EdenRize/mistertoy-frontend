import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export function SwitchBtn({ btnName, isOn, onChange }) {

    return (
        <FormControl component="fieldset" variant="standard">
            <FormControlLabel
                control={
                    <Switch checked={isOn} onChange={onChange} name={btnName} />
                }
            />

        </FormControl>
    );
}