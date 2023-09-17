import React, { useState, useEffect } from "react";
import { Box, Autocomplete, TextField, FormLabel, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, List, ListItem, ClickAwayListener, Button, Stack } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useTranslation } from "react-i18next";
import AxiosMain from "./AxiosMain";
import { setOrgCount, setorganizationState, setSearchOrg, setSearchOrgCount } from "../../redux/features/organizationStateSlice";
import Swal from "sweetalert2";
import { setAppOrg } from "../../redux/features/appStateSlice";

const getUniqueArray = (arr: any, index: any) => {
    const unique = arr
        .map((e: any) => e[index])
        // store the keys of the unique objects
        .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)
        // eliminate the dead keys & store unique objects
        .filter((e: any) => arr[e]).map((e: any) => arr[e]);
    return unique;
}

function OrganisationDropDown() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isAllOrg, setAllOrg] = useState(false);
    const [isAllSearchOrg, setAllSearchOrg] = useState(false);
    const [isadminShowOrg, setIsAdminShowOrg] = useState(false);
    const [isSearchOn, setSearchOn] = useState(false);
    const [isDropDownActive, setDropDownActive] = useState(false);
    const [organizationPage, setOrganizationPage] = useState(1);
    const [organizationSearch, setOrganizationSearch] = useState(1);
    const [lastAutocompleteVal, setLastAutoCompleteVal] = useState("");
    const [inputVal, setInputVal] = useState("");
    const checkUser = useSelector((state: RootState) => state.authState.authState);
    const orgnisationData = useSelector((state: RootState) => state.appState.appOrg);
    const allOrgData = useSelector((state: RootState) => state.organisation.organizationState);
    const totalOrg = useSelector((state: RootState) => state.organisation.orgCount);
    const searchOrgData = useSelector((state: RootState) => state.organisation.orgSearchState);
    const searchTotalOrg = useSelector((state: RootState) => state.organisation.orgSearchCount);
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${checkUser.access}`,
        },
    }
    const formSwalTranslation = {
        formSwalTitle: t("SomethingWentWrong"),
        formSwalText: t("CheckYourLoginsDetailsInternet"),
        formSwalErrorText: t("Unabletogetorganization")
    };
    const getSearchOrganisation = (page: number) => {
        if (inputVal !== '') {
            AxiosMain.get(`/organization/organization/?ordering=name&search=${inputVal}&page=${page}`, config).then((val) => {
                if (val.data.results.length > 0) {
                    dispatch(setSearchOrgCount(val.data.count));
                    if (page === 1) {
                        const orgData = val.data.results;
                        const sortingOrganization = [...orgData].sort((a: any, b: any) =>
                            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
                        );
                        dispatch(setSearchOrg(sortingOrganization));
                    } else {
                        const orgData = [...val.data.results, ...searchOrgData];
                        const sortingArray = getUniqueArray(orgData, "id");
                        const sortingOrganization = [...sortingArray].sort((a: any, b: any) =>
                            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
                        );
                        if (val.data.results.length === 10) {
                            setOrganizationSearch(page);
                        }
                        if (searchOrgData.length !== val.data.count) {
                            dispatch(setSearchOrg(sortingOrganization));

                        }
                    }
                    if (searchOrgData.length === val.data.count) {
                        setAllSearchOrg(true);
                    }
                }
            }).catch((e) => {
                Swal.fire({
                    title: formSwalTranslation.formSwalTitle,
                    text: formSwalTranslation.formSwalErrorText,
                    icon: 'warning',
                })
            });
        }

    }
    const getOrganisation = async (page: number) => {
        AxiosMain.get(`/organization/organization/?ordering=name&page=${page}`, config).then((val) => {
            if (val.data.results.length > 0) {
                dispatch(setOrgCount(val.data.count));
                if (page === 1) {
                    const orgData = val.data.results;
                    const sortingOrganization = [...orgData].sort((a: any, b: any) =>
                        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
                    );
                    dispatch(setorganizationState(sortingOrganization));
                } else {
                    const orgData = [...val.data.results, ...allOrgData];
                    const sortingArray = getUniqueArray(orgData, "id");
                    const sortingOrganization = [...sortingArray].sort((a: any, b: any) =>
                        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
                    );
                    if (val.data.results.length === 10) {
                        setOrganizationPage(page);
                    }
                    if (allOrgData.length !== val.data.count) {
                        dispatch(setorganizationState(sortingOrganization));
                    }
                }
                if (allOrgData.length === val.data.count) {
                    setAllOrg(true);
                }
            }
        }).catch((e) => {
            Swal.fire({
                title: formSwalTranslation.formSwalTitle,
                text: formSwalTranslation.formSwalErrorText,
                icon: 'warning',
            })
        });
    }

    //Setting Organisation in Store
    const setOrganisation = (value: any) => {
        if (value !== null) {
            dispatch(setAppOrg(value));
        } else {
            dispatch(setAppOrg(""));
        }
    }
    const setOrganisationDrop = (value: any) => {
        if (value !== null) {
            setOrganisation(value);
            setDropDownActive(false)
        } else {
            setOrganisation(value);
        }
    }
    const setOrganisationDropSearch = (value: any) => {
        if (value !== null) {
            dispatch(setAppOrg(value));
            setSearchOn(false);
            setInputVal("");
            setDropDownActive(false);
            setLastAutoCompleteVal("");
        }
    }
    // loadMore Organisation
    const loadMoreOrganizations = () => {
        if (!isAllOrg) {
            const nextPage = organizationPage + 1;
            getOrganisation(nextPage);
        }
    }
    const loadMoreSearchOrganizations = () => {
        if (!isAllSearchOrg) {
            const nextPage = organizationSearch + 1;
            getSearchOrganisation(nextPage);
        }
    }
    useEffect(() => {
        if (Object.keys(checkUser).length > 0) {
            if (allOrgData.length === 0 && Object.keys(checkUser).length > 0) {
                getOrganisation(organizationPage);
            }
            if (checkUser.user.user_type === 'CustomerAdmin') {
                if (allOrgData.length > 0 && Object.keys(orgnisationData).length === 0) {
                    setOrganisation(allOrgData[0]);
                }
            } else {
                if (allOrgData.length > 0 && Object.keys(orgnisationData).length > 0) {
                    setIsAdminShowOrg(true);
                }
                else if (allOrgData.length > 0 && Object.keys(orgnisationData).length === 0) {
                    setOrganisation(allOrgData[0]);
                }
            }
        }
        // eslint-disable-next-line
    }, [allOrgData, orgnisationData])

    const outerClickFun = () => {
        setDropDownActive(false);
        setLastAutoCompleteVal("");
        setSearchOn(false);
        setInputVal("");
        // if (inputVal === '') {
        //     getOrganisation(1);
        //     setSearchOn(false)
        // }
    }
    useEffect(() => {
        if (organizationPage === 1 && allOrgData.length > 10 && !isSearchOn) {
            const previousPage = Math.ceil(allOrgData.length / 10);
            setOrganizationPage(previousPage);
        }
    }, [totalOrg, allOrgData])
    return (
        <>
            <ClickAwayListener onClickAway={outerClickFun}>
                {isadminShowOrg ? (
                    <div style={{ position: "relative" }}>
                        <FormControl variant="outlined" sx={{ width: "300px" }}>
                            <OutlinedInput
                                id="outlined-adornment-Organisatioin"
                                value={isSearchOn ? inputVal : orgnisationData.name}
                                onChange={(e) => setInputVal(e.target.value)}
                                onFocus={() => setDropDownActive(true)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        getSearchOrganisation(1);
                                        setDropDownActive(true);
                                    }
                                    else if (event.key === 'Backspace') {
                                        setSearchOn(true)
                                    }
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        {isSearchOn ? (
                                            <IconButton
                                                aria-label="toggle Organisatioin visibility"
                                                onClick={() => getSearchOrganisation(1)}>
                                                <SearchIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                aria-label="toggle Organisatioin visibility"
                                                onClick={() => setSearchOn(true)}>
                                                <CloseIcon />
                                            </IconButton>
                                        )}

                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {isDropDownActive && (
                            <>
                                <div className="cm-dropdown-listing-wrap">
                                    {isSearchOn ? (
                                        <List>
                                            {searchOrgData && searchOrgData.length > 0 && searchOrgData.map((val: any, index: any) => {
                                                setTimeout(() => {
                                                    const optionEl = document.querySelector(
                                                        `[data-name="${lastAutocompleteVal}"]`
                                                    );
                                                    optionEl?.scrollIntoView({ behavior: "smooth" });
                                                }, 200);
                                                return (<ListItem sx={{ mb: 1 }} data-name={val.name} className="cmmourse cm-org-list-item" onClick={() => setOrganisationDropSearch(val)} key={`cm-org-list-${index}`}>{val.name}</ListItem>)
                                            })}
                                            {searchOrgData && searchOrgData.length < searchTotalOrg && (
                                                <ListItem className="cm-org-list-item"><Button sx={{ width: 'calc(100%)', display: "block" }} variant="outlined" size="small" onClick={() => {
                                                    loadMoreSearchOrganizations();
                                                    if (searchOrgData.length >= 20) {
                                                        setLastAutoCompleteVal(searchOrgData[searchOrgData.length - 1].name);
                                                    }
                                                }}>Load More</Button>
                                                </ListItem>)}
                                        </List>
                                    ) : (
                                        <List>
                                            {allOrgData.length > 0 && allOrgData.map((val: any, index: any) => {
                                                setTimeout(() => {
                                                    const optionEl = document.querySelector(
                                                        `[data-name="${lastAutocompleteVal}"]`
                                                    );
                                                    optionEl?.scrollIntoView({ behavior: "smooth" });
                                                }, 200);
                                                return (<ListItem sx={{ mb: 1 }} data-name={val.name} className="cmmourse cm-org-list-item" onClick={() => setOrganisationDrop(val)} key={`cm-org-list-${index}`}>{val.name}</ListItem>)
                                            })}
                                            {allOrgData.length < totalOrg && (
                                                <ListItem className="cm-org-list-item"><Button sx={{ width: 'calc(100%)', display: "block" }} variant="outlined" size="small" onClick={() => {
                                                    loadMoreOrganizations();
                                                    if (allOrgData.length >= 20) {
                                                        setLastAutoCompleteVal(allOrgData[allOrgData.length - 1].name);
                                                    }
                                                }}>Load More</Button>
                                                </ListItem>)}
                                        </List>
                                    )}

                                </div>
                            </>
                        )}
                    </div>
                ) : (<Box>{orgnisationData?.name}</Box>)}

            </ClickAwayListener>

        </>
    )
}
export default OrganisationDropDown;