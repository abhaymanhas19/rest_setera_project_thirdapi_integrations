import { RouteType } from "./config";
import PersonIcon from '@mui/icons-material/Person';
//import CreditCardIcon from '@mui/icons-material/CreditCard';
//import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
//import LockIcon from '@mui/icons-material/Lock';
import Users from "../pages/Users/Users";
import HomePage from "../pages/HomePage/HomePage";
// import SimCard from "../pages/SimCard/SimCard";
// import UserInfo from "../pages/Restrictions/Restrictions";
// import Restrictions from "../pages/UserInfo/UserInfo";
import Subscription from "../pages/Accounts/Subscription/Subscription";
// import AddOns from "../pages/AddOns/AddOns";
// import Contact from "../pages/Contact/Contact";
// import DataConnection from "../pages/DataConnection/DataConnection";
// import SipTrunks from "../pages/SipTrunks/SipTrunks";
// import Support from "../pages/Support/Support";
// import CreateSupportTicket from "../pages/Support/CreateSupportTicket";
// import SupportPageLayout from "../pages/Support/SupportPageLayout";
// import OnecloudPageLayout from "../pages/Onecloud/OnecloudPageLayout";
// import UserCreation from "../pages/Onecloud/UserCreation";
// import ACDGroupCreation from "../pages/Onecloud/ACDGroupCreation";
// import OrderPageLayout from "../pages/Order/OrderPageLayout";
// import NewCustomer from "../pages/Order/NewCustomer";
//import SalesOrder from "../pages/Order/SalesOrder";
import SalesOrderList from "../pages/Accounts/SaleOrders/SalesOrderList";
import AccountsPageLayout from "../pages/Accounts/AccountsPageLayout";
import TrafficPage from "../pages/Accounts/Traffic";
import LicencePage from "../pages/Accounts/License";
import Notifications from "../pages/Notifications/Notifications";
import TasksPage from "../pages/Tasks/TasksPage";
import MobileUserList from "../pages/Mobiles/MobileUserList";
import ToolsPageLayout from "../pages/Tools/ToolsPageLayout";
import SettingsIcon from "@mui/icons-material/Settings";
import Messages from "../pages/Tools/Messages";
import MobilePageLayout from "../pages/Mobiles/Mobiles";
import AddMobileUser from "../pages/Mobiles/AddMobileUser";
import EditMobileUser from "../pages/Mobiles/EditMobileUser";
import SalesOrderEdit from "../pages/Accounts/SaleOrders/SalesOrderEdit";
import SubscriptionEdit from "../pages/Accounts/Subscription/SubscriptionEdit";

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/notifications",
    element: <Notifications />,
    state: "notifications",
  },
  {
    path: "/users",
    element: <Users />,
    state: "users",
    sidebarProps: {
      displayText: "Users",
      icon: <PersonIcon />,
    },
  },
  {
    path: "/accounting",
    element: <AccountsPageLayout />,
    state: "Accounting",
    sidebarProps: {
      displayText: "Accounting",
      icon: <AssignmentIndIcon />,
    },
    isShownChild: true,
    child: [
      {
        parent: "accounting",
        isChild: true,
        path: "/accounting/subscription",
        element: <Subscription />,
        state: "accounting.subscription",
        sidebarProps: {
          displayText: "Subscription",
        },
      },
      {
        parent: "accounting",
        isChild: true,
        path: "/accounting/subscription/edit/:id",
        element: <SubscriptionEdit />,
        state: "accounting.subscription.edit",
        isThisShow: false,
        sidebarProps: {
          displayText: "Subscription Edit",
        },
      },
      {
        parent: "accounting",
        isChild: true,
        path: "/accounting/traffic",
        element: <TrafficPage />,
        state: "accounting.traffic",
        sidebarProps: {
          displayText: "Traffic",
        },
      },
      {
        parent: "accounting",
        isChild: true,
        path: "/accounting/licence",
        element: <LicencePage />,
        state: "accounting.licence",
        sidebarProps: {
          displayText: "Licence",
        },
      },
      {
        parent: "accounting",
        isChild: true,
        path: "/accounting/sales-order",
        element: <SalesOrderList />,
        state: "accounting.salesorder",
        sidebarProps: {
          displayText: "Sales Order",
        },
      },
      {
        parent: "accounting",
        isChild: true,
        path: "/accounting/sales-order/edit/:id",
        element: <SalesOrderEdit />,
        state: "accounting.saleorderedit",
        customtitle: "Sale order Edit",
        isThisShow: false,
        sidebarProps: {
          displayText: "Sale order Edit",
        },
      },
    ],
  },
  // {
  //   path: "/data-connection",
  //   element: <DataConnection />,
  //   state: "dataConnection",
  //   sidebarProps: {
  //     displayText: "Data Connection",
  //     icon: <LockIcon />,
  //   },
  // },
  // {
  //   path: "/support",
  //   element: <SupportPageLayout />,
  //   state: "support",
  //   sidebarProps: {
  //     displayText: "Support",
  //     icon: <PersonIcon />,
  //   },
  //   isShownChild: true,
  //   child: [
  //     {
  //       parent: "support",
  //       isChild: true,
  //       path: "/support/all-tickets",
  //       element: <Support />,
  //       state: "support.alltickets",
  //       sidebarProps: {
  //         displayText: "All Tickets",
  //       },
  //     },
  //     {
  //       parent: "support",
  //       isChild: true,
  //       path: "/support/create-ticket",
  //       element: <CreateSupportTicket />,
  //       state: "support.create",
  //       sidebarProps: {
  //         displayText: "Create New Ticket",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/sip-truncks",
  //   element: <SipTrunks />,
  //   state: "Sip Trunks",
  //   sidebarProps: {
  //     displayText: "Sip Trunks",
  //     icon: <CreditCardIcon />,
  //   },
  // },
  // {
  //   path: "/onecloud",
  //   element: <OnecloudPageLayout />,
  //   state: "Onecloud",
  //   sidebarProps: {
  //     displayText: "Onecloud",
  //     icon: <AddCircleIcon />,
  //   },
  //   isShownChild: true,
  //   child: [
  //     {
  //       parent: "onecloud",
  //       isChild: true,
  //       path: "/onecloud/user-creation",
  //       element: <UserCreation />,
  //       state: "onecloud.usercreation",
  //       sidebarProps: {
  //         displayText: "User Creation",
  //       },
  //     },
  //     {
  //       parent: "onecloud",
  //       isChild: true,
  //       path: "/onecloud/acd-group-creation",
  //       element: <ACDGroupCreation />,
  //       state: "onecloud.acdgroupcreation",
  //       sidebarProps: {
  //         displayText: "ACD group creation",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/order",
  //   element: <OrderPageLayout />,
  //   state: "Order",
  //   sidebarProps: {
  //     displayText: "Order",
  //     icon: <AssignmentIndIcon />,
  //   },
  //   isShownChild: true,
  //   child: [
  //     {
  //       parent: "order",
  //       isChild: true,
  //       path: "/order/new-customer",
  //       element: <NewCustomer />,
  //       state: "order.newcustomer",
  //       sidebarProps: {
  //         displayText: "New customer",
  //       },
  //     },
  //   ],
  // },
  {
    path: "/tasks",
    element: <TasksPage />,
    state: "tasks",
    sidebarProps: {
      displayText: "Tasks",
      icon: <AssignmentIndIcon />,
    },
  },
  {
    path: "/tools",
    element: <ToolsPageLayout />,
    state: "tools",
    sidebarProps: {
      displayText: "Tools",
      icon: <SettingsIcon />,
    },
    isShownChild: true,
    child: [
      {
        parent: "tools",
        isChild: true,
        path: "/tools/messages",
        element: <Messages />,
        state: "tools.messages",
        sidebarProps: {
          displayText: "Messages",
        },
      },
    ],
  },
  {
    path: "/mobiles",
    element: <MobilePageLayout />,
    state: "mobiles",
    sidebarProps: {
      displayText: "Mobiles",
      icon: <SettingsIcon />,
    },
    isShownChild: true,
    child: [
      {
        parent: "mobiles",
        isChild: true,
        path: "/mobiles/mobile-user-list",
        element: <MobileUserList />,
        state: "mobiles.mobileuserlist",
        customtitle: "Mobile Users List",
        sidebarProps: {
          displayText: "Users",
        },
      },
      {
        parent: "mobiles",
        isChild: true,
        path: "/mobiles/mobile-user-list/add",
        element: <AddMobileUser />,
        state: "mobiles.mobileuseradd",
        customtitle: "Mobile Users Add",
        isThisShow: false,
        sidebarProps: {
          displayText: "Users",
        },
      },
      {
        parent: "mobiles",
        isChild: true,
        path: "/mobiles/mobile-user-list/edit/:id",
        element: <EditMobileUser />,
        state: "mobiles.mobileuseredit",
        customtitle: "Mobile Users Edit",
        isThisShow: false,
        sidebarProps: {
          displayText: "Edit Users",
        },
      },
      {
        parent: "mobiles",
        isChild: true,
        path: "/mobiles/mobile-prov-notifications",
        element: <Notifications />,
        state: "mobiles.provnotifications",
        sidebarProps: {
          displayText: "Prov Notifications",
        },
      },
      {
        parent: "mobiles",
        isChild: true,
        path: "/mobiles/mobile-prov-notifications/subscription/:id",
        element: <Notifications />,
        state: "mobiles.provnotifications",
        isThisShow: false,
        sidebarProps: {
          displayText: "Prov Notifications",
        },
      },
    ],
  },
  // {
  //   path: "/sim-card",
  //   element: <SimCard />,
  //   state: "simcard",
  //   sidebarProps: {
  //     displayText: "Sim Card",
  //     icon: <SimCardIcon />
  //   }
  // },

  // {
  //   path: "/user-info",
  //   element: <UserInfo />,
  //   state: "userinfo",
  //   sidebarProps: {
  //     displayText: "User Info",
  //     icon: <PersonIcon />
  //   }
  // },
  // {
  //   path: "/restriction",
  //   element: <Restrictions />,
  //   state: "restriction",
  //   sidebarProps: {
  //     displayText: "Restrictions",
  //     icon: <LockIcon />
  //   }
  // },
  // {
  //   path: "/add-ons",
  //   element: <AddOns />,
  //   state: "addons",
  //   sidebarProps: {
  //     displayText: "Add Ons",
  //     icon: <AddCircleIcon />
  //   }
  // },

  // {
  //   parent: "onecloud",
  //   isChild: true,
  //   path: "/onecloud/provision-notifications",
  //   element: <ProvisionNotificationsPage />,
  //   state: "onecloud.provisionnotifications",
  //   sidebarProps: {
  //     displayText: "Provision Notifications",
  //   },
  // },
  // {
  //   parent: "onecloud",
  //   isChild: true,
  //   path: "/onecloud/view-provision-notifications",
  //   element: <ViewProvisionNotificationsPage />,
  //   state: "onecloud.viewprovisionnotifications",
  //   sidebarProps: {
  //     displayText: "View Provision Notifications",
  //   },
  // },


];

export default appRoutes;