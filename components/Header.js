import Image from "next/image";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HeaderLink from "./HeaderLink";
// import GroupIcon from "@mui/icons-material/Group";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import ChatIcon from "@mui/icons-material/Chat";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import WorkHistoryRoundedIcon from "@mui/icons-material/WorkHistoryRounded";
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Link from "next/link";

// import HomeIcon from '@mui/icons-material/Home';


const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

function Header({ feed }) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme, theme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  console.log("Current theme is", theme);



  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg">
      {/* Left */}
      <div className="flex items-center space-x-2 w-full max-w-xs">
        {mounted && (
          <>
            {resolvedTheme === "dark" ? (
              <Image src="https://rb.gy/bizvqj" width={45} height={45} />
            ) : (
              <Image src="https://rb.gy/dpmd9s" width={55} height={55} />
            )}
          </>
        )}

        <div className="flex items-center space-x-1 dark:md:bg-gray-700 py-2.5 px-4 rounded w-full">
          <SearchRoundedIcon />
          <input
            type="text"
            placeholder="Search"
            className="hidden md:inline-flex bg-transparent text-sm focus:outline-none placeholder-black/70 dark:placeholder-white/75 flex-grow"
          />
        </div>
      </div>
      {/* Right */}

      <div className="flex items-center space-x-6">
        {/* <Link href="/">
          <a>
            <HomeIcon className="!h-7 !w-7 lg:!-mb-1 ml-1" sx={{ display: { xs: 'block', sm: 'none', md: 'block' } }}/>
            <h4 className={`text-sm ${feed && "hidden lg:flex justify-center w-full mx-auto"}`}>Home</h4>
          </a>
        </Link>
        <Link href="/about"><a> About </a></Link>
        <Link href="/jobs"><a>jobs</a></Link>
        <Link href="/course"><a>course</a></Link>
        <Link href="/getusers"><a>users</a></Link> */}
        


        {/* <section> */}
        <Link href="/" >
          <a><HeaderLink Icon={HomeRoundedIcon} text="Home" feed active /></a>
        </Link>
        <Link href="/course">
          <a><HeaderLink Icon={SchoolRoundedIcon} text="course" feed active /></a>
        </Link>
        <Link href="/jobs">
          <a><HeaderLink Icon={WorkHistoryRoundedIcon} text="jobs" feed active /></a>
        </Link>
        <Link href="/getusers">
          <a><HeaderLink Icon={PersonAddAltRoundedIcon} text="users" feed active /></a>
        </Link>
        <HeaderLink Icon={Avatar} feed avatar hidden />

        {/* Dark mode toggle */}
        {mounted && (
          <div
            className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${resolvedTheme === "dark" ? "justify-end" : "justify-start"
              }`}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <span className="absolute left-0">🌜</span>
            <motion.div
              className="w-5 h-5 bg-white rounded-full z-40"
              layout
              transition={spring}
            />

            <span className="absolute right-0.5">🌞</span>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;