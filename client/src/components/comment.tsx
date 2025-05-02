import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import React, { use, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { HoverCardContent } from "./ui/hover-card";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { PopoverTrigger } from "./ui/popover";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { SlLike } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";
import moment from "moment";
import Reply from "./reply";
import { Textarea } from "./ui/textarea";
import api from "@/api/axios";
import { token_descrypt } from "@/Services/Decrypt";
import { toast } from "sonner";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import RepliesContainer from "./repliesContainer";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { APP_URL } from "@/Config";

interface commentProp {
  _id: string;
  post_id: string;
  author_id: string;
  comment: string;
  likes: String;
  createdAt: string;
  updatedAt: string;
  replies: string[];
  handleCommentLike: (commentId: string) => void;
}

function Comment({
  _id,
  post_id,
  author_id,
  comment,
  likes,
  replies,
  createdAt,
  updatedAt,
  handleCommentLike
}: commentProp) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const encryptedToken = localStorage.getItem("access_token");
  const [isReplyLoading, setIsReplyLoading] = useState(false);
  const userId = (token_descrypt(encryptedToken) as { id: string })?.id;
  const [reply, setReply] = useState("");
  const naviage = useNavigate();
  const queryClient=useQueryClient();
  const[data,setData] = useState<any>(null)

  const handleReply = async ({
    post_id,
    author_id,
    comment_id,
    reply,
  }: {
    post_id: string;
    author_id: string;
    comment_id: string;
    reply: string;
  }) => {
   
    if (!userId) {
      toast.error("Please login to reply");
      naviage("/login");
      return;
    }
    setIsReplyLoading(true);
     if(!userId){
      
     }
    try {
      if (!reply) {
        toast.error("Please enter a reply");
        setIsReplyLoading(false);
        return;
      }
     
      const response = await api.post(`/posts/add-reply`, {
        author_id,
        comment_id,
        post_id,
        reply,
      });

      if (response.status !== 201) {
        toast.error("Error adding reply");
      }

    
      

      queryClient.setQueryData(["replies",_id], (old: any) => {
        return [
          ...old,
          response.data.data
        ];
      });



      setReply("");
      setIsOpen(false);
      setIsReplyLoading(false);
    
    } catch (error) {}
  };
  useEffect(()=>{
fetchUserData()
  },[author_id])
  const fetchUserData = async () => {
    try {
      const response = await api.get(
        "/auth/get-user?author_id=" + author_id
      );
      setData(response?.data?.data?.user);
      // return response?.data?.data?.user?.user || null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["profileData", author_id],
  //   queryFn: () => fetchUserData(author_id),
  // });

  
 
  return (
    <div className=" border-b py-6 pt-3  relative">
      {/* <div className=" w-[15px] h-[100%] border-s border-t border-b top-12 absolute  -left-[12px]"></div> */}
      <div className=" mt-4 flex items-center  justify-between">
        <div className="flex gap-3  items-center">
          <LazyLoadImage
            alt={"not found"}
            effect="blur"
         className="rounded-full w-8 h-8 object-cover"
            src={
              data?.profile ||
              "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
            }
          />
          {/* <img
            src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
            alt=""
            className="rounded-full w-8 h-8"
          /> */}
          <div className=" gap-0 text-[12px]">
            <div className=" flex items-center gap-2">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant="link"
                    className=" -mt-2 font-[300] ps-0 text-[12px]"
                  >
                    {" "}
                  {data?.name || data?.username}
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">@nextjs</h4>
                      <p className="text-sm">
                        The React Framework – created and maintained by @vercel.
                      </p>
                      <div className="flex items-center pt-2">
                        <span className="text-xs text-muted-foreground">
                          Joined December 2021
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <div className=" -mt-2 flex items-center gap-1 font-[300] text-gray-500 text-[12px]">
              <div>{moment(createdAt).format("ll")}</div>
            </div>
          </div>
        </div>
        <Popover>
          <PopoverTrigger className=" mb-0">
            {" "}
            <HiOutlineDotsHorizontal className=" text-[22px] opacity-70 cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
      </div>

      <div className=" my-4 text-[14px] opacity-75">{comment}</div>

      <div className=" flex items-center gap-5">
        <div className="flex gap-2 items-center opacity-60">
          <SlLike
                           className=" text-[16px] cursor-pointer  "
                           color={likes?.includes(userId) ? "red" : "black"}
                           onClick={() => handleCommentLike(_id)}
                         />
          <div className=" text-[14px]  " >{likes.length}</div>
        </div>
       
        <div
          className=" text-[14px] opacity-60 underline cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          Reply
        </div>
      </div>

      {isOpen && (
        <div className=" flex  gap-2 flex-wrap justify-end items-center mt-6">
          <Textarea
            onChange={(e) => setReply(e.target.value)}
            className=" border w-full border-gray-200 p-2 px-3 rounded-md text-[12px]"
            placeholder={`Reply to ${data?.username}`}
            value={reply}
          />
          <Button
            size={"lg"}
            onClick={() =>
              handleReply({
                post_id,
                author_id: userId,
                comment_id: _id,
                reply,
              })
            }
            disabled={isReplyLoading}
          >
         {
          isReplyLoading ? "Replying..." : "Reply"
         }
          </Button>
        </div>
      )}
    
    <RepliesContainer commentId={_id} />
    
    </div>
  );
}

export default Comment;
