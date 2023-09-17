import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import PaginationTableData from '../../../components/layout/PaginationTableData';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Subscription = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const SubscriptionRow = [
    {
      name: t('SubscriptionID'),
      cell: (row: any) => (<><Box sx={{ cursor: "pointer" }} onClick={() => navigate(`/accounting/subscription/edit/${row.id}`)}>{row.id}</Box></>)
    },
    {
      name: t('Customer'),
      cell: (row: any) => row.partner_end_customer_id.length > 0 ? row.partner_end_customer_id[1] : ""
    },
    {
      name: t('SubscriptionTemplate'),
      cell: (row: any) => row.template_id.length > 0 ? row.template_id[1] : ""
    },
    {
      name: t('AggregateInvoiceGroup'),
      cell: (row: any) => row.aggregate_invoice_group_id.length > 0 ? row.aggregate_invoice_group_id[1] : ""
    },
    {
      name: t('SalesPerson'),
      cell: (row: any) => row.sale_order_count
    },
    {
      name: t('Company'),
      cell: (row: any) => row.company_id.length > 0 ? row.company_id[1] : ""
    },
    {
      name: t('StartDate'),
      cell: (row: any) => row.date_start
    },
    // {
    //   name: t('Validity'),
    //   cell: (row: any) => row.validity
    // },
  ];

  return (
    <div className="cm-subscription-main-single">
      <div className='cm-subscription-Data-table'>
        <PaginationTableData
          apiLink="/accounting/subscription/"
          tRow={SubscriptionRow}
          searchfield={false}
          btnComponent={{
            isBtnShow: false,
          }}
        />
      </div>
    </div>
  );
};

export default Subscription;