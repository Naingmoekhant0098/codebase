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
import { Separator } from "@/components/ui/separator";
import moment from "moment";
import { Link, Navigate } from "react-router-dom";
import api from "@/api/axios";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { token_descrypt } from "@/Services/Decrypt";
import { CiBookmark } from "react-icons/ci";

import { IoMdBookmark } from "react-icons/io";
import { toast } from "sonner";
import { LazyLoadImage } from "react-lazy-load-image-component";
const encryptedToken = localStorage.getItem("access_token");

const userId = (token_descrypt(encryptedToken) as { id: string })?.id;
interface postProp {
  _id: string;
  author_id: {
    profile: string;
    username: string;
    name?: string | null;
    bio?: string;
    _id: string;
    followers?: string[];
    favourites?: string[];
    createdAt: Date;
  };
  category: string;

  cover_image: string;

  description: string;

  favauritedUserLists: [];

  likes: string[];

  short_description: string;
  slug: string;

  title: string;
  createdAt: Date;
}

function Card({
  _id,
  title,
  category,
  cover_image,
  slug,
  short_description,
  author_id,
  likes,
  createdAt,
}: postProp) {
  const queryClient = useQueryClient();
  const username = (
    token_descrypt(encryptedToken) as { id: string; username: string }
  )?.username;
 
  const data = queryClient.getQueryData<{ user: { favourites: string[] } }>(["profileData", username]);
 
  const handleFollowUpdate = async (
    userId: string,
    followedUserId: string,
    postId: string
  ) => {
    try {
      const response = await api.put(
        `/auth/follow-user?userId=${userId}&followedUserId=${followedUserId}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const followMutation = useMutation({
    mutationFn: ({
      userId,
      followedUserId,
      postId,
    }: {
      userId: string;
      followedUserId: string;
      postId: string;
    }) => handleFollowUpdate(userId, followedUserId, postId),
    onMutate: async (newTodo) => {
      //console.log(newTodo)
      const previousTodos = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old: any) => {
        const updatedPosts = old?.posts?.map((post: any) => {
          if (post._id === newTodo.postId) {
            const updatedFollowers = post?.author_id?.followers?.includes(
              userId
            )
              ? post?.author_id?.followers?.filter(
                  (follower: string) => follower !== userId
                )
              : [...post?.author_id?.followers, userId];

            return {
              ...post,
              author_id: {
                ...post.author_id,
                followers: updatedFollowers,
              },
            };
          }
          return post;
        });
        return {
          ...old,
          posts: updatedPosts,
        };
      });

      return { previousTodos };
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log("Followed successfully");
      // queryClient.invalidateQueries({ queryKey: ["userData", author_id] });
    },
    onSettled: () => {
      //  queryClient.invalidateQueries({ queryKey: ["userData", author_id] });
    },
  });
  const handleSaveUpdate = async (userId: string, postId: string) => {
    try {
      const response = await api.put(
        `/posts/save-post?userId=${userId}&postId=${postId}`
      );

      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  };
  // const bookmarkMutation = useMutation({
  //   mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
  //     handleSaveUpdate(userId, postId),
  //   onMutate: async (newTodo) => {
  //     const previousTodos = queryClient.getQueryData(["posts"]);

  //     if (previousTodos) {
  //       queryClient.setQueryData(["posts"], (old: any) => {
  //         const updatedPosts = old?.posts?.map((post: any) => {
  //           if (post._id === newTodo.postId) {
  //             const updatedFollowers = post?.author_id?.favourites?.includes(
  //               newTodo.postId
  //             )
  //               ? post?.author_id?.favourites?.filter(
  //                   (pt: string) => pt !== newTodo.postId
  //                 )
  //               : [...post?.author_id?.favourites, newTodo.postId];
  //             const isSavedd = post?.author_id?.favourites?.includes(
  //               newTodo.postId
  //             );
  //             if (isSavedd) {
  //               toast.success("Post removed from bookmarks");
  //             } else {
  //               toast.success("Post saved to bookmarks");
  //             }
  //             return {
  //               ...post,
  //               author_id: {
  //                 ...post.author_id,
  //                 favourites: updatedFollowers,
  //               },
  //             };
  //           }

  //           return post;
  //         });
  //         return {
  //           ...old,
  //           posts: updatedPosts,
  //         };
  //       });
  //     }

  //     return { previousTodos };
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //   },
  //   onSuccess: () => {
  //     console.log("Saved successfully");
  //   },
  // });
  const bookmarkMutation = useMutation({
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
      handleSaveUpdate(userId, postId),
    onMutate: async (newTodo) => {
      const previousTodos = queryClient.getQueryData(["profileData", username]);
 
      if (previousTodos) {
        queryClient.setQueryData(["profileData", username], (old: any) => {
          const isFavUpdate = old.user.favourites.includes(newTodo.postId);

          const updatedFavourites = isFavUpdate
            ? old.user.favourites.filter((fav: string) => fav !== newTodo.postId)
            : [...old.user.favourites, newTodo.postId];

          if (isFavUpdate) {
            toast.success("Post removed from bookmarks");
          } else {
            toast.success("Post saved to bookmarks");
          }

          return {
            ...old,

            user: {
              ...old.user,
              favourites: updatedFavourites,
            },
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

  const handleBookmark = async (userId: string, postId: string) => {
    bookmarkMutation.mutate({ userId, postId });
  };

  const handleFollow = (
    userId: string,
    followedUserId: string,
    postId: string
  ) => {
    followMutation.mutate({ userId, followedUserId, postId });
  };
  const handleLikeUpdate = async (userId: string, postId: string) => {
    try {
      const response = await api.put(
        `/posts/like-post?userId=${userId}&postId=${postId}`
      );
      //console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const likeMutation = useMutation({
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
      handleLikeUpdate(userId, postId),
    onMutate: async (newTodo) => {
      const previousTodos = queryClient.getQueryData(["posts"]);

      if (previousTodos) {
        queryClient.setQueryData(["posts"], (old: any) => {
          const updatedLikes = old?.posts?.map((post: any) => {
            if (post._id === newTodo.postId) {
              const updatedLikes = post?.likes?.includes(userId)
                ? post?.likes?.filter((like: string) => like !== userId)
                : [...post?.likes, userId];
              return {
                ...post,
                likes: updatedLikes,
              };
            }
            return post;
          });
          return {
            ...old,
            posts: updatedLikes,
          };
        });
      }

      return { previousTodos };
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log("Liked successfully");
    },
  });
  const handleLike = async (userId: string, postId: string) => {
    likeMutation.mutate({ userId, postId });
  };

  const handleDelPost = async (postId: string) => {
    try {
      const response = await api.delete(`/posts/delete-post/${postId}`);
      //console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const deleteMutation = useMutation({
    mutationFn: ({ postId }: { postId: string }) => handleDelPost(postId),
    onMutate: (newTodo) => {
      const previousTodos = queryClient.getQueryData(["posts"]);
      if (previousTodos) {
        queryClient.setQueryData(["posts"], (old: any) => {
          const updatedLikes = old?.posts?.filter(
            (post: any) => post._id !== newTodo.postId
          );
          toast("post deleted successfully");
          return {
            ...old,
            posts: updatedLikes,
          };
        });
      }
      return { previousTodos };
    },
    onError: (err: any) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log("post deleted successfully");
    },
  });
  const handleDeletePost = async (postId: string) => {
    deleteMutation.mutate({ postId });
  };
  return (
    <>
      <div className=" cursor-pointer gap-1 p-5 pb-8 border-b border-gray-100 flex items-center justify-between">
        <div className=" w-[75%]">
          <div className="flex gap-2 items-center">
            <Link to={"/profile/@" + author_id?.username}>
              <img
                src={author_id?.profile}
                alt=""
                className="rounded-full w-6 h-6"
              />
            </Link>
            <div className=" text-[12px] text-gray-50">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link to={"/profile/@" + author_id?.username}>
                    <Button
                      variant="link"
                      className=" font-light ps-0 text-[13px]"
                    >
                      {author_id?.name !== null ? (
                        <p className=" capitalize">{author_id?.name}</p>
                      ) : (
                        <p className=" capitalize">{author_id?.username}</p>
                      )}
                    </Button>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                      <div className=" flex items-center gap-4">
                        <Link to={"/profile/@" + author_id?.username}>
                          <img
                            src={author_id?.profile}
                            alt=""
                            className="rounded-full w-10 h-10"
                          />
                        </Link>
                        <div className=" flex items-center justify-between  w-60">
                          <div>
                            <Link to={"/profile/@" + author_id?.username}>
                              <div className=" font-light ps-0 text-[13px]">
                                {author_id?.name !== null ? (
                                  <p className=" capitalize">
                                    {author_id?.name}
                                  </p>
                                ) : (
                                  <p className=" capitalize">
                                    {author_id?.username}
                                  </p>
                                )}
                              </div>
                            </Link>
                            <div className=" font-light ps-0 text-[13px] text-gray-600">
                              <p className=" capitalize">
                                {author_id?.followers?.length} Followers
                              </p>
                            </div>
                          </div>
                          {author_id._id !== userId && (
                            <Button
                              className=" text-[12px] rounded-full"
                              size={"sm"}
                              onClick={() =>
                                handleFollow(userId, author_id._id, _id)
                              }
                            >
                              {!author_id?.followers?.includes(userId)
                                ? "Follow"
                                : "Unfollow"}
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm mt-2">{author_id?.bio}</p>
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
          <Link to={"/detail/" + slug}>
            <div className="flex  justify-between gap-2 mt-1">
              <div>
                <div className=" text-2xl font-semibold line-clamp-2">
                  {title}
                </div>
                <div className=" mt-3  text-[14px] line-clamp-2 text-gray-600">
                  {short_description}
                </div>
              </div>
            </div>
          </Link>
          <div className=" mt-5 flex items-center justify-between">
            <div className=" flex items-center gap-5">
              <div className=" text-[13px] opacity-70 cursor-pointer">
                {moment(createdAt).format("MMM D")}
              </div>
              <div className="flex gap-2 items-center opacity-70">
                <SlLike
                  className=" text-[16px] cursor-pointer  "
                  color={likes?.includes(userId) ? "red" : "black"}
                  onClick={() => handleLike(userId, _id)}
                />

                <div className=" text-[14px]  ">{likes.length}</div>
              </div>
              <div className="flex gap-2 items-center opacity-70 cursor-pointer">
                <AiOutlineComment className=" text-[20px]" />
                <div className=" text-[14px]">1.2k</div>
              </div>
            </div>
            <div className=" flex items-center gap-3">
              <div className=" flex ">
                {data?.user?.favourites?.includes(_id) ? (
                  <IoMdBookmark
                    size={23}
                    className=" mt-[2px] cursor-pointer"
                    onClick={() => handleBookmark(userId, _id)}
                  />
                ) : (
                  <CiBookmark
                    size={23}
                    className=" mt-[2px] cursor-pointer"
                    onClick={() => handleBookmark(userId, _id)}
                  />
                )}
              </div>

              <Popover>
                <PopoverTrigger className=" mb-0">
                  {" "}
                  <HiOutlineDotsCircleHorizontal className=" text-[22px] opacity-70 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className=" text-[13px] max-w-[200px] gap-3 flex flex-col cursor-pointer">
                  <div>Follow Author</div>
                  <div>Mute Author</div>
                  <Separator className="my-2" />
                  <div className=" text-red-400">Report Post..</div>
                  {author_id._id == userId ? (
                    <div
                      className=" text-red-400"
                      onClick={() => handleDeletePost(_id)}
                    >
                      Delete Post
                    </div>
                  ) : (
                    ""
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div className="w-[25%]  ">
          <Link to={"/detail/" + slug}>
            <LazyLoadImage
              alt={"Not found"}
              effect="blur"
              height={110}
              src={cover_image}
              width={200}
              wrapperProps={{
                // If you need to, you can tweak the effect transition using the wrapper style.
                style: { transitionDelay: "1s" },
              }}
            />
            {/* <img
              src={cover_image}
              className=" w-[200px] h-[110px] object-cover rounded-sm"
              alt=""
            /> */}
          </Link>
        </div>
      </div>
    </>
  );
}

export default Card;
