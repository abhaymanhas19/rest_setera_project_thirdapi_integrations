import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Box from '@mui/material/Box';
import { useTranslation } from "react-i18next";



const DataTableComponent = (props: any) => {
    const { isWithBG, tRow, tData, className, isRounded } = props;
    const [isPaginate, setisPaginate] = useState(false);
  const { t } = useTranslation();
    const rowPerPage = t('RowsPerPage');
    useEffect(() => {
        if (tData.length > 10) {
            setisPaginate(true);
        }
    }, [props, tData]);
    if (isWithBG) {
        return (
          <Box className="cm-table-with-bg">
            <Box
              className={`no-b cm-table-main-wrapper ${
                isRounded ? "cm-table-rounded" : " "
              }`}
            >
              {tRow.length > 0 && tData.length >= 0 && (
                <DataTable
                  className={
                    className
                      ? `cm-table-component ${className}`
                      : "cm-table-component"
                  }
                  pagination={isPaginate}
                  paginationComponentOptions={{ rowsPerPageText: rowPerPage }}
                  paginationRowsPerPageOptions={[7, 15, 20, 25, 30, 50, 100]}
                  columns={tRow}
                  
                  data={tData}
                />
              )}
            </Box>
          </Box>
        );
    } else {
        return (
            <Box className={`no-b cm-table-main-wrapper ${isRounded ? "cm-table-rounded" : " "}`}>
                {
              tRow.length > 0 && tData.length >= 0 && (
                        <DataTable
                            className={className ? `cm-table-component ${className}` : "cm-table-component"}
                            pagination={isPaginate}
                            paginationComponentOptions={{ rowsPerPageText: rowPerPage }}
                            paginationRowsPerPageOptions={[7, 15, 20, 25, 30, 50, 100]}
                            columns={tRow}
                            data={tData}
                        />
                    )
                }
            </Box>
        );
    }

}

DataTableComponent.defaultProps = {
    tData: [],
    tRow: [],
}
export default DataTableComponent;