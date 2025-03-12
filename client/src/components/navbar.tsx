import React from "react";
import { SiEditorconfig } from "react-icons/si";
import { CiEdit } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { FaUserAstronaut } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

function navbar() {
  const navigate = useNavigate();
  const handleLogOut=()=>{
    localStorage.removeItem('access_token');
      navigate('/login');
  }
  return (
    <div className="flex justify-between items-center p-5 py-4 border border-b-1 border-gray-100">
      <div className="flex gap-5 items-center">
        <div className=" font-semibold text-2xl text-center">
          {/* <SiEditorconfig className=' text-[50px] font-semibold' /> */}
          <Link to={"/"}>CodeBase</Link>
        </div>
        <div>
          <input
            className=" border w-[250px] focus:outline-0 border-gray-200 p-5 py-2 rounded-full text-[14px]"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <Link to={"/post"}>
          <div className="flex gap-2 items-center">
            <CiEdit className=" text-2xl opacity-75" />
            <span className=" text-[13px] text-gray-500">Write</span>
          </div>
        </Link>
        <div>
          <GoBell className="text-2xl text-gray-500" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaUserAstronaut className=" text-2xl pb-0" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" mr-6">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to={"/profile/3"}><DropdownMenuItem> 
             Profile
            </DropdownMenuItem></Link>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogOut}><LuLogOut /><span className=" text-[14px]">Logout</span></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default navbar;
