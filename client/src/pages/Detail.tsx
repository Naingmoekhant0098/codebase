import  { useState } from "react";
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
import CardTwo from "@/components/cartTwo";
import { AiOutlineComment } from "react-icons/ai";
import { SlLike } from "react-icons/sl";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { token_descrypt } from "@/Services/Decrypt";
 
import Comment from "@/components/comment";
import { toast } from "sonner";
const encryptedToken = localStorage.getItem("access_token");
const username = (
  token_descrypt(encryptedToken) as { id: string; username: string }
)?.username;
function Detail() {
  const [comment, setComment] = useState("");
  const [isCommentLoading, setCommentLoading] = useState(false);

  const { slug } = useParams();
  
  const fetchPosts = async () => {
    try {
      const response = await api.get(
        "/posts/get-single-post?slug=" + slug
        // `/posts/get-posts?slug=${slug}&order=desc`
      );
      return response?.data?.data?.post;
    } catch (error) {}
  };

  const { isLoading, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPosts(),
  });

  const desText = data?.description;
  const noOfWords = desText?.split(/\s/g)?.length;

  const fetchSimilarPosts = async () => {
    try {
      const response = await api.get(
        `/posts/get-posts?category=${data?.category_id?._id}&order=desc`
      );
      return response?.data?.data;
    } catch (error) {}
  };

  const {
    
    data: similarData,
  } = useQuery({
    queryKey: ["similar", slug],
    queryFn: () => fetchSimilarPosts(),
  });
  const fetchRecommendPosts = async () => {
    try {
      const response = await api.get(`/posts/get-posts?order=asc&limit=4`);
      return response?.data?.data;
    } catch (error) {}
  };

  

  const {
    
    data: recommdendData,
  } = useQuery({
    queryKey: ["recommend"],
    queryFn: () => fetchRecommendPosts(),
  });
  
  const queryClient = useQueryClient();
  const encryptedToken = localStorage.getItem("access_token");
  const userId = (token_descrypt(encryptedToken) as { id: string })?.id;
  const handleFollowUpdate = async (userId: string, followedUserId: string) => {
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
    }: {
      userId: string;
      followedUserId: string;
    }) => handleFollowUpdate(userId, followedUserId),
    onMutate: async (newTodo) => {
      //console.log(newTodo)
      const previousTodos = queryClient.getQueryData(["post", slug]);
      queryClient.setQueryData(["post", slug], (old: any) => {
        const updatedPosts = old?.author_id?.followers?.includes(newTodo.userId)
          ? old?.author_id?.followers?.filter(
              (pt: string) => pt !== newTodo.userId
            )
          : [...old?.author_id?.followers, newTodo.userId];
        return {
          ...old,
          author_id: {
            ...old.author_id,
            followers: updatedPosts,
          },
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

  const handleResponse = async () => {
    try {
      setCommentLoading(true);
      const response = await api.post(`/posts/add-comment`, {
        author_id: userId,
        comment,
        post_id: data?._id,
      });
      queryClient.setQueryData(["post", slug], (old: any) => {
        return {
          ...old,
          commentsCount: old.commentsCount + 1,
          comments: [...old.comments, ...response.data.comments],
        };
      });
      setComment("");
      setCommentLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleFollow = (userId: string, followedUserId: string) => {
    followMutation.mutate({ userId, followedUserId });
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
      const previousTodos = queryClient.getQueryData(["post", slug]);

      if (previousTodos) {
        queryClient.setQueryData(["post", slug], (old: any) => {
          const updatedPosts = old?.likes?.includes(newTodo.userId)
            ? old?.likes?.filter((pt: string) => pt !== newTodo.userId)
            : [...old?.likes, newTodo.userId];
          return {
            ...old,
            likes: updatedPosts,
          };
        });
        // queryClient.setQueryData(["recommend"], (old: any) => {
        //   const updatedPosts = old?.likes?.includes(newTodo.userId)
        //     ? old?.likes?.filter((pt: string) => pt !== newTodo.userId)
        //     : [...old?.likes, newTodo.userId];
        //   return {
        //     ...old,
        //     likes: updatedPosts,
        //   };
        // });
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

  const likeMutationSimilar = useMutation({
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
      handleLikeUpdate(userId, postId),
    onMutate: async (newTodo) => {
      const previousTodos = queryClient.getQueryData(["recommend"]);
 
      if (previousTodos) {
        queryClient.setQueryData(["recommend"], (old: any) => {
          const updatedPosts = old?.posts.map((post: any) => {
            if (post._id === newTodo.postId) {
              const updatedLikes = post.likes?.includes(newTodo.userId)
                ? post.likes?.filter((pt: string) => pt !== newTodo.userId)
                : [...post.likes, newTodo.userId];
              return {
                ...post,
                likes: updatedLikes,
              };
            }
            return post;
          });
          return {
            ...old,
            posts: updatedPosts,
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
  const handleLikeSimilar = async (userId: string, postId: string) => {
    likeMutationSimilar.mutate({ userId, postId });
   
    
  };

  const handleCommentLikeUpdate = async (commentId: string) => {
    try {
      const response = await api.put(
        `/posts/like-comment?userId=${userId}&commentId=${commentId}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const commentLikeMutation = useMutation({
    mutationFn: (commentId: string) => handleCommentLikeUpdate(commentId),
    onMutate: async (newTodo) => {
      const previousTodos = queryClient.getQueryData(["post", slug]);
      
      if (previousTodos) {
        queryClient.setQueryData(["post", slug], (old: any) => {
          const updatedPosts = old?.comments.map((comment: any) => {
            if (comment._id === newTodo) {
              const updatedLikes = comment.likes?.includes(userId)
                ? comment.likes?.filter((pt: string) => pt !== userId)
                : [...comment.likes, userId];
              return {
                ...comment,
                likes: updatedLikes,
              };

              
            }
            return comment;
          });
          return {
            ...old,
            comments: updatedPosts,
          };
        });
      }
      return { previousTodos };
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log("Comment liked successfully");
    },
  });
  const handleCommentLike = async (commentId: string) => {
   
    commentLikeMutation.mutate(commentId);
  };

  //  const handleCommentLike=async(commentId:string)=>{
  //   try {

      
  //   } catch (error) {
      
  //   }
  
  //   queryClient.setQueryData(["post", slug], (old: any) => {
    
  //     const updatedPosts = old?.comments.map((comment: any) => {
  //       if (comment._id === commentId) {
  //         const updatedLikes = comment.likes?.includes(userId)
  //           ? comment.likes?.filter((pt: string) => pt !== userId)
  //           : [...comment.likes, userId];
  //         return {
  //           ...comment,
  //           likes: updatedLikes,
  //         };
  //       }
  //       return comment;
  //     });
  //     return {
  //       ...old,
  //       comments: updatedPosts,
  //     };
  //   });
  
    
  //   }

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

  return (
    <div className=" max-w-3xl  mx-auto mt-6 md:px-0 px-5 mt-20">
      {isLoading ? (
        <div>
          <div className="flex flex-col md:px-0 px-5  space-y-6  mt-6">
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
        </div>
      ) : (
        <div className="">
          <div className=" text-2xl md:text-3xl  font-semibold ">
            {data?.title}
          </div>
          <div className="flex gap-3 mt-4 items-center">
            <img
              src={data?.author_id?.profile}
              alt="not found"
              className="rounded-full  w-12 h-12 object-cover"
            />
            <div className=" gap-0 text-[12px]">
              <div className=" flex items-center gap-2">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="link"
                      className=" font-[400] ps-0 text-[14px]"
                    >
                      {data?.author_id?.name}
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
                <div
                  className=" text-green-600 text-sm cursor-pointer"
                  onClick={() => handleFollow(userId, data?.author_id._id)}
                >
                  {!data?.author_id?.followers?.includes(userId)
                    ? "Follow"
                    : "Following"}
                </div>
              </div>
              <div className="-mt-1 flex items-center gap-1 font-[300] text-gray-500 text-[12px] md:text-[13px]">
                <div className="">
                  Published in{" "}
                  <Link to={"/category"} className=" underline">
                    {data?.category?.name}
                  </Link>
                </div>
                <span>
                  <LuDot />
                </span>
                <div>{Math.ceil(noOfWords / 200)} mins</div>
                <span>
                  <LuDot />
                </span>
                <div>{moment(data?.createdAt).format("ll")}</div>
              </div>
            </div>
          </div>

          <div className=" mt-6 flex items-center py-3 justify-between border-b border-gray-100 border-t">
            <div className=" flex items-center gap-5">
              <div className="flex gap-2 items-center opacity-60">
                <SlLike
                  className=" text-[16px] cursor-pointer  "
                  color={data?.likes?.includes(userId) ? "red" : "black"}
                  onClick={() => handleLike(userId, data?._id)}
                />
                <div className=" text-[14px]  ">{data?.likes?.length}</div>
              </div>
              <div className="flex gap-2 items-center opacity-60 cursor-pointer">
                <AiOutlineComment className=" text-[20px]" />
                <div className=" text-[14px]">{data?.commentsCount}</div>
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
            <img
              src={data?.cover_image}
              className=" w-full h-[400px] object-cover"
              alt=""
            />
            <div
              className="descriptionText tracking-wider"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></div>
          </div>
          <div className=" w-full h-[1px] bg-gray-200 my-8"></div>
          <div>
            <div className="text-xl font-[450]">Tags</div>
            <div className=" flex gap-2 mt-4 flex-wrap">
              {data?.tags?.map((tag: string, index: number) => (
                <div
                  key={index}
                  className=" text-[14px] font-[400] border border-gray-200 rounded-full px-4 py-2 cursor-pointer"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          
          

          <div className=" w-full h-[1px] bg-gray-200 my-8"></div>

          <div className="">
            <div className=" w-full flex items-center justify-between">
              <div className=" text-xl font-[450]">Response ({data?.commentsCount})</div>
              <div className="border p-2 px-4 rounded-md text-[14px]">
                SignUp
              </div>
            </div>

            <div className=" my-4  border-b pb-6">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write comment"
                rows={8}
              />
              <div className=" flex items-center mt-4 gap-2 justify-end">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleResponse} disabled={isCommentLoading}>
                  {isCommentLoading ? "Responding" : "Respond"}
                </Button>
              </div>
            </div>

            <div className=" flex flex-col gap-6">
              {data?.comments.map((comment: any, index: number) => {
                return <Comment key={index} {...comment} handleCommentLike={handleCommentLike}/>;
              })}

              {data?.comments?.length === 0 && (
                <div className=" text-gray-500 text-[14px] font-[400] py-6">
                  No comments yet
                </div>
              )}

              {/* {
        data?.comments?.length > 0  && (
          <div className="  px-4 py-2 cursor-pointer text-[14px] rounded-full mt-6 border inline-block border-black ">
          See All Responses
        </div>
        )
       } */}
            </div>
          </div>

          {similarData.posts?.length > 0 && (
            <div className="pb-10">
              <div className=" text-2xl font-[500]">Similar Posts</div>

              <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {similarData?.posts?.map((post: any, index: number) => (
                  <CardTwo
                    key={index}
                    {...post}
                    handleLike={handleLike}
                    handleBookmark={handleBookmark}
                    favs={data?.user?.favourites}
                  />
                ))}
              </div>
            </div>
          )}
          <div className=" w-full h-[1px] bg-gray-200 my-8"></div>

          {recommdendData?.posts?.length > 0 && (
            <div className="pb-10">
              <div className=" text-2xl font-[500]">
                Recommended Blogs From Codebase
              </div>

              <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommdendData?.posts?.map((post: any, index: number) => (
                  <CardTwo
                    key={index}
                    {...post}
                    handleLike={handleLikeSimilar}
                    handleBookmark={handleBookmark}
                    favs={data?.user?.favourites}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Detail;
