import React, { useState, useEffect } from "react";
import appRoutes from "../../routes/appRoutes";
import DataTableComponent from "../../components/layout/DataTableComponet";
import { useTranslation } from "react-i18next";
import {
    Box,
    Grid,
    Card,
    CardHeader,
    CardContent, MenuItem, Select, Button, FormControl, FormControlLabel, Checkbox
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AxiosMain from "../../components/layout/AxiosMain";
import FormikLayout from "../../components/layout/FormikLayout";
import { useFormik } from "formik";
import PaginationTableData from "../../components/layout/PaginationTableData";
import { use } from "i18next";
import Swal from "sweetalert2";
import colorConfigs from "../../configs/colorConfigs";
function UsersRolesList() {
    const { t } = useTranslation()
    const [allRoutesList, setAllRoutes] = useState([]);
    const [userRoleList, setUserRoleList] = useState([]);
    const [existingPerm, setExistingPerm] = useState([]);
    const [userRoleSelect, setUserRoleSelect] = useState<any>({});
    const checkUser = useSelector((state: RootState) => state.authState.authState);
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${checkUser.access}`,
        },
    }
    const formSwalTranslation = {
        formSwalTitle: t("AreYouWanttoSave"),
        formSwalText: t("Youwontbeabletorevertthis"),
        fomrSwalCancel: t("Cancel"),
        formSwalSaved: t("YesSavedit"),
        formSwalDataSaved: t("YourDatahasbeensaved"),
        formSwalSubmited: t("Submited"),
        formSwalWrong: t("SomethingWentWrong"),
    };
    const addinExisting = (row: any) => {
        if (existingPerm.length > 0) {
            let newAddexist: any = [...existingPerm, row];
            setExistingPerm(newAddexist);
        } else {
            let newAdd: any = [row];
            setExistingPerm(newAdd);
        }
    }
    const removeinExisting = (row: any) => {
        const newPermision = existingPerm.filter((item: any) => item.id !== row.id);
        setExistingPerm(newPermision);
    }
    const sendPermission = () => {
        const permisionIDs: any = [];
        existingPerm.map((item: any) => permisionIDs.push(item.id));
        const valData = {
            "name": userRoleSelect.name,
            "permissions": permisionIDs
        }
        AxiosMain.patch(`/user-permission/${userRoleSelect.id}/`, valData, config).then((res) => {
            if (res.status === 200) {
                Swal.fire({
                    title: formSwalTranslation.formSwalSubmited,
                    text: formSwalTranslation.formSwalDataSaved,
                    icon: "success"
                });
            }
        }).catch((e) => {
            console.log("error", e);
            Swal.fire({
                title: "Error",
                text: formSwalTranslation.formSwalWrong,
                icon: "error"
            });
        })
    }
    const userPermisionRow = [
        {
            name: t("User Role Name"),
            cell: (row: any) => (
                <Box className="cm-table-td">
                    <Box>{row.name}</Box>
                </Box>
            ),
        },
        {
            name: t("Action"),
            cell: (row: any) => {
                let found = false;
                existingPerm.map((item: any) => {
                    if (item.id === row.id) {
                        found = true;
                    }
                });
                if (found) {
                    return (
                        <Box className="cm-table-td">
                            <Button
                                disabled={userRoleForm.values.userrole === '' ? true : false}
                                variant="contained"
                                className="cm-btn-sm-style"
                                sx={{
                                    color: colorConfigs.btnColor.hoverbgWhite,
                                    background: colorConfigs.btnColor.bgColorRed,
                                    "&: hover": {
                                        color: colorConfigs.btnColor.bgColorRed,
                                        background: colorConfigs.btnColor.hoverbgWhite,
                                    },
                                }} onClick={() => removeinExisting(row)}>Remove</Button>
                        </Box>
                    )
                } else {
                    return (
                        <Box className="cm-table-td">
                            <Button
                                disabled={userRoleForm.values.userrole === '' ? true : false}
                                variant="contained"
                                className="cm-btn-sm-style"
                                onClick={() => addinExisting(row)}
                                sx={{
                                    color: colorConfigs.btnColor.hoverbgWhite,
                                    background: colorConfigs.btnColor.bgColorGreen,
                                    "&: hover": {
                                        color: colorConfigs.btnColor.bgColorGreen,
                                        background: colorConfigs.btnColor.hoverbgWhite,
                                    },
                                }}
                            >Add</Button>
                        </Box>
                    )
                }

            },
        }
    ];
    const userRoleForm = useFormik({
        initialValues: {
            userrole: "",
        },
        onSubmit: (values) => console.log(values)
    })
    const getUserRoled = () => {
        AxiosMain.get('/user-group/', config).then((res) => {
            if (res.status === 200) {
                setUserRoleList(res.data.results);
            }
        }).catch((e) => {
            console.log(e.response);
            Swal.fire({
                title: "Error",
                text: "While getting users Group Permissions",
                icon: "error"
            });
        })
    }
    const getDataByRole = () => {
        //console.log(userRoleSelect);
        AxiosMain.get(`/user-permission/${userRoleSelect.id}/`, config).then((res) => {
            console.log(res);
            if (res.status === 200) {
                if (res.data.permissions.length > 0) {
                    setExistingPerm(res.data.permissions);
                } else {
                    setExistingPerm([]);
                }
            }
        }).catch((e) => {
            console.log(e.response);
            Swal.fire({
                title: "Error",
                text: "While getting single group user Permissions",
                icon: "error"
            });
        })
    }
    const useRoleHEad = [
        {
            name: t("Pages"),
            cell: (row: any) => {
                const displayText: any = row.sidebarProps?.displayText.replace(/ /g, '');
                const tempText = t(`sidebar_${displayText}`);
                return (<Box>{tempText}</Box>)
            },
        },
        {
            name: t("Pages"),
            cell: (row: any) => <Box>{row.state}</Box>,
        },
    ]
    useEffect(() => {
        let arraydt: any = [];
        getUserRoled();
        // appRoutes.map((val) => {
        //     if (val.state !== 'home') {
        //         if (val.child !== undefined && val.child.length > 0) {
        //             arraydt.push(...val.child);
        //         }
        //         else {
        //             if (val.sidebarProps !== undefined) {
        //                 arraydt.push(val);
        //             }

        //         }
        //     }
        // })
        // setAllRoutes(arraydt);
        // console.log(arraydt);
    }, []);

    useEffect(() => {
        if (userRoleForm.values.userrole !== '' && Object.keys(userRoleSelect).length > 0) {
            getDataByRole();
        }
    }, [userRoleForm.values.userrole, userRoleSelect]);
    useEffect(() => {
        if (userRoleForm.values.userrole !== '') {
            userRoleList.map((vals: any) => {
                if (vals.name === userRoleForm.values.userrole) {
                    setUserRoleSelect(vals);
                }
            })
        }
    }, [userRoleForm]);
    return (
        <div className="cm-mobile-user-Data-main" style={{ marginTop: "20px", marginBottom: "20px" }}>
            <div className="cm-mobile-user-Data-table">
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <form onSubmit={userRoleForm.handleSubmit}>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        {/* <InputLabel id="demo-simple-select-standard-label">Select User Role</InputLabel> */}
                        <Select
                            placeholder="Select User Role"
                            name="userrole"
                            value={userRoleForm.values.userrole}
                            onChange={userRoleForm.handleChange}
                            displayEmpty
                        >
                            <MenuItem value="" selected>Select User Role</MenuItem>
                            {
                                userRoleList.length > 0 && userRoleList.map((roleVal: any, ind) => (
                                    <MenuItem value={roleVal.name} key={`user-Role-Select-${ind}`}>{roleVal.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl >
                </form>
                    <Button
                        variant="contained"
                        className="cm-btn-style"
                        onClick={() => sendPermission()}
                        sx={{
                            color: colorConfigs.btnColor.hoverbgWhite,
                            background: colorConfigs.btnColor.bgColorGreen,
                            "&: hover": {
                                color: colorConfigs.btnColor.bgColorGreen,
                                background: colorConfigs.btnColor.hoverbgWhite,
                            },
                        }}
                    >Saved</Button>
                </div>

                <Box sx={{
                    marginTop: '20px',
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                }} className="cm-user-role-wrap">

                    {/* <ul>
                        {
                            existingPerm.map((item: any, index) => (
                                <li key={`userrole-${index}`}>{item.name}</li>
                            ))
                        }
                    </ul> */}
                    <PaginationTableData
                        apiLink="/user-permission-list/"
                        tRow={userPermisionRow}
                        searchfield={true}
                        searchfieldName={'name'}
                        dependOn="apiParamValue"
                        apiParamName="ordering"
                        apiParamValue={"name"}
                        btnComponent={{
                            isBtnShow: false,
                        }}
                    />
                </Box>
                <Card sx={{ padding: "10px", marginTop: "30px" }}>
                    <CardHeader title={userRoleForm.values.userrole} />
                    <CardContent>

                        {/* <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User Role Name</TableCell>
                                        <TableCell>List</TableCell>
                                        <TableCell>Create</TableCell>
                                        <TableCell>Edit</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allRoutesList.map((row: any) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.state}
                                            </TableCell>
                                            <TableCell>
                                                <FormControlLabel control={<Checkbox />} label="" />
                                            </TableCell>
                                            <TableCell>
                                                <FormControlLabel control={<Checkbox />} label="" />
                                            </TableCell>
                                            <TableCell>
                                                <FormControlLabel control={<Checkbox />} label="" />
                                            </TableCell>
                                            <TableCell>
                                                <FormControlLabel control={<Checkbox />} label="" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> */}
                    </CardContent>
                </Card>


            </div>
        </div>
    );
}
export default UsersRolesList;