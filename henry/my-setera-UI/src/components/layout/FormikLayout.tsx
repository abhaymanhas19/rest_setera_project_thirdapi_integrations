import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from "react-i18next";


function FormikLayout(props: any) {
    const { labelName, type, name, placeholder, form, value, dropDown } = props;
    const { t } = useTranslation();
    //console.log("form ", form.errors)
    switch (type) {
        case "text":
            return (
                <>
                    <div className="form-lable-name">
                        {t(`${labelName}`)}
                    </div>
                    <FormControl sx={{ width: "100%" }}>
                        <TextField
                            name={name}
                            placeholder={placeholder}
                            value={form.values[`${name}`]}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                        />
                    </FormControl>
                    {form.errors[`${name}`]?.length > 0 && form.touched[`${name}`] && <p className="cm-form-error">{form.errors[`${name}`]}</p>}
                </>
            );
        case "dropdown":
            return (
                <>
                    <div className="form-lable-name">
                        {t(`${labelName}`)}
                    </div>
                    <FormControl sx={{ width: "100%" }}>
                        <Select
                            name={name}
                            value={form.values[`${name}`]}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}>
                            <MenuItem value="">Choose Option</MenuItem>
                            {Object.keys(dropDown).length > 0 && dropDown.data.length > 0 && (
                                dropDown.data.map((val: any) => (
                                    <MenuItem key={`${name}-key-${val.id}`} value={val[`${dropDown.value}`]}>{val[`${dropDown.label}`].length > 0 ? val[`${dropDown.label}`] : "_"}</MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                    {form.errors[`${name}`]?.length > 0 && form.touched[`${name}`] && <p className="cm-form-error">{form.errors[`${name}`]}</p>}
                </>
            );
        default:
            return null
    }
}
export default FormikLayout;