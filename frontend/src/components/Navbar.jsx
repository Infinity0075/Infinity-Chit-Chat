import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { Link, useLocation } from "react-router";
import {
  BellIcon,
  Infinity as InfinityIcon,
  LogOut as LogOutIcon,
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat/");
  const { logoutMutation } = useLogout();

  //     without using custom hook useLogout
  //   const queryClient = useQueryClient();
  //     const { mutate: logoutMutation } = useMutation({
  //      mutationFn: logout,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  //    });

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* LOGO - ONLY IN CHAT PAGE */}
          {isChatPage ? (
            <Link to="/" className="flex items-center gap-2.5">
              <div className="text-base-content">
                <InfinityIcon className="size-9" />
              </div>

              {/* FIXED gradient class */}
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Infinity
              </span>
            </Link>
          ) : (
            <div /> // keeps spacing balanced
          )}

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* Notifications */}
            <Link to="/notifications" className="btn btn-ghost btn-circle">
              <BellIcon className="h-6 w-6 text-base-content opacity-70" />
            </Link>

            {/* Theme Switcher */}
            <ThemeSelector />

            {/* Avatar */}
            <div className="avatar">
              <div className="w-9 rounded-full">
                <img src={authUser?.profilePic} alt="User Avatar" />
              </div>
            </div>

            {/* Logout */}
            <button
              className="btn btn-ghost btn-circle"
              onClick={logoutMutation}
            >
              <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
