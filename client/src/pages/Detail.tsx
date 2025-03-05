import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { IoShareOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { LuDot } from "react-icons/lu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AiOutlineComment } from "react-icons/ai";
import { SlLike } from "react-icons/sl";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

function Detail() {
  const [isLoading,setIsLoading] = useState(false)
  const { id } = useParams();
  return (
    <div className=" max-w-3xl  mx-auto mt-6">
{
  isLoading ? (<div>
      <div className="flex flex-col  space-y-6  mt-6">
              <div className="">
              <div className=" mt-2 space-y-2 text-gray-500 text-[14px] line-clamp-2 font-[400]">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-[50%]" />
                    </div>
                <div className="flex gap-2 mt-4 items-center">
                  <Skeleton className="h-10 w-10 rounded-full" />
                 <div className=" space-y-2">
                 <Skeleton className="h-2 w-[200px]" />
                 <Skeleton className="h-2 w-[200px]" />
                 </div>
                </div>
               
              </div>
              <div className="flex w-full flex-col gap-6 mt-1">
                  <div className="">
                    <div className=" text-xl mt-2 w-full font-semibold line-clamp-2">
                      <Skeleton className="h-3 w-[200px]" />
                    </div>
                  </div>

                  <div className=" space-y-2">
                 <Skeleton className="h-2 w-full" />
                 <Skeleton className="h-2 w-full" />
                 </div>
                </div>
              <div className=" w-full">
              <Skeleton className="h-[300px] w-full rounded-xl" />
              </div>
            </div>
  </div>) : (
    <div>
    <div className=" text-3xl font-semibold ">
      Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
    </div>
    <div className="flex gap-3 mt-4 items-center">
      <img
        src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
        alt=""
        className="rounded-full  w-12 h-12"
      />
      <div className=" gap-0 text-[12px]">
        <div className=" flex items-center gap-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                variant="link"
                className=" font-[400] ps-0 text-[14px]"
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
          <div className=" text-green-600 text-sm">Follow</div>
        </div>
        <div className=" -mt-1 flex items-center gap-1 font-[300] text-gray-500 text-[13px]">
          <div>
            Published in{" "}
            <Link to={"/category"} className=" underline">
              Javascript
            </Link>
          </div>
          <span>
            <LuDot />
          </span>
          <div>7 mins</div>
          <span>
            <LuDot />
          </span>
          <div>Sep 26, 2024</div>
        </div>
      </div>
    </div>

    <div className=" mt-6 flex items-center py-3 justify-between border-b border-gray-100 border-t">
      <div className=" flex items-center gap-5">
        <div className="flex gap-2 items-center opacity-60">
          <SlLike className=" text-[16px] cursor-pointer" />
          <div className=" text-[14px]  ">1.2k</div>
        </div>
        <div className="flex gap-2 items-center opacity-60 cursor-pointer">
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
        <IoShareOutline className=" text-[24px] opacity-70 cursor-pointer" />
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

    <div className=" mt-8 flex flex-col gap-5">
      <div className=" font-[500] text-2xl ">1️⃣ Supabase</div>
      <div className=" text-[16px] text-md  text-gray-600 font-[400] leading-6.5">
        🔥 An open-source alternative to Firebase, Supabase offers a
        full-fledged PostgreSQL database, real-time subscriptions,
        authentication, and storage — all in one package. If you’re looking
        to build scalable web apps, this is a must-have!
      </div>
      <img
        src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9mo17KhCjbNLV6F5vYwVbQ.png"
        alt=""
      />
      <div className=" font-[500] text-2xl ">1️⃣ Supabase</div>
      <div className=" text-md  text-gray-600 font-[400] leading-6.5">
        🔥 An open-source alternative to Firebase, Supabase offers a
        full-fledged PostgreSQL database, real-time subscriptions,
        authentication, and storage — all in one package. If you’re looking
        to build scalable web apps, this is a must-have!
      </div>
      <img
        src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9mo17KhCjbNLV6F5vYwVbQ.png"
        alt=""
      />
      <div className=" font-[500] text-2xl ">1️⃣ Supabase</div>
      <div className=" text-[16px] text-md  text-gray-600 font-[400] leading-6.5">
        🔥 An open-source alternative to Firebase, Supabase offers a
        full-fledged PostgreSQL database, real-time subscriptions,
        authentication, and storage — all in one package. If you’re looking
        to build scalable web apps, this is a must-have!
      </div>
      <img
        src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9mo17KhCjbNLV6F5vYwVbQ.png"
        alt=""
      />
      <div className=" font-[500] text-2xl ">1️⃣ Supabase</div>
      <div className=" text-md  text-gray-600 font-[400] leading-6.5">
        🔥 An open-source alternative to Firebase, Supabase offers a
        full-fledged PostgreSQL database, real-time subscriptions,
        authentication, and storage — all in one package. If you’re looking
        to build scalable web apps, this is a must-have!
      </div>
      <img
        src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9mo17KhCjbNLV6F5vYwVbQ.png"
        alt=""
      />
    </div>
    <div className=" w-full h-[1px] bg-gray-200 my-8"></div>

    <div className="">
      <div className=" w-full flex items-center justify-between">
        <div className=" text-xl font-[450]">Response (6)</div>
        <div className="border p-2 px-4 rounded-md text-[14px]">SignUp</div>
      </div>

      <div className=" my-4  border-b pb-6">
        <Textarea placeholder="Write comment" rows={8} />
        <div className=" flex items-center mt-4 gap-2 justify-end">
          <Button variant="outline">Cancel</Button>
          <Button>Response</Button>
        </div>
      </div>

      <div>
        <div className=" border-b py-6 pt-3">
          <div className=" mt-4 flex items-center  justify-between">
            <div className="flex gap-3  items-center">
              <img
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
                alt=""
                className="rounded-full w-8 h-8"
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
                <div className=" -mt-2 flex items-center gap-1 font-[300] text-gray-500 text-[12px]">
                  <div>Sep 26, 2024</div>
                </div>
              </div>
            </div>
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

          <div className=" my-4 text-[14px] opacity-75">
            Really unique, You have written masterpiece
          </div>

          <div className=" flex items-center gap-5">
            <div className="flex gap-2 items-center opacity-60">
              <SlLike className=" text-[16px] cursor-pointer" />
              <div className=" text-[14px]  ">1.2k</div>
            </div>
            <div className="flex gap-2 items-center opacity-60 cursor-pointer">
              <AiOutlineComment className=" text-[20px]" />
              <div className=" text-[14px]">1.2k</div>
            </div>
            <div className=" text-[14px] opacity-60 underline">Reply</div>
          </div>
        </div>
        <div className=" border-b py-6 pt-3">
          <div className=" mt-4 flex items-center justify-between">
            <div className="flex gap-3  items-center">
              <img
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
                alt=""
                className="rounded-full w-8 h-8"
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
                <div className=" -mt-2 flex items-center gap-1 font-[300] text-gray-500 text-[12px]">
                  <div>Sep 26, 2024</div>
                </div>
              </div>
            </div>
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

          <div className=" my-4 text-[14px] opacity-75">
            Really unique, You have written masterpiece
          </div>

          <div className=" flex items-center gap-5">
            <div className="flex gap-2 items-center opacity-60">
              <SlLike className=" text-[16px] cursor-pointer" />
              <div className=" text-[14px]  ">1.2k</div>
            </div>
            <div className="flex gap-2 items-center opacity-60 cursor-pointer">
              <AiOutlineComment className=" text-[20px]" />
              <div className=" text-[14px]">1.2k</div>
            </div>
            <div className=" text-[14px] opacity-60 underline">Reply</div>
          </div>
        </div>

        <div className=" border-b py-6 pt-3">
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-3   items-center">
              <img
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
                alt=""
                className="rounded-full w-8 h-8"
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
                <div className=" -mt-2 flex items-center gap-1 font-[300] text-gray-500 text-[12px]">
                  <div>Sep 26, 2024</div>
                </div>
              </div>
            </div>
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

          <div className=" my-4 text-[14px] opacity-75">
            Really unique, You have written masterpiece
          </div>

          <div className=" flex items-center gap-5">
            <div className="flex gap-2 items-center opacity-60">
              <SlLike className=" text-[16px] cursor-pointer" />
              <div className=" text-[14px]  ">1.2k</div>
            </div>
            <div className="flex gap-2 items-center opacity-60 cursor-pointer">
              <AiOutlineComment className=" text-[20px]" />
              <div className=" text-[14px]">1.2k</div>
            </div>
            <div className=" text-[14px] opacity-60 underline">Reply</div>
          </div>
        </div>
        <div className="  px-4 py-2 cursor-pointer text-[14px] rounded-full mt-6 border inline-block border-black ">
          See All Responses
        </div>
      </div>
    </div>
    <div className=" w-full h-[1px] bg-gray-200 my-8"></div>

    <div className="pb-10">
      <div className=" text-xl font-[400]">
        More from Let's Code Future and Let’s Code Future
      </div>

      <div className=" mt-6 grid grid-cols-2 gap-6">
        <div className=" ">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9mo17KhCjbNLV6F5vYwVbQ.png"
            alt=""
            className="w-full"
          />
          <div className="flex gap-2 mt-2 items-center">
            <img
              src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
              alt=""
              className="rounded-full w-6 h-6"
            />
            <div className=" text-[12px]  text-gray-50">
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
          <div className=" text-xl font-semibold line-clamp-2">
            {" "}
            Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
          </div>
          <div className=" mt-2 text-gray-500 text-[14px] line-clamp-2 font-[400]">
            Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
            Hey, developers! 👋Sachin here with an exciting list of top
            Next.js open-source projects that you should check out. Whether
            you’re building…
          </div>
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
        <div className=" ">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9mo17KhCjbNLV6F5vYwVbQ.png"
            alt=""
            className="w-full"
          />
          <div className="flex gap-2 mt-2 items-center">
            <img
              src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
              alt=""
              className="rounded-full w-6 h-6"
            />
            <div className=" text-[12px]  text-gray-50">
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
          <div className=" text-xl font-semibold line-clamp-2">
            {" "}
            Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
          </div>
          <div className=" mt-2 text-gray-500 text-[14px] line-clamp-2 font-[400]">
            Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
            Hey, developers! 👋Sachin here with an exciting list of top
            Next.js open-source projects that you should check out. Whether
            you’re building…
          </div>
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
        <div className=" ">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9mo17KhCjbNLV6F5vYwVbQ.png"
            alt=""
            className="w-full"
          />
          <div className="flex gap-2 mt-2 items-center">
            <img
              src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
              alt=""
              className="rounded-full w-6 h-6"
            />
            <div className=" text-[12px]  text-gray-50">
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
          <div className=" text-xl font-semibold line-clamp-2">
            {" "}
            Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
          </div>
          <div className=" mt-2 text-gray-500 text-[14px] line-clamp-2 font-[400]">
            Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
            Hey, developers! 👋Sachin here with an exciting list of top
            Next.js open-source projects that you should check out. Whether
            you’re building…
          </div>
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

        <div className=" ">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9mo17KhCjbNLV6F5vYwVbQ.png"
            alt=""
            className="w-full"
          />
          <div className="flex gap-2 mt-2 items-center">
            <img
              src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
              alt=""
              className="rounded-full w-6 h-6"
            />
            <div className=" text-[12px]  text-gray-50">
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
          <div className=" text-xl font-semibold line-clamp-2">
            {" "}
            Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
          </div>
          <div className=" mt-2 text-gray-500 text-[14px] line-clamp-2 font-[400]">
            Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
            Hey, developers! 👋Sachin here with an exciting list of top
            Next.js open-source projects that you should check out. Whether
            you’re building…
          </div>
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
      </div>
    </div>

    <div className=" w-full h-[1px] bg-gray-200 my-8"></div>

    <div className="pb-10">
      <div className=" text-xl font-[400]">Recommended from CodeBase</div>

      <div className=" mt-6 grid grid-cols-2 gap-6">
        <div className=" ">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9mo17KhCjbNLV6F5vYwVbQ.png"
            alt=""
            className="w-full"
          />
          <div className="flex gap-2 mt-2 items-center">
            <img
              src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
              alt=""
              className="rounded-full w-6 h-6"
            />
            <div className=" text-[12px]  text-gray-50">
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
          <div className=" text-xl font-semibold line-clamp-2">
            {" "}
            Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
          </div>
          <div className=" mt-2 text-gray-500 text-[14px] line-clamp-2 font-[400]">
            Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
            Hey, developers! 👋Sachin here with an exciting list of top
            Next.js open-source projects that you should check out. Whether
            you’re building…
          </div>
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
        <div className=" ">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9mo17KhCjbNLV6F5vYwVbQ.png"
            alt=""
            className="w-full"
          />
          <div className="flex gap-2 mt-2 items-center">
            <img
              src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
              alt=""
              className="rounded-full w-6 h-6"
            />
            <div className=" text-[12px]  text-gray-50">
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
          <div className=" text-xl font-semibold line-clamp-2">
            {" "}
            Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
          </div>
          <div className=" mt-2 text-gray-500 text-[14px] line-clamp-2 font-[400]">
            Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
            Hey, developers! 👋Sachin here with an exciting list of top
            Next.js open-source projects that you should check out. Whether
            you’re building…
          </div>
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
        <div className=" ">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9mo17KhCjbNLV6F5vYwVbQ.png"
            alt=""
            className="w-full"
          />
          <div className="flex gap-2 mt-2 items-center">
            <img
              src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
              alt=""
              className="rounded-full w-6 h-6"
            />
            <div className=" text-[12px]  text-gray-50">
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
          <div className=" text-xl font-semibold line-clamp-2">
            {" "}
            Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
          </div>
          <div className=" mt-2 text-gray-500 text-[14px] line-clamp-2 font-[400]">
            Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
            Hey, developers! 👋Sachin here with an exciting list of top
            Next.js open-source projects that you should check out. Whether
            you’re building…
          </div>
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

        <div className=" ">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9mo17KhCjbNLV6F5vYwVbQ.png"
            alt=""
            className="w-full"
          />
          <div className="flex gap-2 mt-2 items-center">
            <img
              src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
              alt=""
              className="rounded-full w-6 h-6"
            />
            <div className=" text-[12px]  text-gray-50">
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
          <div className=" text-xl font-semibold line-clamp-2">
            {" "}
            Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
          </div>
          <div className=" mt-2 text-gray-500 text-[14px] line-clamp-2 font-[400]">
            Top 13 Next.js Open Source Projects with Most GitHub Stars⭐
            Hey, developers! 👋Sachin here with an exciting list of top
            Next.js open-source projects that you should check out. Whether
            you’re building…
          </div>
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
      </div>
    </div>
  </div>
 
  )
}

   </div>  
    
  );
}

export default Detail;
