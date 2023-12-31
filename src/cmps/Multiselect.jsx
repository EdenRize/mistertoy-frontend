import { useEffect, useRef, useState } from "react"
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

export function Multiselect({ options, label, onSelect }) {
    const theme = useTheme()
    const [chosenOptions, setChosenOptions] = useState([])

    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8
    const MenuProps = {
        sx: {
            "&& .Mui-selected": {
                backgroundColor: "#495E57",
                color: '#F4CE14'
            },
            "&& .Mui-selected:hover": {
                backgroundColor: '#495e57b0'
            },
            ".MuiMenuItem-root:hover": {
                backgroundColor: '#495e57b0'
            },
            ".MuiMenuItem-root": {
                transition: '0.2s'
            }

        },
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 200,
            },
        },
    }

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        }
    }

    function handleChange(ev) {
        const {
            target: { value },
        } = ev;

        setChosenOptions(
            typeof value === 'string' ? value.split(',') : value,
        )
        onSelect(value)
    }

    return (
        <div className='multiselect'>
            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={chosenOptions}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label={label} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {options.map((option) => (
                        <MenuItem
                            key={option}
                            value={option}
                            style={getStyles(option, chosenOptions, theme)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}