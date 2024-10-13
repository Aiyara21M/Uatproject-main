import React, { useState, useEffect, useRef } from 'react';

const Menu_st = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (taskName) => {
    if (openDropdown === taskName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(taskName);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const columns = [
    {
      title: 'Detail setting',
      tasks: [
        { name: 'พนักงาน', tags: ['webix', 'jet', 'easy'] },
        { name: 'แผนก', tags: ['hard', 'docs'] },
        { name: 'เพศ', tags: ['hard', 'docs'] },
        { name: 'ที่อยู่', tags: ['hard', 'docs'] },
      ],
    },
    {
      title: 'In Progress',
      tasks: [
        { name: 'as', tags: ['webix'] },
        { name: 'Spreadsheet NodeJS', tags: ['easy'] },
      ],
    },
    {
        title: 'In Progress',
        tasks: [
          { name: 'Performance tests', tags: ['webix'] },
          { name: 'Spreadsheet NodeJS', tags: ['easy'] },
        ],
      },
      {
        title: 'In Progress',
        tasks: [
          { name: 'Performance tests', tags: ['webix'] },
          { name: 'Spreadsheet NodeJS', tags: ['easy'] },
        ],
      },
  ];

  return (
<div className="flex justify-center items-center w-full h-[91vh] font-athiti px-4">
  {/* Set grid to have 4 columns on large screens, 3 on medium, 2 on small, and 1 on mobile */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full md:w-[85%]  h-[95%]  overflow-auto">
    {columns.map((column) => (
      <div key={column.title} className="bg-gray-100 p-4 rounded-lg shadow h-fit mx-4 my-4">
        <h2 className="text-lg font-bold mb-4">{column.title}</h2>
        {column.tasks.map((task) => (
          <div key={task.name} className="bg-white p-3 rounded-lg shadow mb-4 relative">
            <div className="absolute top-1 right-2">
              <button
                className="text-gray-500 hover:text-black"
                onClick={() => toggleDropdown(task.name)}
              >
                ⋮
              </button>
              {openDropdown === task.name && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-20"
                >
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">แก้ไข้</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">รายละเอียด</li>
                  </ul>
                </div>
              )}
            </div>
            <h3 className="font-semibold">{task.name}</h3>
            <div className="flex space-x-2 mt-2">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-200 rounded-full px-2 py-1 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
</div>



  );
};

export default Menu_st;
