import React from "react";
import { SlLike } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
function card() {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      {isLoading ? (
        <div className="flex flex-row items-center mt-6">
          <div className=" w-[75%]">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-2 w-[200px]" />
            </div>
            <div className="flex w-full justify-between gap-2 mt-1">
              <div className="">
                <div className=" text-xl mt-2 w-full font-semibold line-clamp-2">
                  <Skeleton className="h-3" />
                </div>
                <div className=" mt-2 space-y-1 text-gray-500 text-[14px] line-clamp-2 font-[400]">
                  <Skeleton className="h-2 w-[400px]" />
                  <Skeleton className="h-2 w-[400px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[20%]">
          <Skeleton className="h-[125px] w-[200px] rounded-xl" />
          </div>
        </div>
      ) : (
       
         <div className=" cursor-pointer p-5 pb-8 border-b border-gray-100 flex items-center justify-between">
          <div className=" w-[75%]">
            <div className="flex gap-2 items-center">
              <img
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
                alt=""
                className="rounded-full w-6 h-6"
              />
              <div className=" text-[12px] text-gray-50">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="link"
                      className=" font-light ps-0 text-[13px]"
                    >
                      {" "}
                      Let's Code Futures
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
            </div>
            <Link to={'/detail/3'}>
            <div className="flex  justify-between gap-2 mt-1">
              <div>
                <div className=" text-xl font-semibold line-clamp-2">
                  {" "}
                  Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
                </div>
                <div className=" mt-3  text-[14px] line-clamp-2 text-gray-600">
                  Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
                  Hey, developers! 👋Sachin here with an exciting list of top
                  Next.js open-source projects that you should check out.
                  Whether you’re building…
                </div>
              </div>
            </div>
            </Link>
            <div className=" mt-5 flex items-center justify-between">
              <div className=" flex items-center gap-5">
                <div className=" text-[13px] opacity-70 cursor-pointer">
                  Jan 6
                </div>
                <div className="flex gap-2 items-center opacity-70">
                  <SlLike className=" text-[16px] cursor-pointer" />
                  <div className=" text-[14px]  ">1.2k</div>
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
                  <PopoverContent>
                    Place content for the popover here.
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <div className=" w-[20%] bg-red-100  ">
          <Link to={'/detail/3'}>
            <img
              src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*yucldaSBIrb6O__D8KvywQ.png"
              className=" w-[200px] h-[100px] object-cover rounded-sm"
              alt=""
            />
            </Link>
          </div>
        </div>
        
       
      )}
    </>
  );
}

export default card;
