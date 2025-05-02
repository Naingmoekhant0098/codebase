import { HoverCard, HoverCardTrigger } from '@radix-ui/react-hover-card';
import  { useState } from 'react'
import { Button } from './ui/button';
import { HoverCardContent } from './ui/hover-card';
import { Popover, PopoverContent } from '@radix-ui/react-popover';
import { PopoverTrigger } from './ui/popover';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { SlLike } from 'react-icons/sl';
 
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Textarea } from './ui/textarea';
import { token_descrypt } from '@/Services/Decrypt';
import { toast } from 'sonner';
import api from '@/api/axios';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface commentProp {
  _id: string;
  post_id: string;
  author_id: {
    profile: string;
    username: string;
    name?: string | null;
    bio?: string;
    _id: string;
    followers?: string[];
    favourites?:string[];
    createdAt: Date;
    handleLike: (userId: string, postId: string) => void;
    handleBookmark : (userId: string, postId: string) => void;
    updatedAt: Date;
  };
  isLast : Boolean,
  comment_id: string;
  reply : string;
    likes: String;
  createdAt: string;
  updatedAt: string;
  handleReply: (post_id: string,author_id :string, comment_id: string,reply:string) => void;
  handleReplyLike : (replyId:string)=>void;
  
}
  
function Reply({
  _id,
  post_id,
  author_id,
  comment_id,
  reply,
 isLast,
  likes,
handleReplyLike,
  createdAt,
 

}: commentProp) {
 
    const [isOpen, setIsOpen] = useState(false);
    const[isReplyLoading, setIsReplyLoading] = useState(false);
    const [replyText, setReply] = useState("");
    const encryptedToken = localStorage.getItem("access_token");
    const queryClient=useQueryClient();
   const userId = (token_descrypt(encryptedToken) as { id: string })?.id;
   const navigate = useNavigate();
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
    setIsReplyLoading(true);
     if (!userId) {
          toast.error("Please login to reply");
          navigate("/login");
          return;
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


      queryClient.setQueryData(["replies",comment_id], (old: any) => {
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
  
 
  return (
    <div className={`py-3  ms-18 ${isLast ? "border-b-0" : "border-b border-gray-200"}`}>
    <div className=" mt-4 flex items-center  justify-between">
      <div className="flex gap-3  items-center">
        <LazyLoadImage
                   alt={"not found"}
                   effect="blur"
                className="rounded-full w-8 h-8 object-cover"
                   src={
                     author_id?.profile ||
                     "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
                   }
                 />
        <div className=" gap-0 text-[12px]">
          <div className=" flex items-center gap-2">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  variant="link"
                  className=" font-[300] ps-0 text-[12px]"
                >
                  {" "}
                 {author_id?.name || author_id?.username}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@nextjs</h4>
                    <p className="text-sm">
                      The React Framework – created and maintained by
                      @vercel.
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
        <PopoverContent>
          Place content for the popover here.
        </PopoverContent>
      </Popover>
    </div>

    <div className=" my-3 text-[14px] opacity-75">
     {reply}
    </div>

    <div className=" flex items-center gap-5">
      <div className="flex gap-2 items-center opacity-60">
        <SlLike
                                  className=" text-[16px] cursor-pointer  "
                                  color={likes?.includes(userId) ? "red" : "black"}
                                  onClick={() => handleReplyLike(_id)}
                                />
        <div className=" text-[14px]  ">{likes?.length}</div>
      </div>
      {/* <div className="flex gap-2 items-center opacity-60 cursor-pointer">
        <AiOutlineComment className=" text-[20px]" />
        <div className=" text-[14px]">1.2k</div>
      </div> */}
      <div className=" text-[14px] opacity-60 underline cursor-pointer" onClick={()=>setIsOpen(!isOpen)}>Reply</div>

    </div>

    {isOpen && (
        <div className=" flex  gap-2 flex-wrap justify-end items-center mt-6">
          <Textarea
            onChange={(e) => setReply(e.target.value)}
            className=" border w-full border-gray-200 p-2 px-3 rounded-md text-[12px]"
            placeholder={`Reply to ${author_id?.username}`}
            value={replyText}
          />
          <Button
            size={"lg"}
            onClick={() =>
              handleReply({
                post_id,
                author_id: userId,
                comment_id,
                reply: replyText
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
  </div>
  )
}

export default Reply