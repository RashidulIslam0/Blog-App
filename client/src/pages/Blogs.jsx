// import axios from "axios";
// import React, { useEffect, useState } from "react";

// function Blogs() {
//   const [blogs, setBlogs] = useState([]);

//   // get blogs
//   const getAllBlogs = async () => {
//     try {
//       const data = await axios.get(
//         "http://localhost:3000/api/v1/blog/all-blog"
//       );
//       if (data?.success) {
//         setBlogs(data?.blogs);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getAllBlogs;
//   }, []);

//   return (
//     <div>
//       <h1>Blogs</h1>
//     </div>
//   );
// }

// export default Blogs;

import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  // get blogs
  const getAllBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/blog/all-blog"
      );
      const data = response.data; // Extract the response data
      console.log(data);
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs(); // Call the function to fetch blogs
  }, []);

  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))}
    </div>
  );
}

export default Blogs;
