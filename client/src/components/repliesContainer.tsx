import React, { useState } from 'react'
import Reply from './reply'
import api from '@/api/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from './ui/skeleton';
import { token_descrypt } from '@/Services/Decrypt';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface replyProps {
  commentId : string
  
  
}

function RepliesContainer({commentId }:replyProps) {
   const [isOpen, setIsOpen] = useState(false);
  const encryptedToken = localStorage.getItem("access_token");
     const queryClient=useQueryClient();
    const userId = (token_descrypt(encryptedToken) as { id: string })?.id;
    const fetchReply = async (comment_id: string  | undefined,) => {
      
        try {
          const response = await api.get(
            "/posts/get-replies?comment_id=" + comment_id
          );
        
          return response?.data?.data?.replies;
        } catch (error : unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("An unknown error occurred");
            }
        }
      };

   
    
      const { isLoading, error, data } = useQuery({
        queryKey: ["replies", commentId],
        queryFn: () => fetchReply(commentId),
      });
     
      const handleReplyLike = async (replyId: string) => {
        if (!userId) {
          toast.error("Please login to like");
          navigate("/login");
          return;
        }
        try {
          const response = await api.put(`/posts/like-reply?userId=${userId}&replyId=${replyId}`);
          console.log(response?.data)
          return response?.data?.data;
        } catch (error) {}
      };
      const navigate = useNavigate();

      const replyLikeMutation = useMutation({
        mutationFn: (replyId: string) => handleReplyLike(replyId),
        onMutate: async (newTodo) => {
          if (!userId) {
            toast.error("Please login to like");
            navigate("/login");
            return;
          }
        
          const previousTodos = queryClient.getQueryData(["replies", commentId]);
          if(previousTodos){
            queryClient.setQueryData(["replies", commentId], (old: any) => {
              const updateReply = old?.map((reply: any) => {
                if (reply._id === newTodo) {
                  const updatedReply = reply?.likes?.includes(
                    userId
                  )
                    ? reply?.likes?.filter(
                        (uId: string) => uId !== userId
                      )
                    : [...reply?.likes, userId];
      
                  return {
                    ...reply,
                    likes: updatedReply,
                  };
                }
                return reply;
              });
              return updateReply;
            });


          }
          // queryClient.setQueryData(["replies", commentId], (old: any) => {
          //   const updateReply = old?.map((reply: any) => {
          //     if (reply._id === newTodo.replyId) {
          //       const updatedReply = reply?.likes?.includes(
          //         userId
          //       )
          //         ? reply?.likes?.filter(
          //             (uId: string) => uId !== userId
          //           )
          //         : [...reply?.likes, userId];
    
          //       return {
          //         ...reply,
          //         likes: updatedReply,
          //       };
          //     }
          //     return reply;
          //   });
          //   return updateReply;
          // });
          
           
        
          return { previousTodos };
        },
        onError: (err) => {
          console.log(err);
        },
        onSuccess: () => {
          console.log("Comment liked successfully");
        },
      });
      const handleReplyLikeUpdate = async (replyId: string) => {
        // if (!userId) {
        //   toast.error("Please login to like");
        //   navigate("/login");
        //   return;
        // }
     
        
        replyLikeMutation.mutate(replyId);
      };

      if(!isOpen){
        return data?.length > 0 && (<p onClick={()=>setIsOpen(true)} className=' mt-3 ms-4 text-[14px] cursor-pointer text-blue-500'>View {data.length} replies</p>)  
      }
    
       

      if(isLoading){
        return <div>
            <div className="flex  mt-5 ms-5 items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-[450px]" />
          <Skeleton className="h-3 w-[400px]" />
        </div>
      </div>
      <div className="flex  mt-5 ms-5 items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-[450px]" />
          <Skeleton className="h-3 w-[400px]" />
        </div>
      </div>
        </div>
      }

      
     
  return (
    <div className="">
          
        {
            data?.length >0 ? (
                <div className="flex flex-col">
                    {
                        data.map((reply:any) => (
                            <Reply
                            handleReplyLike={handleReplyLikeUpdate}
                            {...reply}
                                key={reply._id}
                               isLast={data[data.length - 1]._id === reply._id}

                            />
                        ))
                    }
                </div>
            ) : (
                <div className=" text-gray-500 text-[14px] mt-3 ms-3">
                    No replies yet!
                </div>
            )
        }
        </div>
  )
}

export default RepliesContainer