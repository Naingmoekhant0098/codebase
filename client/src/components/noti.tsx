import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/api/axios";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { token_descrypt } from "@/Services/Decrypt";

function Noti({ userId, status }: { userId: string; status: string }) {
  const [data, setData] = React.useState<any>(null);
  
   const encryptedToken = localStorage.getItem("access_token");
      const userIdd = (token_descrypt(encryptedToken) as { id: string })?.id;
      const username = (token_descrypt(encryptedToken) as { id: string,username:string })?.username;
    
const queryClient =useQueryClient();
  useEffect(() => {
    fetchUserData();
  }, [userId]);


 

  const fetchUserData = async () => {
    try {
      const response = await api.get("/auth/get-user?author_id=" + userId);
      setData(response?.data?.data?.user);
      // return response?.data?.data?.user?.user || null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  const handleAcceptedCall=async(userId:string,status:string)=>{
    try {
      const response = await api.put(
        "/auth/accept-request?userId="+userId+"&status="+status+"&acceptedBy="+userIdd
      );
    
      console.log(response.data);
     
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
 
  const handleAcceptMutation = useMutation({
    mutationFn : ({ userId, status }: { userId: string; status: string }) =>
      handleAcceptedCall(userId, status),
    onMutate: async (newTodo) => {
        
       
        const previousTodos = queryClient.getQueryData(["profileData", username?.replace("@", "")]);
            
            if (previousTodos) {
                  queryClient.setQueryData(["profileData", username?.replace("@", "")], (old: any) => {
                   
                    const updatedRequest = old?.user?.requestedUserList.map((item: any) => {
                        
                        if (item.userId == newTodo.userId) {
                            
                            return {
                            ...item,
                            status: newTodo.status,
                            };
                      
                        }
                        return item;
                    })

                   
                    return {
                      ...old,
                      user : {
                        ...old.user,
                        requestedUserList: updatedRequest,
                        
                      }
                    };
                  });
                }
          
                return { previousTodos };
       
       },
    onError: (err) => {
        console.log(err);
      },
      onSuccess: () => {
        console.log("Saved successfully");
      },
  });

  

  const handleSubmit=async (
    userId: string,
    status: string
  ) => {
    console.log(userId, status);
    handleAcceptMutation.mutate({userId,status})
  }
  return (
    <DropdownMenuItem className=" text-[14px] flex items-start gap-2">
      <img
        src={data?.profile}
        className=" w-10 h-10 mt-1 object-cover rounded-full"
        alt=""
      />
      <div>
        <div>{data?.username}</div>
        <span className=" text-[12px] text-gray-500">
          Sent you a message request
        </span>
        {data?.status === "pending" && (
          <div className=" mt-2 flex justify-end gap-2">
            <Button
              size={"sm"}
              variant={"outline"}
              className=" border-green-400 text-green-400"
              onClick={()=>handleSubmit(userId,'accepted')}
            >
              Accept
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              className="border-red-400 text-red-500"
              onClick={()=>handleSubmit(userId,'rejected')}
            >
              Reject
            </Button>
          </div>
        )}
      </div>
    </DropdownMenuItem>
  );
}

export default Noti;
