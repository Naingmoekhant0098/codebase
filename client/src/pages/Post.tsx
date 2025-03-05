import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const modules = {
  toolbar: [
    [
      { header: "1" },
      { header: "2" },
      { header: "3" },
      { header: "4" },
      { header: "5" },
      { font: [] },
    ],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ align: [] }],
    ["link", "image"],
    ["clean"], // The 'clean' button will allow clearing the editor
  ],
};
function Post() {
  const [value, setValue] = useState("");

  return (
    <div className=" max-w-3xl   mx-auto ">
      <div className=" text-3xl font-[500] mt-8 text-center">
        Write CodeBase Post
      </div>
      <div className=" flex flex-col gap-4 mt-8 pb-10">
        <Input placeholder="Post header title" className=" h-[50px]" />
        <Select>
          <SelectTrigger className="w-full h-[50px]">
            <SelectValue placeholder="Choose Category Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

        <ReactQuill
          theme="snow"
          modules={modules}
          value={value}
          onChange={setValue}
        />

        <div className="flex space-x-3 justify-end">
        <Button size={'lg'} variant="outline">Clear</Button>

        <Button size={'lg'}>Create</Button>

        </div>
      </div>
    </div>
  );
}

export default Post;
