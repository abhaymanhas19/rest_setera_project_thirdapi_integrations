# SETERA_MODIFYSIM_ORDER_ID_003584577509515_20230103083606

# 3. tammikuuta 2023 kello 10.36
# {
#     "submitOrderRequest": {
#         "@xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
#         "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
#         "orderId": {
#             "@xmlns": "COM_SOM_ServiceOrderRequest_MVNO",
#             "#text": "SETERA_MODIFYSIM_ORDER_ID_003584577509515_20230103083606"
#         },
#         "orderDate": {
#             "@xmlns": "COM_SOM_ServiceOrderRequest_MVNO",
#             "#text": "2023-01-03T08:36:06"
#         },
#         "orderType": {
#             "@xmlns": "COM_SOM_ServiceOrderRequest_MVNO",
#             "#text": "AMEND"
#         },
#         "systemSource": {
#             "@xmlns": "COM_SOM_ServiceOrderRequest_MVNO",
#             "#text": "SETERA"
#         },
#         "lineOfService": {
#             "@xmlns": "COM_SOM_ServiceOrderRequest_MVNO",
#             "lineOfServiceId": "SETERA_LS_ID_003584577509515_20230103083606",
#             "actionCode": "CHANGE",
#             "activationDate": "2023-01-03T10:41:13",
#             "subscriptionId": "SE0005568868",
#             "services": {
#                 "cfs": {
#                     "cfsId": "CFSS_MOBILE_SUBSCRIBER",
#                     "cfsAction": "CHANGE SIM"
#                 }
#             },
#             "Resources": {
#                 "SIM": {
#                     "ICCId": "8935806211122700006"
#                 }
#             }
#         }
#     }
# }
# 3. tammikuuta 2023 kello 10.36
# {
#     "ifx.mvno:sendSOReqAck": {
#         "@xmlns:ifx.mvno": "COM_SOM_ServiceOrderRequest_MVNO",
#         "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
#         "ifx.mvno:orderId": "SETERA_MODIFYSIM_ORDER_ID_003584577509515_20230103083606",
#         "ifx.mvno:status": "I_RECEIVED"
#     }
# }
# 3. tammikuuta 2023 kello 10.36
# {
#     "Setera.Provisioning.Dna:orderId": "SETERA_MODIFYSIM_ORDER_ID_003584577509515_20230103083606",
#     "Setera.Provisioning.Dna:orderStatus": "I_INPROGRESS"
# }
# 3. tammikuuta 2023 kello 10.36
# {
#     "Setera.Provisioning.Dna:LineOfServices": {
#         "Setera.Provisioning.Dna:LineOfService": {
#             "Setera.Provisioning.Dna:IMSI": "244122301106000",
#             "Setera.Provisioning.Dna:LineOfServiceId": "SETERA_LS_ID_003584577509515_20230103083606",
#             "Setera.Provisioning.Dna:LineOfServiceStatus": "COMPLETED",
#             "Setera.Provisioning.Dna:cfsServiceInstances": {
#                 "Setera.Provisioning.Dna:cfsService": {
#                     "Setera.Provisioning.Dna:cfsId": "CFSS_MOBILE_SUBSCRIBER",
#                     "Setera.Provisioning.Dna:serviceStatus": "COMPLETED"
#                 }
#             },
#             "Setera.Provisioning.Dna:subscriptionID": "SE0005568868"
#         }
#     },
#     "Setera.Provisioning.Dna:orderId": "SETERA_MODIFYSIM_ORDER_ID_003584577509515_20230103083606",
#     "Setera.Provisioning.Dna:orderStatus": "I_COMPLETED"
# }



















{
    "soapenv:Envelope": {
        "@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
        "soapenv:Header":  "null",
        "soapenv:Body": {
            "ServiceOrders.notifySetera:statusNotification": {
                "@xmlns:ServiceOrders.notifySetera": "https://dnaprov1.setera.fi/SOM_COM_ResponseListener/v1/",
                "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                "@xmlns:Setera.Provisioning.Dna": "http://schemas.datacontract.org/2004/07/Setera.Provisioning.Dna",
                "ServiceOrders.notifySetera:statusNotificationType": {
                    "Setera.Provisioning.Dna:LineOfServices": {
                        "Setera.Provisioning.Dna:LineOfService": {
                            "Setera.Provisioning.Dna:IMSI": "244122301106662",
                            "Setera.Provisioning.Dna:LineOfServiceId": "SETERA_LS_ID_00358453430205_20230504111420",
                            "Setera.Provisioning.Dna:LineOfServiceStatus": "COMPLETED",
                            "Setera.Provisioning.Dna:cfsServiceInstances": {
                                "Setera.Provisioning.Dna:cfsService": [
                                    {
                                        "Setera.Provisioning.Dna:cfsId": "CFSS_MOBILE_VOICE",
                                        "Setera.Provisioning.Dna:serviceId": "MOBILE VOICE_0055019900",
                                        "Setera.Provisioning.Dna:serviceStatus": "COMPLETED"
                                    },
                                    {
                                        "Setera.Provisioning.Dna:cfsId": "CFSS_SMS",
                                        "Setera.Provisioning.Dna:serviceId": "SMS_0055019899",
                                        "Setera.Provisioning.Dna:serviceStatus": "COMPLETED"
                                    },
                                    {
                                        "Setera.Provisioning.Dna:cfsId": "CFSS_MMS",
                                        "Setera.Provisioning.Dna:serviceId": "MMS_0055019901",
                                        "Setera.Provisioning.Dna:serviceStatus": "COMPLETED"
                                    },
                                    {
                                        "Setera.Provisioning.Dna:cfsId": "CFSS_SMS_VALUE_ADDED_SERVICES",
                                        "Setera.Provisioning.Dna:serviceId": "SMS VALUE ADDED SERVICES_0055019898",
                                        "Setera.Provisioning.Dna:serviceStatus": "COMPLETED"
                                    },
                                    {
                                        "Setera.Provisioning.Dna:cfsId": "CFSS_DATA",
                                        "Setera.Provisioning.Dna:serviceId": "DATA_0055019897",
                                        "Setera.Provisioning.Dna:serviceStatus": "COMPLETED"
                                    },
                                    {
                                        "Setera.Provisioning.Dna:cfsId": "CFSS_ROAMING",
                                        "Setera.Provisioning.Dna:serviceId": "ROAMING_0055019896",
                                        "Setera.Provisioning.Dna:serviceStatus": "COMPLETED"
                                    },
                                    {
                                        "Setera.Provisioning.Dna:cfsId": "CFSS_DATA_ROAMING_LIMIT",
                                        "Setera.Provisioning.Dna:serviceId": "DATA ROAMING LIMIT_0055019895",
                                        "Setera.Provisioning.Dna:serviceStatus": "COMPLETED"
                                    },
                                    {
                                        "Setera.Provisioning.Dna:cfsId": "CFSS_MOBILE_SUBSCRIBER",
                                        "Setera.Provisioning.Dna:serviceStatus": "COMPLETED"
                                    }
                                ]
                            },
                            "Setera.Provisioning.Dna:subscriptionID": "SE0007926834"
                        }
                    },
                    "Setera.Provisioning.Dna:orderId": "SETERA_CREATE_ORDER_ID_00358453430205_20230504111420",
                    "Setera.Provisioning.Dna:orderStatus": "I_COMPLETED"
                }
            }
        }
    }
}















# subscipriton add I_COMPLETED
{
    "soapenv:Envelope": {
        "@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
        "soapenv:Header": "null",
        "soapenv:Body": {
            "ServiceOrders.notifySetera:statusNotification": {
                "@xmlns:ServiceOrders.notifySetera": "https://dnaprov1.setera.fi/SOM_COM_ResponseListener/v1/",
                "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                "@xmlns:Setera.Provisioning.Dna": "http://schemas.datacontract.org/2004/07/Setera.Provisioning.Dna",
                "ServiceOrders.notifySetera:statusNotificationType": {
                    "Setera.Provisioning.Dna:LineOfServices": {
                        "Setera.Provisioning.Dna:LineOfService": {
                            "Setera.Provisioning.Dna:IMSI": "244122301105442",
                            "Setera.Provisioning.Dna:LineOfServiceId": "SETERA_LS_ID_003584577505156_20230420123931",
                            "Setera.Provisioning.Dna:LineOfServiceStatus": "COMPLETED",
                            "Setera.Provisioning.Dna:cfsServiceInstances": {
                                "Setera.Provisioning.Dna:cfsService": {
                                    "Setera.Provisioning.Dna:cfsId": "CFSS_MOBILE_SUBSCRIBER",
                                    "Setera.Provisioning.Dna:serviceStatus": "COMPLETED"
                                }
                            },
                            "Setera.Provisioning.Dna:subscriptionID": "SE0005754921"
                        }
                    },
                    "Setera.Provisioning.Dna:orderId": "SETERA_ORDER_ID_003584577505156_20230420123931",
                    "Setera.Provisioning.Dna:orderStatus": "I_COMPLETED"
                }
            }
        }
    }
}

