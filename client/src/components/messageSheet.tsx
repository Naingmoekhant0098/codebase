import React, { useEffect, useId, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HiDotsVertical } from "react-icons/hi";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { token_descrypt } from "@/Services/Decrypt";
import api from "@/api/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import io from 'socket.io-client'
import { APP_URL } from "@/Config";
import { set } from "react-hook-form";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import moment from "moment";
// const formatted = moment().format('D-M');
function messageSheet(userData:any) {
  const [isAccept, setIsAccept] = React.useState(false);
  const[isBlock,setIsBlock]=React.useState(false)
   const encryptedToken = localStorage.getItem("access_token");
    const userId = (token_descrypt(encryptedToken) as { id: string })?.id;
   const queryClient = useQueryClient();
   const [message,setMessage]=useState<any>("")
   const { username } = useParams();
   const [onlineUsers, setOnlineUsers] = useState<any>([]);
   const app_url = "http://localhost:3000";
   const socket = React.useMemo(() => io(app_url, { autoConnect: false }), [app_url]);
   const isAccepted = userData.userData.user.requestedUserList.find((u:any) =>u.userId==userId );
   
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.emit("new-user-add",userId);
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
      console.log(users);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, [socket]);
  // socket.on("disconnect", () => {
  //   console.log("Disconnected from socket server");
  // });
 
  
  const handleRequest = async () => {

    try {
      const response = await api.put(
        "/auth/request-to-accept-messages",
        {
          userId: userData.userData?.user._id,
          requestUserId: userId,
        }
      );
      if(response.status===200){
        // queryClient.invalidateQueries({ queryKey: ["profileData", username?.replace("@", "")] });
        queryClient.setQueryData(["profileData", username?.replace("@", "")], (oldData:any) => {
          const updatedUser = {
            ...oldData,
            requestedUserList: [
              ...oldData.requestedUserList,
              { userId: userId, status: "accepted" },
            ],
          };
          return updatedUser;
        }
        );
        setIsAccept(true);
        toast.success("Request sent successfully");
      }   
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

 const isActive = onlineUsers.find((user:any) => user.userId === userData.userData?.user._id);
  socket.on("receiveMessage", (data) => {
  if(data){
    toast.success("New message received from user");
  }
    console.log("Message received:", data);
    queryClient.setQueryData(["messages",userId], (oldData:any) => {
      return [
        ...oldData,
        data
      ];
    });
   
  });
  
  const sendMessage = async () => {
    try {
      const response = await api.post(
        "/auth/send-message",
        {
          senderId: userId,
          receiverId: userData.userData.user._id,
          message: message,
        }
      ); 
      if(response.status===200){
    const userMessage={
      senderId : userId,
      receiverId : userData?.userData?.user?._id,
      message: message,
      createdAt: new Date(),
      updatedAt: new Date(),   
    }
        socket.emit("sendMessage",userMessage);
        queryClient.setQueryData(["messages",userId], (oldData:any) => {
          return [
            ...oldData,
            userMessage
          ];
        }
        );
        setMessage("");

  }
  }catch (error) {
      console.error("Error sending message:", error);
    }

  
  
  };


  const fetchMessages = async()=>{
    try {
      const response = await api.get(
        "/auth/get-messages?senderId=" +userId+"&receiverId="+userData.userData?.user?._id
      );
     
      return response?.data;
      
    } catch (error) {
      console.log(error)
    }
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages",userId],
    queryFn: () => fetchMessages(),
    
  });
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  
const scrollToBottom = () => {
  // if (messagesEndRef.current) {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  // }
};
scrollToBottom();

useEffect(() => {
  if (data || message) {
    scrollToBottom();
  }
}, [data, message]);
 

  
  return (
    <Sheet>
      <SheetTrigger>
        <div className="  px-6 py-2 cursor-pointer text-[14px] bg-black text-white rounded-full border inline-block border-black">
          Message
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          {/* <SheetTi
          tle>Are you absolutely sure?</SheetTi> */}
          <div className=" w-full flex justify-between items-center">
            <div className=" flex gap-3 items-center">
              <LazyLoadImage
                className=" w-10 h-10 object-cover rounded-full"
                src={userData?.userData?.user?.profile}
              />
              <div>
                <div className=" text-[14px]">{userData?.userData?.user?.name|| userData?.userData?.user?.username}</div>
                {
                  !isActive ? (<div className=" text-[12px] text-red-300">Offline</div>):(<div className=" text-[12px] text-green-300">Active Now</div>)
                }
              </div>
            </div>
            <DropdownMenu>
          <DropdownMenuTrigger>
            {/* <FaUserAstronaut className=" text-2xl pb-0" /> */}
            <HiDotsVertical size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" mr-6 px-4">
            <DropdownMenuItem ><span className=" text-[14px] text-red-500" onClick={()=>setIsBlock(true)}>Block this user</span></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          
          </div>
          <div className=" w-full h-[1px] bg-gray-200 my-2"></div>
          {
            // isAccepted?.status ==='accepted' ? (
              <div className="h-[85vh] flex flex-col justify-between">
              <div className=" flex flex-col mt-2 py-3 overflow-auto  no-scrollbar  h-[100%] gap-5 " >
             
                {
                  data?.length > 0 ? (
                    data?.map((item:any, index:number) => (
                     
                      <div className={`text-[13px]  flex  text-white  w-auto ${item?.senderId == userId && " justify-end"}`}>
                        
                    <p className={`inline-block  px-5 py-2 pt-3 rounded-[12px]  ${item?.senderId == userId ? "rounded-br-none bg-gray-400" : 'bg-black rounded-bl-none'}`}>
                      <p>{item?.message}</p>
                      <div className={`${item?.senderId===userId ? "text-left" : 'text-right'}  text-[10px] mt-[2px] opacity-60`}>
                        {" "}
                      {
                          moment(item?.createdAt).calendar()
                      }
                      </div>
                    </p>
                  </div>
                    ))
                  ) : (
                    <div className=" text-center  mt-6 font-semibold text-[18px]">
                       <DotLottieReact
      src="https://lottie.host/c32fda89-544d-43c8-b001-e05a7294f0c9/fJBo6S0LUi.lottie"
      loop
      autoplay
    />
                    <div className=" mt-4">
                      There is no message yet

                    </div>
                    </div>
                  )
                }

<div ref={messagesEndRef}></div>     
              </div>
  
              <div className=" w-full flex justify-between items-center mt-2 gap-2">
                {
                  isBlock ? (
                    <div className=" text-[12px] text-center text-red-500 px-5 py-2 rounded-full">
                  You have been blocked by this user and cannot send messages right now !.
                    </div>
                  ) : (
                    <div className=" flex items-center justify-between w-full gap-3">
              <form onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }
                } className="flex items-center justify-between w-full gap-3"> 
              <input
               onChange={(e)=>setMessage(e.target.value)}
                  value={message}
                  type="text"
                  className=" w-full bg-gray-200 px-5 text-[13px] py-2 rounded-full mt-3"
                  placeholder="Type your message here..."
                />
                <Button type="submit" className=" bg-black text-white px-5 py-2 rounded-full mt-3"  >
                  Send
                </Button>
              </form>
               </div>
                  )
                }
              
              </div>
            </div>
            // ) : (
            //   <div className="h-[90vh] flex flex-col  justify-center items-center">
             
            //   <div className="text-center  font-semibold text-[18px]">
            //     Connect and communicate seamlessly
            //   </div>
            //   <div className="text-center mt-2 text-gray-500 text-[14px]">
            //     The author is not accepting messages at the moment. Please wait
            //     for them to accept your request.
            //   </div>
            //  {
            //   isAccepted?.status === 'pending' ? (
            //     <Button
            //     className=" bg-black text-white px-5 py-2 rounded-full mt-3"
            //     onClick={handleRequest}
            //   > 
            //     Request Send
            //   </Button>
            //   ) : isAccepted?.status=="rejected" ? (
            //     (
            //       <Button
            //       className=" bg-black text-white px-5 py-2 rounded-full mt-3"
            //       onClick={handleRequest}
            //     > 
            //       Retry
            //     </Button>
            //     )
            //   ) :(
            //     (
            //       <Button
            //       className=" bg-black text-white px-5 py-2 rounded-full mt-3"
            //       onClick={handleRequest}
            //     > 
            //       Request to send message
            //     </Button>
            //     )
            //   )
            //  }
            // </div>
            // )
          }
          
       
        
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default messageSheet;
