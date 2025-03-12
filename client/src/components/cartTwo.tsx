import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BsBlockquoteLeft } from "react-icons/bs";
import { BsBookmarks } from "react-icons/bs";
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
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
interface postProp {
  title: string;
  description: string;
  slug: string;
  cover_image: string;
  likes: [];
  author_id: string;
}
function CardTwo(post: postProp) {
  const fetchUser = async (id: string | undefined) => {
    try {
      const response = await api.get("/auth/get-user?author_id=" + id);

      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };
  const { error, data } = useQuery({
    queryKey: ["userData", post?.author_id],
    queryFn: () => fetchUser(post?.author_id),
  });

  return (
    <div className=" ">
      <img src={post?.cover_image} alt="" className="w-full" />
      <div className="flex gap-2 mt-2 items-center">
        <img
          src={data?.user?.profile}
          alt=""
          className="rounded-full w-6 h-6"
        />
        <div className=" text-[12px]  text-gray-50">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className=" font-light ps-0 text-[13px]">
                {data?.user.name !== null ? (
                  <p className=" capitalize">{data?.user.name}</p>
                ) : (
                  <p className=" capitalize">{data?.user?.username}</p>
                )}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <div className=" flex items-center gap-4">
                    <img
                      src={data?.user?.profile}
                      alt=""
                      className="rounded-full w-10 h-10"
                    />
                  <div className=" flex items-center justify-between  w-60">
                  <div >
                      <div className=" font-light ps-0 text-[13px]">
                        {data?.user.name !== null ? (
                          <p className=" capitalize">{data?.user.name}</p>
                        ) : (
                          <p className=" capitalize">{data?.user?.username}</p>
                        )}
                      </div>
                      <div className=" font-light ps-0 text-[13px]">
                        
                          <p className=" capitalize">{data?.user.followers.length} Followers</p>
                        
                      </div>
                    </div>
                    <Button className=" text-[12px] rounded-full" size={'sm'}>Follow</Button>
                  </div>

                  </div>
                  <p className="text-sm mt-2">
                   {data?.user?.bio}
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
      </div>
      <div className=" text-xl font-semibold line-clamp-2">{post?.title}</div>
      <div className=" mt-2 text-gray-500 text-[14px] line-clamp-2 font-[400]">
        {post?.description}
      </div>
      <div className=" mt-5 flex items-center justify-between">
        <div className=" flex items-center gap-5">
          <div className=" text-[13px] opacity-70 cursor-pointer">Jan 6</div>
          <div className="flex gap-2 items-center opacity-70">
            <SlLike className=" text-[16px] cursor-pointer" />
            <div className=" text-[14px]  ">
              {post?.likes?.length < 1000
                ? numeral(post?.likes.length).format("0a")
                : numeral(post?.likes.length).format("0.0a")}
            </div>
          </div>
          <div className="flex gap-2 items-center opacity-70 cursor-pointer">
            <AiOutlineComment className=" text-[20px]" />
            <div className=" text-[14px]">1.2k</div>
          </div>
        </div>
        <div className=" flex items-center gap-5">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              className="bk cursor-pointer"
            >
              <path
                fill="#000"
                d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4z"
              ></path>
            </svg>
          </div>
          {/* <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="aqd"><path fill="#000" d="M7.5 3.75a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-14a2 2 0 0 0-2-2z"></path></svg>
                </div> */}

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

export default CardTwo;
