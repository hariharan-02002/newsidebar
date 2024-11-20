import React, { useState } from "react";

const NavBar = () => {
  const [openSections, setOpenSections] = useState({});
  const [collapsed, setCollapsed] = useState(false);

  const menuData = [
    {
      name: "ERP Business",
      id: 1,
      type: "main",
      subItems: [
        {
          name: "Accounting",
          id: 2,
          type: "primary",
          subItems: [
            {
              name: "Dashboard",
              id: 3,
              type: "secondary",
              subItems: [
                { name: "Banking" },
                { name: "Sales" },
                { name: "Invoice" },
                { name: "Banking" },
                { name: "Sales" },
                { name: "Invoice" },
                { name: "Banking" },
                { name: "Sales" },
                { name: "Invoice" },
                { name: "Banking" },
                { name: "Sales" },
                { name: "Invoice" },
              ],
            },
            {
              name: "Report",
              id: 4,
              type: "secondary",
              subItems: [
                { name: "Banking" },
                { name: "Sales" },
                { name: "Invoice" },
                { name: "Banking" },
                { name: "Sales" },
                { name: "Invoice" },
                { name: "Banking" },
                { name: "Sales" },
                { name: "Invoice" },
                { name: "Banking" },
                { name: "Sales" },
                { name: "Invoice" },
              ],
            },
            {
              name: "Accounting System",
              id: 5,
              subItems: [
                { name: "Banking" },
                {
                  name: "Sales",
                  id: 6,
                  type: "secondary",
                  subItems: [
                    { name: "Customer" },
                    { name: "Proposal" },
                    { name: "Customer" },
                    { name: "Proposal" },
                    { name: "Customer" },
                    { name: "Proposal" },
                  ],
                },
                {
                  name: "Sales",
                  id: 7,
                  type: "secondary",
                  subItems: [
                    { name: "Customer" },
                    { name: "Proposal" },
                    { name: "Customer" },
                    { name: "Proposal" },
                    { name: "Customer" },
                    { name: "Proposal" },
                  ],
                },
                {
                  name: "Sales",
                  id: 8,
                  type: "secondary",
                  subItems: [
                    { name: "Customer" },
                    { name: "Proposal" },
                    { name: "Customer" },
                    { name: "Proposal" },
                    { name: "Customer" },
                    { name: "Proposal" },
                  ],
                },
                { name: "Invoice" },
              ],
            },
          ],
        },
        {
          name: "Report",
          id: 9,
          type: "primary",
          subItems: [
            { name: "Banking" },
            { name: "Sales" },
            { name: "Invoice" },
            { name: "Banking" },
            { name: "Sales" },
            { name: "Invoice" },
            { name: "Banking" },
            { name: "Sales" },
            { name: "Invoice" },
            { name: "Banking" },
            { name: "Sales" },
            { name: "Invoice" },
          ],
        },
        {
          name: "Report",
          id: 10,
          type: "primary",
          subItems: [
            { name: "Banking" },
            { name: "Sales" },
            { name: "Invoice" },
            { name: "Banking" },
            { name: "Sales" },
            { name: "Invoice" },
            { name: "Banking" },
            { name: "Sales" },
            { name: "Invoice" },
            { name: "Banking" },
            { name: "Sales" },
            { name: "Invoice" },
          ],
        },
        {
          name: "Marketing",
          type: "primary",
          id: 11,
          subItems: [{ name: "Email" }, { name: "Social Media" }],
        },
      ],
    },
    { name: "ERP Business" },
  ];

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderMenu = (items, parentIndex = "") => {
    return items.map((item, idx) => {
      const currentIndex = parentIndex ? `${parentIndex}-${idx}` : `${idx}`;
      const isOpen = openSections[currentIndex];

      return (
        <div key={currentIndex} className="relative pl-2">
          {/* Parent item */}
          <div
            onClick={() => toggleSection(currentIndex)}
            className="cursor-pointer flex justify-between items-center p-2 rounded-md"
          >
            <span>{item.name}</span>
          </div>

          {/* Sub-items */}
          {isOpen && item.subItems && (
            <div className="relative pl-2">
              <div
                className={`absolute top-0 left-2 ${
                  item.id === 6 || 7
                    ? "h-[88%]"
                    : item.id === 1 || 10
                    ? "h-[95%]"
                    : item.id === 3 || 4
                    ? "h-full"
                    : item.id === 9 || 10
                    ? "h-[95%]"
                    : "h-full"
                } w-[2px] bg-gray-300`}
              ></div>

              {/* Bottom curve */}
              <div className="absolute left-2 bottom-4 w-4 h-4 border-l-2 border-b-2 border-gray-300 rounded-bl-lg"></div>

              {/* Recursive rendering of sub-items */}
              <div className="pl-2">
                {renderMenu(item.subItems, currentIndex)}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className={`bg-gray-100 text-black h-screen overflow-y-auto shadow-md transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-4 text-lg font-bold flex justify-between items-center">
        <span>{collapsed ? "Menu" : "ERP Business"}</span>
        <button
          onClick={toggleSidebar}
          className="text-xs px-2 py-1 bg-blue-500 text-white rounded-md"
        >
          {collapsed ? ">" : "<"}
        </button>
      </div>
      <div>{renderMenu(menuData)}</div>
    </div>
  );
};

export default NavBar;
