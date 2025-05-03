import  { useEffect, useState } from "react";

import { CiEdit } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { FaUser } from "react-icons/fa";
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
import { token_descrypt } from "@/Services/Decrypt";
import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import Noti from "./noti";


function navbar() {
  const encryptedToken=localStorage.getItem("access_token");
  const userId = (token_descrypt(encryptedToken) as { id: string })?.id;
  
  
  const navigate = useNavigate();
  const handleLogOut=()=>{
    localStorage.removeItem('access_token');
      navigate('/login');
  }

 
  const[showNavbar , setShowNavBar] = useState('topNav');
  const[scrollY , setScrollY]  = useState(0);
  const fetchUserData = async (userId: string | undefined) => {
    try {
      const response = await api.get(
        "/auth/get-user?author_id=" + userId
      );
      return response?.data?.data?.user;
    } catch (error) {
      console.log(error)
    }
  };

  const {  data } = useQuery({
    queryKey: ["profileData", userId],
    queryFn: () => fetchUserData(userId),
  });


  const constrolScroll=()=>{
   
    if(window.scrollY >200){
      if(window.scrollY > scrollY){
        setShowNavBar('hideNav')
        
      }else{
        setShowNavBar('showNav')
       
      }
      setScrollY(window.scrollY)
    }else{
      setShowNavBar('topNav')
      
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll',constrolScroll)

  },[scrollY])
 
 
  return (
    <div className={`flex justify-between fixed w-full items-center p-5 py-4  top-0 transition-all duration-300 border border-b-1 border-gray-100  ${showNavbar}`}>
      <div className="flex gap-5 items-center">
        <div className=" font-semibold text-2xl text-center">
          {/* <SiEditorconfig className=' text-[50px] font-semibold' /> */}
          <Link to={"/"}>CodeBase</Link>
        </div>
        <div className=" hidden">
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

            <DropdownMenu>
                    <DropdownMenuTrigger>
                      {/* <FaUserAstronaut className=" text-2xl pb-0" /> */}
                      <GoBell className="text-[20px] mt-1.5 text-gray-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" mr-6 px-4 py-3">
                      <DropdownMenuLabel>Notification</DropdownMenuLabel>
                      {/* <div className=" text-[12px] text-center mb-3 -mt-1">You have 0 unread notifications</div> */}
                      <DropdownMenuSeparator />
                      {
                        data?.requestedUserList.length > 0 ?  (
                          data?.requestedUserList?.map((item:any, index:number) => (
                               <Noti key={index} {...item}/>
                           
                          ))
                         
                         
                        )
                        
                          
                           
                        : (
                          <DropdownMenuItem className=" text-[14px]">No notifications</DropdownMenuItem>
                        )
                      }
                    
                    </DropdownMenuContent>
                  </DropdownMenu>
                    
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            {/* <FaUserAstronaut className=" text-2xl pb-0" /> */}
            <img src={data?.profile} className=" w-8 h-8 object-cover rounded-full" alt="" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" mr-6 p-4 pt-3">
            <DropdownMenuLabel>{data?.name}</DropdownMenuLabel>
            <div className=" text-[12px] text-center mb-3 -mt-1">{data?.email}</div>
            <DropdownMenuSeparator />
            <Link to={"/profile/@"+data?.username}><DropdownMenuItem> 
            <FaUser/>  <span>Profile</span>
            </DropdownMenuItem></Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogOut}><LuLogOut /><span className=" text-[14px]">Logout</span></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default navbar;
