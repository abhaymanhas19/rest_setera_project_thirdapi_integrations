import React, { useState, useEffect } from "react";
import AxiosMain from "./AxiosMain";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import DataTableComponent from "./DataTableComponet";
import { Pagination, CircularProgress, Stack, Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add";
import colorConfigs from "../../configs/colorConfigs";
import { useNavigate } from "react-router-dom";

function PaginationTableData(props: any) {
    const { apiLink, tRow, searchfield, btnComponent, dependOn, apiParamName, apiParamValue } = props;
    const { isBtnShow, btnLink, btnLable } = btnComponent;
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [tableDataArray, setTableDataArray] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const checkUser = useSelector((state: RootState) => state.authState.authState);
    const orgnisationData = useSelector((state: RootState) => state.appState.appOrg);
    const getDataAPI = (data: any, text: any) => {
        setLoading(true);
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${checkUser.access}`,
            },
        }
        let apiURL = "";

        if (text !== '') {
            apiURL = `${apiLink}?page=${data}&search=${text}`;
        } else {
            if (dependOn !== '') {
                apiURL = `${apiLink}?page=${data}&${apiParamName}=${apiParamValue}`
            }
            else {
                apiURL = `${apiLink}?page=${data}`
            }
        }
        AxiosMain.get(`${apiURL}`, config).then((res) => {
            setLoading(false);
            if (res.status === 200 && res.data.count > 0) {
                const totalPage = res.data.count;
                setTotalPages(Math.ceil(totalPage / 10));
                setTableDataArray(res.data.results);
                setCurrentPage(data);
            } else {
                setTableDataArray([]);
            }

        }).catch((e) => {
            console.log("While geting Error", e);
            setLoading(false);
        })
    }
    useEffect(() => {
        if (tableDataArray.length === 0) {
            getDataAPI(currentPage, searchText);
        }
    }, []);
    useEffect(() => {
        if (tableDataArray.length > 0) {
            getDataAPI(currentPage, searchText);
        }
    }, [orgnisationData])
    const paginationChange = (event: any, value: number) => {
        if (totalPages >= value) {
            getDataAPI(value, "");
        }
    }
    return (
        <>
            <div className={`cm-paginate-data-table ${isLoading && "active-loader"}`}>
                {isLoading && (
                    <div className="cm-loader-wrap">
                        <CircularProgress size={50} sx={{
                            color: "#103256"
                        }} />
                    </div>
                )}
                <div style={{
                    textAlign: "right",
                    marginTop: "20px",
                    marginBottom: "20px"
                }}>
                    {
                        isBtnShow && (
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                justifyContent={"end"}>
                                {
                                    searchfield && (
                                        <TextField
                                            name="mobile-user-search"
                                            variant="outlined"
                                            placeholder="Search"
                                            value={searchText}
                                            onChange={(e) => { setSearchText(e.target.value) }}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    getDataAPI(1, searchText);
                                                }
                                            }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon onClick={() => getDataAPI(1, searchText)} className="cmmourse" />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{
                                                background: "#fff"
                                            }}
                                        />
                                    )
                                }
                                <Button
                                    variant="contained"
                                    endIcon={<AddIcon />}
                                    className="cm-btn-style"
                                    onClick={() => navigate(btnLink)}
                                    sx={{
                                        color: colorConfigs.btnStyle.color,
                                        background: colorConfigs.btnColor.bgColorGreen,
                                        "&: hover": {
                                            color: colorConfigs.btnColor.colorGreen,
                                            background: colorConfigs.btnColor.hoverbgWhite,
                                        },
                                    }}>
                                    {btnLable}
                                </Button>
                            </Stack>
                        )
                    }

                </div>
                <DataTableComponent
                    isWithBG={true}
                    isRounded={false}
                    tRow={tRow}
                    tData={tableDataArray}
                />
                <div style={{
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "center"
                }}>
                    {totalPages > 1 && (
                        <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={paginationChange}
                        />
                    )}

                </div>
            </div>
        </>
    )
}
PaginationTableData.defaultProps = {
    dependOn: "",
    apiParamValue: "",
    defaultSort: "name"
}
export default PaginationTableData