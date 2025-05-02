 
import { Skeleton } from "./ui/skeleton";

function Loading() {
  return (
     
        <div className=" grid  grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Skeleton className="h-[200px]  mt-3 w-[300px]" />
            <div className="flex gap-2 mt-3 items-center">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-2 w-[200px]" />
            </div>
            <div className="flex w-full justify-between gap-2 mt-1">
              <div className="">
                <div className=" text-xl mt-2 w-full font-semibold line-clamp-2">
                  <Skeleton className="h-3" />
                </div>
                <div className=" mt-3 space-y-1 text-gray-500 text-[14px] line-clamp-2 font-[400]">
                  <Skeleton className="h-2 w-[300px]" />
                  <Skeleton className="h-2 w-[300px]" />
                </div>
                <div className=" mt-3 flex justify-between items-center text-gray-500 text-[14px] line-clamp-2 font-[400]">
                  <Skeleton className="h-2 w-20" />
                  <Skeleton className="h-2 w-20" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <Skeleton className="h-[200px]  mt-3 w-[300px]" />
            <div className="flex gap-2 mt-3 items-center">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-2 w-[200px]" />
            </div>
            <div className="flex w-full justify-between gap-2 mt-1">
              <div className="">
                <div className=" text-xl mt-2 w-full font-semibold line-clamp-2">
                  <Skeleton className="h-3" />
                </div>
                <div className=" mt-3 space-y-1 text-gray-500 text-[14px] line-clamp-2 font-[400]">
                  <Skeleton className="h-2 w-[300px]" />
                  <Skeleton className="h-2 w-[300px]" />
                </div>
                <div className=" mt-3 flex justify-between items-center text-gray-500 text-[14px] line-clamp-2 font-[400]">
                  <Skeleton className="h-2 w-20" />
                  <Skeleton className="h-2 w-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
    
  );
}

export default Loading;
