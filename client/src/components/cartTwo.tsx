import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
 
import "react-lazy-load-image-component/src/effects/blur.css";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import numeral from "numeral";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { SlLike } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";
 
 
import { LazyLoadImage } from "react-lazy-load-image-component";
import { token_descrypt } from "@/Services/Decrypt";
import { IoMdBookmark } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import moment from "moment";
 
import { Link } from "react-router-dom";
import { useStore } from "@/store";
 
const encryptedToken = localStorage.getItem("access_token");
const userId = (token_descrypt(encryptedToken) as { id: string })?.id;
 
interface postProp {
  favs:any;
    handleBookmark: any;
    handleLike: any;
    _id: string;
    commentsCount: number;
    title: string;
    description: string;
    slug: string;
    cover_image: string;
    likes: string[];
    createdAt : Date;
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
      
      favs?: string[];
  }
}
function CardTwo( post:postProp,) {
  // const queryClient = useQueryClient();
    
   const favourites = useStore((state) => state.favourites);
     const addToFavourites = useStore((state) => state.addToFavourite);
   const likeFunction = post?.handleLike;
   
   
    
 
  return (
    <div className=" ">
        <Link to={"/detail/" + post?.slug}>
       <LazyLoadImage
                    alt={"Not found"}
                    effect="blur"
                   
                    src={post?.cover_image}  
                  className="w-full h-[200px] object-cover rounded-md"
                    wrapperProps={{
                      // If you need to, you can tweak the effect transition using the wrapper style.
                      style: {transitionDelay: "1s"},
                  }}
                  />
                  </Link>
      {/* <img src={post?.cover_image} alt="" className="w-full" /> */}
      <div className="flex gap-2 mt-2 items-center">
        <img
          src={post?.author_id?.profile}
          alt=""
          className="rounded-full w-6 h-6"
        />
        <div className=" text-[12px]  text-gray-50">
          <HoverCard>
            <HoverCardTrigger asChild>
                <Link to={"/profile/@" + post?.author_id?.username}>
              <Button variant="link" className=" font-light ps-0 text-[13px]">
                {post?.author_id?.name !== null ? (
                  <p className=" capitalize">{post?.author_id?.name}</p>
                ) : (
                  <p className=" capitalize">{post?.author_id?.username}</p>
                )}
              </Button>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <div className=" flex items-center gap-4">
                    <img
                      src={post?.author_id?.profile}
                      alt=""
                      className="rounded-full w-10 h-10"
                    />
                  <div className=" flex items-center justify-between  w-60">
                  <div >
                      <div className=" font-light ps-0 text-[13px]">
                        {post?.author_id?.name !== null ? (
                          <p className=" capitalize">{post?.author_id?.name}</p>
                        ) : (
                          <p className=" capitalize">{post?.author_id?.username}</p>
                        )}
                      </div>
                      <div className=" font-light ps-0 text-[13px]">
                        
                          <p className=" capitalize">{post?.author_id?.followers?.length} Followers</p>
                        
                      </div>
                    </div>
                  
                  </div>

                  </div>
                  <p className="text-sm mt-2">
                   {post?.author_id?.bio}
                  </p>
                  <div className="flex items-center pt-2">
                    <span className="text-xs text-muted-foreground">
                    {
                  moment(post?.author_id?.createdAt).format('LL')
                  }
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      <Link to={"/detail/" + post?.slug}>
      <div className=" text-xl font-semibold line-clamp-2">{post?.title}</div>
      </Link>
      <div className=" mt-2 text-gray-500 text-[14px] line-clamp-2 font-[400]">
        {post?.description}
      </div>
      <div className=" mt-5 flex items-center justify-between">
        <div className=" flex items-center gap-5">
          <div className=" text-[13px] opacity-70 cursor-pointer">
             {moment(post?.createdAt).format("MMM D")}
          </div>
          <div className="flex gap-2 items-center opacity-70">
            <SlLike
                             className=" text-[16px] cursor-pointer  "
                             color={post?.likes?.includes(userId) ? "red" : "black"}
                             onClick={() => likeFunction(userId, post?._id)}
                           />
            <div className=" text-[14px]  ">
              {post?.likes?.length < 1000
                ? numeral(post?.likes?.length).format("0a")
                : numeral(post?.likes?.length).format("0.0a")}
            </div>
          </div>
          <div className="flex gap-2 items-center opacity-70 cursor-pointer">
            <AiOutlineComment className=" text-[20px]" />
            <div className=" text-[14px]">{post?.commentsCount}</div>
          </div>
        </div>
        <div className=" flex items-center gap-5">
           <div className=" flex ">
                         {favourites.includes(post?._id) ? (
                           <IoMdBookmark
                             size={23}
                             className=" mt-[2px] cursor-pointer"
                             onClick={() => addToFavourites({ id: post?._id })}
                           />
                         ) : (
                           <CiBookmark
                             size={23}
                             className=" mt-[2px] cursor-pointer"
                             onClick={() => addToFavourites({ id: post?._id })}
                           />
                         )}
                       </div>
          <Popover>
            <PopoverTrigger className=" mb-0">
              {" "}
              <HiOutlineDotsCircleHorizontal className=" text-[22px] opacity-70 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CardTwo);
