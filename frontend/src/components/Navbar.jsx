import { FaBell } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";


const Navbar = () => {

    return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between">

      {/* Left */}

      <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search plans, Signatures, users..."
              className="pl-10 pr-4 py-2 bg-zinc-50 w-140 outline-none"
            />
          </div>        
     
      {/* Right */}
      <div className="flex items-center gap-6">

        

        {/* Notification */}
        <button className="relative cursor-pointer">

          <FaBell className="text-xl text-gray-600" />

          

        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">

          <FaCircleUser className="text-4xl text-gray-600" />

          <div>
            <h2 className="font-semibold">
              Admin
            </h2>

            <p className="text-xs text-gray-500">
              Super Admin
            </p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;