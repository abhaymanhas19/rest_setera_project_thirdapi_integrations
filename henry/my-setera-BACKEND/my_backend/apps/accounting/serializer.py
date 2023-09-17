import requests

from apps.organization.models import Organization
from rest_framework import serializers
from django.contrib.auth.models import Group, Permission
from rest_framework.permissions import BasePermission


def seteraSOS(org):
    obj = Organization.objects.filter(id=org).first()
    odoo_org_identifier = obj.odoo_org_identifier
    sales_sos_url = f"https://setera-api.setera.com/odooApi/sos/{odoo_org_identifier}"
    sales_sso_response = requests.get(sales_sos_url)
    sales_sos = sales_sso_response.json()
    return sales_sos


def seterasosdetails(sales_order_id):
    sales_order_details_url = (
        f"https://setera-api.setera.com/odooApi/sosdetails/{sales_order_id}"
    )
    sales_order_details_response = requests.get(sales_order_details_url)
    sales_order_details = sales_order_details_response.json()
    return sales_order_details


def seteraSubscription(org):
    obj = Organization.objects.filter(id=org).first()
    odoo_org_identifier = obj.odoo_org_identifier
    sub_sos_url = f"https://setera-api.setera.com/odooApi/subs/{odoo_org_identifier}"
    print("SETERA_ACCOUNTING_SUBSCRIPTION_URL: ", sub_sos_url)
    sub_sos_response = requests.get(sub_sos_url)
    sub_sos = sub_sos_response.json()
    return sub_sos


def seteraSubscriptionDetail(sub_id):
    sub_sos_detail_url = f"https://setera-api.setera.com/odooApi/subdetails/{sub_id}"
    print("SETERA_ACCOUNTING_SUBSCRIPTION_DETAIL_URL: ", sub_sos_detail_url)
    sub_sos_detail_response = requests.get(sub_sos_detail_url)
    print("SETERA_ACCOUNTING_SUBSCRIPTION_DETAIL_RESPONSE: ", sub_sos_detail_response.status_code)
    sub_sos = sub_sos_detail_response.json()
    return sub_sos





calldetail_dummydata = [
{
"Lastname": "+358104110051",
"Firstname": "",
"Phonenumber": "358104110051",
"Profile": "VoIP",
"Date": "2022-11-01",
"Time": "11:15:50",
"Bnum": "358456396***",
"Calltype": "Mobile Calls",
"Subtype": "Internal call",
"InvoiceId": 3346,
"Duration": 20,
"Price": 0.0167
},


{
"Lastname": "+358104110051",
"Firstname": "",
"Phonenumber": "358104110051",
"Profile": "VoIP",
"Date": "2022-11-01",
"Time": "11:15:50",
"Bnum": "358456396***",
"Calltype": "Mobile Calls",
"Subtype": "Internal call",
"InvoiceId": 3346,
"Duration": 20,
"Price": 0.0167
},
]

def descriptionaccounting (org_id, startdate, enddate, report_option, mask=None, phonenumber=None, invoice_id=None):
    pass

# dummy_data = {
#   "id": 8363,
#   "name": "SOFI1111",
#   "origin": "SUBFI010",
#   "client_order_ref": "true",
#   "reference": "true",
#   "date_order": "2023-05-16 05:52:43",
#   "validity_date": "true",
#   "require_signature": "true",
#   "require_payment": "true",
#   "create_date": "2023-05-16 05:52:43",
#   "confirmation_date": "2023-05-16 06:31:11",
#   "user_id": [
#     18,
#     "Frank Mullock"
#   ],
#   "partner_id": [
#     833,
#     "Setera Communications Oy"
#   ],
#   "partner_invoice_id": [
#     833,
#     "Setera Communications Oy"
#   ],
#   "partner_shipping_id": [
#     833,
#     "Setera Communications Oy"
#   ],
#   "pricelist_id": [
#     80,
#     "Setera (EUR)"
#   ],
#   "analytic_account_id": [
#     5300,
#     "Setera Communications Oy - Fin"
#   ],
#   "order_line": [
#     102000,
#     102001,
#     102002
#   ],
#   "invoice_status": "invoiced",
#   "note": "",
#   "amount_untaxed": 8421.51,
#   "amount_tax": 24,
#   "amount_total": 8421.51,
#   "currency_rate": 1,
#   "payment_term_id": [
#     2,
#     "14 Days"
#   ],
#   "fiscal_position_id": [
#     90,
#     "Intra"
#   ],
#   "team_id": [
#     10,
#     "Setera Email group"
#   ],
#   "signature": 0,
#   "signed_by": 0,
#   "commitment_date": "2023-05-16 05:52:43",
#   "transaction_ids": [
#     "string"
#   ],
#   "invoice_policy": 0,
#   "invoice_status_full": "invoiced",
#   "sale_order_template_id": [
#     200,
#     "Setera Default"
#   ],
#   "sale_order_option_ids": [
#     "string"
#   ],
#   "incoterm": "true",
#   "picking_policy": "direct",
#   "warehouse_id": [
#     1,
#     "WH"
#   ],
#   "picking_ids": [
#     "string"
#   ],
#   "procurement_group_id": 0,
#   "effective_date": "2023-05-16 05:52:43",
#   "carrier_id": 0,
#   "delivery_price": [
#     "string"
#   ],
#   "delivery_message": 0,
#   "delivery_rating_success": "true",
#   "invoice_shipping_on_delivery": "true",
#   "auto_generated": "true",
#   "auto_purchase_order_id": 0,
#   "tag_ids": [
#     "string"
#   ],
#   "opportunity_id": 0,
#   "expense_ids": [
#     "string"
#   ],
#   "margin": 8421.51,
#   "include_signatures": "true",
#   "seller_signature_note": 0,
#   "buyer_signature_note": 0,
#   "website_description": "<p><br></p>",
#   "subscription_management": "upsell",
#   "partner_end_customer_id": [
#     833,
#     "Setera Communications Oy"
#   ],
#   "ups_carrier_account": "true",
#   "ups_carrier_type": "true",
#   "related_documents": [
#     "string"
#   ],
#   "template_project_id": 0,
#   "forced_task_ids": [
#     "string"
#   ],
#   "comissionrule_id": 0,
#   "onetime_comission_total": [
#     "string"
#   ],
#   "recurring_comission_total": [
#     "string"
#   ],
#   "company_id": [
#     1,
#     "Setera Communications Oy"
#   ],
#   "is_display_lines_without_quantity": "true",
#   "industry_id": "true",
#   "product_revenues_ids": [
#     67000,
#     67001
#   ],
#   "original_contract_duration": 0,
#   "contract_duration_id": 0,
#   "number_range_ids": [
#     5000,
#     5001,
#     5002,
#     5003,
#     5004
#   ],
#   "porting_loa_attachment_id": 0,
#   "porting_invoice_attachment_id": 0,
#   "requested_porting_time": "2023-05-16 05:52:43",
#   "porting_identifier": 0,
#   "new_number_request_ids": [
#     "string"
#   ],
#   "is_numbers_confirmed": "true",
#   "reserved_block_ids": [
#     "string"
#   ],
#   "migration_rfp35_filename": "string",
#   "migration_rfp35_file": "string",
#   "migration_rfp44_45_filename": "string",
#   "migration_rfp44_45_file": "string",
#   "migration_desk_filename": "string",
#   "migration_desk_file": "string",
#   "migration_6867_6869_filename": "string",
#   "migration_6867_6869_file": "string",
#   "seller_company_id": [
#     1,
#     "Setera Communications Oy"
#   ],
#   "state": "sale",
#   "campaing_id": 0,
#   "source_id": 0,
#   "medium_id": 0,
#   "activity_ids": [
#     "string"
#   ],
#   "message_follower_ids": [
#     74000,
#     740001
#   ],
#   "message_ids": [
#     3611000,
#     3611001,
#     3611002
#   ],
#   "message_main_attachment_id": 0,
#   "website_message_ids": [
#     "string"
#   ],
#   "access_token": "string",
#   "create_uid": [
#     1,
#     "Frank Mullock"
#   ],
#   "wirte_uid": [
#     1,
#     "Frank Mullock"
#   ],
#   "write_date": "2023-05-16 05:52:43",
#   "is_expired": "true",
#   "remaining_validity_days": 0,
#   "currency_id": [
#     1,
#     "EUR"
#   ],
#   "invoice_count": 0,
#   "invoice_ids": [
#     600000,
#     600001
#   ],
#   "amount_by_group": [
#     [
#       "Taxes",
#       0,
#       8421.5132,
#       "0,00 €",
#       "8421.51 €",
#       1
#     ]
#   ],
#   "expected_date": "2023-05-16 05:52:43",
#   "amount_undiscounted": 1041.51,
#   "type_name": "Sales Order",
#   "authorized_transaction_ids": [
#     "string"
#   ],
#   "purchase_order_count": 0,
#   "delivery_count": 0,
#   "available_carrier_ids": [
#     1,
#     2,
#     6,
#     9
#   ],
#   "expense_count": 0,
#   "subscription_count": 0,
#   "timesheet_ids": [
#     "string"
#   ],
#   "tasks_ids": [
#     "string"
#   ],
#   "tasks_count": 0,
#   "project_ids": [
#     5000,
#     5001
#   ],
#   "ups_bill_my_account": "true",
#   "onecloud_org_id": 0,
#   "is_requires_number_porting": "true",
#   "porting_product_qty_total": 0,
#   "number_range_qty_total": 0,
#   "is_porting_satisfied": "true",
#   "is_requires_new_numbers": "true",
#   "is_new_numbers_satisfied": "true",
#   "new_numbers_product_qty_total": 0,
#   "new_numbers_qty_total": 0,
#   "is_requires_number_confirmation": "true",
#   "is_requires_equipment_migration": "true",
#   "is_requires_attachment_rfp35": "true",
#   "is_requires_attachment_rfp44_45": "true",
#   "is_requires_attachment_desk": "true",
#   "is_requires_attachment_6867_6869": "true",
#   "is_migrating_satisfied": "true",
#   "equipment_migration_instructions": "true",
#   "number_product_ids": [
#     1900,
#     1901
#   ],
#   "activity_state": "true",
#   "activity_user_id": 0,
#   "activity_type_id": 0,
#   "activity_date_deadline": "2023-05-16 05:52:43",
#   "activity_summary": "string",
#   "message_id_follower": 0,
#   "message_partner_ids": [
#     2,
#     833
#   ],
#   "message_channel_ids": [
#     "string"
#   ],
#   "message_unread": "true",
#   "message_unread_counter": 0,
#   "message_needaction": "true",
#   "message_needaction_counter": 0,
#   "message_has_error": "true",
#   "message_has_error_counter": 0,
#   "message_attachment_count": 0,
#   "access_url": "/my/orders/8363",
#   "access_warning": "string",
#   "display_name": "SOFI1111",
#   "__last_update": "2023-05-16 05:52:43"
# }
