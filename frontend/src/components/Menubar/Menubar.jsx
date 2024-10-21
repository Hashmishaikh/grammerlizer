import { Link, NavLink, Outlet } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import TopHeader from "./TopHeader";
// import '../../pages/styles.css'
const Menubars = () => {
  const { logout } = useLogout();
  return (
    <div className="h-full">
      <div className="h-full bg-white text-gray-900">
        <div className="min-h-full flex">
          <div className="w-64 bg-gray-100 border-r border-gray-200">
            <div className="p-6">
              <h1 className="ibm-h3 text-gray-900">GrammarTune</h1>
            </div>
            <nav className="mt-6">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                isActive ? "flex items-center px-6 py-3 text-sm font-medium text-gray-900 border-l-4 border-blue-600 bg-gray-200 hover:bg-gray-300 transition-colors duration-150" : "flex items-center px-6 py-3 text-sm font-medium text-gray-600 border-l-4 border-transparent hover:border-gray-300 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-150"
                }
                
              >
                Grammar
              </NavLink>
              {/* <NavLink
                to="/paragrism"
                className={({ isActive }) =>
                  isActive ? "flex items-center px-6 py-3 text-sm font-medium text-gray-900 border-l-4 border-blue-600 bg-gray-200 hover:bg-gray-300 transition-colors duration-150" : "flex items-center px-6 py-3 text-sm font-medium text-gray-600 border-l-4 border-transparent hover:border-gray-300 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-150"
                  }
                // className="flex items-center px-6 py-3 text-sm font-medium text-gray-600 border-l-4 border-transparent hover:border-gray-300 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-150"
              >
                Plagiarism
              </NavLink>
              <NavLink
                to="/translate"
                className={({ isActive }) =>
                  isActive ? "flex items-center px-6 py-3 text-sm font-medium text-gray-900 border-l-4 border-blue-600 bg-gray-200 hover:bg-gray-300 transition-colors duration-150" : "flex items-center px-6 py-3 text-sm font-medium text-gray-600 border-l-4 border-transparent hover:border-gray-300 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-150"
                  }
              >
                Translate
              </NavLink>
              <NavLink
                to="/summery"
                className={({ isActive }) =>
                  isActive ? "flex items-center px-6 py-3 text-sm font-medium text-gray-900 border-l-4 border-blue-600 bg-gray-200 hover:bg-gray-300 transition-colors duration-150" : "flex items-center px-6 py-3 text-sm font-medium text-gray-600 border-l-4 border-transparent hover:border-gray-300 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-150"
                  }
              >
                Summary
              </NavLink> */}
            </nav>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopHeader />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menubars;
