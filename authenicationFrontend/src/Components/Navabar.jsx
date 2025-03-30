import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/user", { withCredentials: true })
        .then((response) => {
            console.log(response);
        setUserData(response.data); 
      })
      .catch(() => {
        setUserData(null);
      });
  }, []);
    const HandleLogout = async() => {
       try {
         await axios.post(
           "http://localhost:8080/logout",
           {},
           {
             withCredentials: true,
           }
         );
         localStorage.removeItem("authToken");
         setUserData(null);
         navigate("/");
       } catch (error) {
         console.error("Logout failed:", error);
       }
    }

  return (
    <nav className="w-full bg-[#122] px-4 md:px-6 lg:px-24 py-4">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-[#FFF] text-2xl md:text-[30.6px] font-bold font-['Nunito Sans']">
            Air
          </span>
          <span className="text-[#C8C6C5] text-2xl md:text-[37.8px] font-bold font-['Nunito Sans']">
            OS
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { name: "Home", path: "/home" },
            { name: "Secret", path: "/secret" },
            { name: "About", path: "/about" },
            { name: "Live", path: "/live" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-[#FFF] text-[16px] font-medium font-['Nunito Sans'] leading-[22.4px] tracking-[-0.32px] hover:text-gray-600 transition-colors"
              style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex justify-between items-center gap-5 md:gap-7">
          {/* Language Selector */}
          <div className="w-0 h-2.5 origin-top-left outline outline-[0.84px] outline-offset-[-0.42px] outline-neutral-400" />
          <div className="hidden md:flex items-center justify-center gap-2 h-[35px]">
            <span className="text-[#FFF] font-['Imprima'] text-lg">EN</span>
          </div>

          {/* Play Radio Button */}
          <button className="w-full md:w-auto md:px-4 md:py-3 bg-[#F2EEE9] border-[3px] border-[#E8E4E1] rounded-[26.413px] flex justify-center items-center h-[35px]">
            <span className="px-2 text-[#000] font-[Inter] text-[16px] font-semibold leading-[120%] tracking-[-0.32px] not-italic md:text-base">
              Play Radio
            </span>
          </button>

          {/* User Authentication Section */}
          <div className="px-2.5 py-2 bg-[#FFFF] rounded-[360px] flex items-center gap-2 cursor-pointer hover:bg-amber-400">
            {userData ? (
              <div>
                <span className="text-black font-semibold font-['Nunito Sans'] leading-tight">
                  Welcome {userData.username}
                </span>
                <button className="bg-red-400" onClick={HandleLogout}>
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex mx-4">
                <div className="text-black font-semibold font-['Nunito Sans'] leading-tight">
                  <Link to="/login"> Login </Link>
                </div>
                <div>
                  <Link
                    to="/singup"
                    className="text-black font-semibold font-['Nunito Sans'] leading-tight"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
