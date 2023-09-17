import React, { useEffect, useState } from "react";
import { Box, Autocomplete, TextField, FormLabel } from "@mui/material";
import AxiosMain from "./AxiosMain";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
function PaginationDropDown(props: any) {
    const { className, apiLink,     optionLableName, saveValue, formFiled, apiDataMap, dependOn, apiParamValue, apiParamName, defaultSort } = props;
    const { labelName, valueName } = apiDataMap
    const [selectPage, setSelectPage] = useState(1);
    const [arrayOptions, setArrayOptions] = useState<any[]>([]);
    const checkUser = useSelector((state: RootState) => state.authState.authState);
    const [isAPiOn, setAPIOn] = useState(false);
    const [isAllPost, setAllPost] = useState(false);
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${checkUser.access}`,
        },
    }
    const getUniqueArray = (arr: any, index: any) => {

        const unique = arr
            .map((e: any) => e[index])

            // store the keys of the unique objects
            .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter((e: any) => arr[e]).map((e: any) => arr[e]);

        return unique;
    }
    const getDataAPi = (page: number) => {
        setAPIOn(true);
        let apiURL = "";
        if (defaultSort !== 'no') {
            apiURL = `${apiLink}?ordering=${defaultSort}&page=${page}`;
        } else {
            apiURL = `${apiLink}?page=${page}`;
        }
        if (dependOn !== '') {
            if (defaultSort !== 'no') {
                apiURL = `${apiLink}?ordering=${defaultSort}&page=${page}&${apiParamName}=${apiParamValue}`;
            } else {
                apiURL = `${apiLink}?page=${page}&${apiParamName}=${apiParamValue}`;
            }
        }
        AxiosMain.get(apiURL, config).then((res) => {
            if (page === 1) {
                if (res.data.results.length > 0) {
                    setArrayOptions(res.data.results);
                }
                setSelectPage(page);
            } else {
                let orgData;
                if (dependOn !== '' && page === 1) {
                    orgData = [...res.data.results];
                } else {
                    orgData = [...res.data.results, ...arrayOptions];
                }
                const sortingArray = getUniqueArray(orgData, "id");
                const sortingData = [...sortingArray].sort((a: any, b: any) =>
                    a[`${labelName}`].toLowerCase() > b[`${labelName}`].toLowerCase() ? 1 : -1,
                );

                if (arrayOptions.length !== res.data.count) {
                    setArrayOptions(sortingData);
                }
                if (res.data.results.length === 10) {
                    setSelectPage(page);
                }
                console.log(sortingData);
            }
            if (arrayOptions.length === res.data.count) {
                setAllPost(true);
            } else {
                setAllPost(false);
            }
            setAPIOn(false);
        }).catch((e) => {
            console.log("Error in DropDown API", e)
            const { response } = e;
            console.log(response.data);
            setAPIOn(false);
        })
    }
    const loadMorecontent = () => {
        const nextPage = selectPage + 1;
        if (dependOn !== '') {
            if (!isAPiOn && !isAllPost) {
                getDataAPi(nextPage);
            }
        } else {
            if (!isAPiOn && !isAllPost) {
                getDataAPi(nextPage);
            }
        }

    }
    const handleScroll = (event: any) => {
        const listboxNode = event.currentTarget;

        const position = listboxNode.scrollTop + listboxNode.clientHeight;
        if (listboxNode.scrollHeight - position <= 1) {
            loadMorecontent();
        }
    }
    useEffect(() => {
        if (selectPage === 1) {
            if (!isAPiOn && !isAllPost && dependOn === '') {
                getDataAPi(selectPage);
            }
        }
    }, [])
    useEffect(() => {
        if (!isAPiOn && dependOn !== '' && apiParamValue !== '') {
            setSelectPage(1);
            saveValue.setFieldValue(formFiled, "");
            setArrayOptions([]);
            getDataAPi(1);
        }
    }, [dependOn, apiParamValue])
    return (

        <>
            <div className={className}>
                <div className="form-lable-name">{optionLableName}</div>
                <Autocomplete
                    className="cm-global-list-name"
                    onChange={(event, newValue) => newValue !== null ? saveValue.setFieldValue(formFiled, newValue[`${valueName}`]) : saveValue.setFieldValue(formFiled, "")}
                    sx={{ width: 300 }}
                    options={arrayOptions.length > 0 ? arrayOptions : []}
                    autoHighlight
                    freeSolo
                    getOptionLabel={(option: any) => option[`${labelName}`]}
                    renderOption={(props, option: any) => {
                        if (option[`${labelName}`] !== '') {
                            return (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={`${formFiled}_key_${option.id}_${option[`${labelName}`]}`}>
                                    <span className="cm-org-list-name">{option[`${labelName}`]}</span>
                                </Box>
                            )
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            className="cm-org-list-name"
                            {...params}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                    ListboxProps={{
                        onScroll: handleScroll
                    }}
                />
            </div>
        </>
    )
}
PaginationDropDown.defaultProps = {
    dependOn: "",
    apiParamValue: "",
    defaultSort: "name"
}
export default PaginationDropDown