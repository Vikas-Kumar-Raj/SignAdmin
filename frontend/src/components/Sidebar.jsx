import { NavLink } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { sidebarData } from "../data/sidebarData";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen  bg-white border-r border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="h-20 border-b border-gray-200 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <FaPen className="text-xl text-black" />

          <div>
            <h1 className="text-lg font-bold">SignAdmin</h1>

            <p className="text-[10px] uppercase tracking-widest text-gray-500">
              Enterprise
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {sidebarData.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon className="text-lg" />

                  <span className="font-medium">{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
