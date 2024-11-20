import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "./style.css";
import React, { memo, useEffect, useMemo, useState } from "react";
import logo from "../../../../images/logo.png";

import { Link, useLocation } from "react-router-dom";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const isActiveOrHasActiveChild = (item, activeItem) => {
  if (item.title === activeItem) return true;
  if (item.children) {
    return item.children.some((child) =>
      isActiveOrHasActiveChild(child, activeItem)
    );
  }
  return false;
};

const SidebarItem = memo(
  ({
    item,
    level = 0,
    activeItem,
    setActiveItem,
    collapseSideBar,
    setCollapseSideBar,
  }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = isActiveOrHasActiveChild(item, activeItem);
    const handleClick = () => {
      setCollapseSideBar?.(false);

      if (isActive && item.title === activeItem) {
        setActiveItem("");
      } else {
        setActiveItem(item.title);
      }
    };

    return (
      <div className={`sidebar-item level-${level}`}>
        <Link to={item?.path || "#"}>
          <div
            className={`sidebar-header ${isActive ? "active" : ""}`}
            onClick={handleClick}
          >
            <div className="sidebar-header-icon">
              {item?.icon}
              {!collapseSideBar && <p className="text-xs pl-2">{item.title}</p>}
            </div>

            {!collapseSideBar &&
              hasChildren &&
              (isActive ? <FaAngleUp /> : <FaAngleDown />)}
          </div>
        </Link>

        {hasChildren && isActive && !collapseSideBar && (
          <div className={`sidebar-children open`}>
            {item.children.map((child, index) => (
              <SidebarItem
                key={index}
                item={child}
                level={level + 1}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

SidebarItem.displayName = "SidebarItem";

const Sidebar = ({
  sidebarOpen,
  toggleCollapseSideBar,
  collapseSideBar,
  setCollapseSideBar,
  hideSidebar,
  setHideSideBar,
}) => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const location = useLocation();

  function handleMouseEnter() {
    setCollapseSideBar(false);
  }

  function handleMouseLeave() {
    if (!collapseSideBar) {
      setCollapseSideBar(true);
    }
  }

  const sidebarData = useMemo(
    () => [
      {
        title: "ERP Accounting",
        children: [
          { title: "Dashboard", path: "accounting/dashboard" },
          {
            title: "Reports",
            children: [
              {
                title: "Account Statement",
                path: "accounting/reports/AccountStatementSummary",
              },
              {
                title: "Invoice Summary",
                path: "accounting/reports/InvoiceSummary",
              },
              {
                title: "Sales Report",
                path: "accounting/reports/SalesReport",
              },
              {
                title: "Receivable Reports",
                path: "accounting/reports/ReceivableReports",
              },
              {
                title: "Payable Reports",
                path: "accounting/reports/PayableReports",
              },
              {
                title: "Bill Summary",
                path: "accounting/reports/BillSummary",
              },
              {
                title: "Product Stock",
                path: "accounting/reports/ProductStock",
              },
              { title: "Cash Flow", path: "accounting/reports/CashFlow" },
              {
                title: "Transaction Summary",
                path: "accounting/reports/TransactionSummary",
              },
              {
                title: "Income Summary",
                path: "accounting/reports/IncomeSummary",
              },
              {
                title: "Expense Summary",
                path: "accounting/reports/ExpenseSummary",
              },
              {
                title: "Income Vs Expense Summary",
                path: "accounting/reports/IncomeVsExpenseSummary",
              },
              {
                title: "Tax Summary",
                path: "accounting/reports/TaxSummary",
              },
            ],
          },
          {
            title: "Accounting System",
            children: [
              { title: "Banking", path: "accounting/system/banking" },
              {
                title: "Sales",
                children: [
                  {
                    title: "Customer",
                    path: "accounting/system/sales/customer",
                  },
                  {
                    title: "Proposal",
                    path: "accounting/system/sales/proposal",
                  },
                  {
                    title: "Invoice",
                    path: "accounting/system/sales/invoice",
                  },
                  {
                    title: "Revenue",
                    path: "accounting/system/sales/revenue",
                  },
                  {
                    title: "Credit Note",
                    path: "accounting/system/sales/creditNote",
                  },
                ],
              },
              {
                title: "Purchases",
                children: [
                  {
                    title: "Supplier",
                    path: "accounting/system/purchases/supplier",
                  },
                  {
                    title: "Bill",
                    path: "accounting/system/purchases/bill",
                  },
                  {
                    title: "Expense",
                    path: "accounting/system/purchases/expense",
                  },
                  {
                    title: "Payment",
                    path: "accounting/system/purchases/payment",
                  },
                  {
                    title: "Debit Note",
                    path: "accounting/system/purchases/debitNote",
                  },
                ],
              },
              {
                title: "Double Entry",
                children: [
                  {
                    title: "Charts of Accounts",
                    path: "accounting/system/doubleEntry/chartsOfAccount",
                  },
                  {
                    title: "Journal Entry",
                    path: "accounting/system/doubleEntry/journalEntry",
                  },
                  {
                    title: "Ledger Summary",
                    path: "accounting/system/doubleEntry/LedgerSummary",
                  },
                  {
                    title: "Balance Sheet",
                    path: "accounting/system/doubleEntry/balanceSheet",
                  },
                  {
                    title: "Profit & Loss",
                    path: "accounting/system/doubleEntry/profitLoss",
                  },
                  {
                    title: "Trial Balance",
                    path: "accounting/system/doubleEntry/trialBalance",
                  },
                  {
                    title: "Fixed Asset",
                    path: "accounting/system/doubleEntry/fixedAssets",
                  },
                ],
              },
              {
                title: "Budget Planner",
                path: "accounting/system/budgetPlanner",
              },
              {
                title: "Financial Goal",
                path: "accounting/system/financialGoal",
              },
              {
                title: "Accounting Setup",
                path: "accounting/system/accountingSetup",
              },
              {
                title: "Print Setting",
                path: "accounting/system/printSetting",
              },
            ],
          },
        ],
      },
      {
        title: "POS",
        children: [
          {
            title: "Backoffice Dashboard",
            path: "/admin/pos/dashboard",
          },
          {
            title: "Panels",
            children: [
              { title: "POS Dashboard", path: "/admin/pos/main" },
              { title: "Waiter", path: "" },
              { title: "Kitchen", path: "" },
            ],
          },
          {
            title: "Items",
            children: [
              { title: "Ingredient Unit", path: "" },
              { title: "Ingredient category", path: "" },
              { title: "Modifier", path: "" },
              { title: "Food Menu Category", path: "" },
              { title: "Pre-made Food", path: "" },
            ],
          },
          {
            title: "Stocks ",
            children: [
              { title: "All Stocks", path: "/admin/pos/stocks/allstocks" },
              { title: "Low Stocks", path: "/admin/pos/stocks/lowstocks" },
              { title: "Out of stocks", path: "/admin/pos/stocks/slowstocks" },
              {
                title: "Not Moving stocks",
                path: "/admin/pos/stocks/slowstocks",
              },
              {
                title: "Stocks Adjustments",
                path: "/admin/pos/stocks/adjuststocks",
              },
            ],
          },
          {
            title: "Purchase",
            children: [
              {
                title: "Purchase ",
                path: "/admin/pos/supplierPurchase/purchase",
              },
              {
                title: "Supplier ",
                path: "/admin/pos/supplierPurchase/supplier",
              },
              {
                title: "Due Payments",
                path: "/admin/pos/supplierPurchase/vendor",
              },
            ],
          },
          {
            title: "Production",
            path: "/admin/pos",
          },
          {
            title: "Sales ",
            children: [
              { title: "Sales  ", path: "/admin/pos/sales/saleslist" },
              { title: "Customer ", path: "/admin/pos/sales/customer" },
              { title: "Promotion ", path: "/admin/pos/sales/promotion" },
            ],
          },
          {
            title: "Expenses",
            children: [
              {
                title: "Expense Item",
                path: "/admin/pos/expenses/expenseitems",
              },
              { title: "Expenses ", path: "/admin/pos/expenses/expense" },
            ],
          },
          {
            title: "Attendance",
            path: "/admin/pos/attendance",
          },
          {
            title: "Reports ",
            children: [
              { title: "Register", path: "" },
              { title: "Z Report", path: "" },
              { title: "Production Analysis Report", path: "" },
              { title: "Daily Summary Report", path: "" },
              { title: "Food Sale Report (missing ui)", path: "" },
              { title: "Daily Sales Report", path: "" },
              { title: "Detailed Sales Report", path: "" },
              { title: "Consumption Report", path: "" },
              { title: "Stock Report", path: "" },
              { title: "Low Stock Report", path: "" },
              { title: "Profit & Loss Report", path: "" },
              { title: "Supplier Due Report", path: "" },
              { title: "Customer Ledger Report", path: "" },
              { title: "Customer Due Report", path: "" },
              { title: "Purchase Report", path: "" },
              { title: "Expense Report", path: "" },
              { title: "Waste Report", path: "" },
              { title: "Tax Report", path: "" },
              { title: "Attendance Report", path: "" },
              {
                title: "Food menu sales by category Available Loyalty point",
                path: "",
              },
              { title: "Usage Loyalty Point (missing ui)", path: "" },
              { title: "Production Report", path: "" },
              { title: "Expenses", path: "" },
            ],
          },
          {
            title: "User Management",
            children: [
              { title: "Users", path: "" },
              { title: "Roles", path: "" },
            ],
          },
          {
            title: "Settings",
            children: [
              { title: "Settings ", path: "" },
              { title: "Printer", path: "" },
              { title: "Counter", path: "" },
              { title: "Tax Setting", path: "" },
              { title: "Multiple Currency", path: "" },
              { title: "License Uninstall", path: "" },
              { title: "Self order Setting", path: "" },
              { title: "Reservation Setting", path: "" },
              { title: "Payment Methods", path: "" },
              { title: "Delivery Partner", path: "" },
              { title: "Area/floor Table", path: "" },
            ],
          },
        ],
      },
      {
        title: "User Management",
        path: "usermanagement",
      },
      {
        title: "Ticket",
        path: "ticket",
      },
      {
        title: "Plan Configuration",
        children: [
          { title: "Plans", path: "plansubscription" },
          { title: "Orders", path: "orders" },
        ],
      },
      {
        title: "Referral Program",
        path: "referral-program",
      },
      {
        title: "Settings",
        children: [
          { title: "Brand Settings", path: "settings/brand-settings" },
          { title: "System Settings", path: "settings/system-settings" },
          { title: "Company Settings", path: "settings/company-settings" },
          { title: "Currency Settings", path: "settings/currency-settings" },
          { title: "Email Settings", path: "settings/email-settings" },
          { title: "Payment Settings", path: "settings/payment-settings" },
          { title: "Twilio Settings", path: "settings/twillio-settings" },
          {
            title: "Email Notification Settings",
            path: "settings/email-notification-settings",
          },
          { title: "IP Restriction Settings", path: "settings/ip-settings" },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const currentPath = location.pathname;

    const findActiveItem = (data) => {
      for (const item of data) {
        if (item.path === currentPath) {
          return item.title;
        }
        if (item.children) {
          const childActiveItem = findActiveItem(item.children);
          if (childActiveItem) {
            return childActiveItem;
          }
        }
      }
      return null;
    };
    const activeTitle = findActiveItem(sidebarData);
    if (activeTitle) {
      setActiveItem(activeTitle);
    }
  }, [location, sidebarData]);

  return (
    <div
      className={`${
        collapseSideBar ? "sidebar-container-collapsed" : "sidebar-container"
      }  bg-white relative border-r-2 shadow-md ${
        sidebarOpen ? "responsive" : ""
      }`}
      onMouseOver={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-center items-center">
        <img
          src={!collapseSideBar ? logo : "/favicon.png"}
          className={`${
            collapseSideBar ? "h-7 my-5" : "h-24 "
          } object-cover cursor-pointer`}
          alt="logo"
        />
      </div>

      <div
        className={`hidden   md:flex justify-center items-center z-10 bg-white rounded-md cursor-pointer p-1 shadow-md border-[#D9D8D8] hover:bg-slate-200 duration-200 absolute -right-2 ${
          collapseSideBar ? "top-20" : "top-10"
        }`}
        onClick={toggleCollapseSideBar}
      >
        {collapseSideBar ? (
          <MdOutlineKeyboardArrowRight />
        ) : (
          <MdOutlineKeyboardArrowLeft />
        )}
      </div>

      {sidebarData.map((item, index) => (
        <SidebarItem
          key={index}
          item={item}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          collapseSideBar={collapseSideBar}
          setCollapseSideBar={setCollapseSideBar}
        />
      ))}
    </div>
  );
};

export default Sidebar;
