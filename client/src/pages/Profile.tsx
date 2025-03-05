import { Button } from "@/components/ui/button";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card from "@/components/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BsBlockquoteLeft } from "react-icons/bs";
import { BsBookmarks } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AiOutlineComment } from "react-icons/ai";
import { SlLike } from "react-icons/sl";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import MessageSheet from "@/components/messageSheet";
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
 
function Profile() {
  return (
    <div className=" max-w-3xl  mx-auto pb-10">
      <div className=" mt-10 flex flex-col  space-y-3 items-center">
        <img
          src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
          alt=""
          className="rounded-full w-24 h-24"
        />
        <div className=" mt-3 text-2xl font-semibold">John Stone</div>
        <div className="text-gray-500 text-[14px] line-clamp-2 font-[400]">
          Hey, developers! 👋
        </div>

        <div className="flex h-5 items-center space-x-4 text-sm">
        <div className=" opacity-70">11k Following</div>
        <Separator orientation="vertical" />
        <div className="opacity-70">11k Follower</div>
        <Separator orientation="vertical" />
        <div className="opacity-70">111 Posts</div>
      </div>
        <div className=" mt-3 flex gap-2">
          <div className="  px-6 py-2 cursor-pointer text-[14px] rounded-full border inline-block border-black  hover:bg-black hover:text-white">
            Follow
          </div>

          <Dialog>
            <DialogTrigger>
              <div className="  px-6 py-2 cursor-pointer text-[14px] rounded-full border inline-block border-black  hover:bg-black hover:text-white">
                Edit Profile
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <MessageSheet/>
          
        </div>

        <div className="flex items-center mt-4">
          <div className="flex  items-center gap-2 px-12 py-3 border-b border-black cursor-pointer font-[400]">
          <BsBlockquoteLeft  className=" text-[24px] font-bold" /> <div>2 Posts</div>
          </div>
          <div className="flex items-center gap-2 px-12 py-3 border-b  opacity-70 cursor-pointer">
          <BsBookmarks className=" text-[20px] font-bold"  /><div>Favourites</div>
          </div>
          
        </div>

        <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
              Top 13 Next.js Open Source Projects with Most GitHub Stars⭐ Hey,
              developers! 👋Sachin here with an exciting list of top Next.js
              open-source projects that you should check out. Whether you’re
              building…
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
              Top 13 Next.js Open Source Projects with Most GitHub Stars⭐ Hey,
              developers! 👋Sachin here with an exciting list of top Next.js
              open-source projects that you should check out. Whether you’re
              building…
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
              Top 13 Next.js Open Source Projects with Most GitHub Stars⭐ Hey,
              developers! 👋Sachin here with an exciting list of top Next.js
              open-source projects that you should check out. Whether you’re
              building…
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
              Top 13 Next.js Open Source Projects with Most GitHub Stars⭐ Hey,
              developers! 👋Sachin here with an exciting list of top Next.js
              open-source projects that you should check out. Whether you’re
              building…
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

        <div className="  px-4 py-2 cursor-pointer text-[14px] rounded-full mt-6 border inline-block border-black ">
          See More Posts
        </div>
      </div>
    </div>
  );
}

export default Profile;
