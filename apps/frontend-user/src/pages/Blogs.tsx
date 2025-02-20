import React, { useEffect, useState } from 'react';
import { 
  ChevronLeft, 
  Clock, 
  User, 
  Tag, 
  Heart, 
  MessageCircle, 
  Share2,
  Search,
  Filter
} from 'lucide-react';
import { Header } from '@/components/Header';
import axios from 'axios';

// Types
interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  thumbnail: string;
}

function App() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setblogpost] = useState<BlogPost[]>([])

  useEffect(() => {
    const allBlogsBulk = async () => {
      try {
        const response: any = await axios.get("http://localhost:3000/api/blogs/allpost", {
          headers: {
            "Content-Type": "application/json",
          },
        })

        if(!response.data) {
          console.log("no response from backend while fetching all blogs: ", response);
          return;
        }
        console.log("response is: ", response.data.data);
        
        setblogpost(response.data.data)
        console.log("blog set!");
        
      } catch (error) {
        console.log("error while fetching all the blogs from backend");
        return;
      }
    }

    allBlogsBulk()
  },[blogPosts])

  const showHTMLtags = (html: string): any => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText || tempDiv.textContent;
  }

  const BlogList = () => (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          Filter
        </button>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
                  coding
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                {post.content.replace(/<[^>]*>/g, '')}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={16} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{post.author}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>10 min</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm whitespace-nowrap"
                >
                  Read more
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const BlogPost = ({ post }: { post: BlogPost }) => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => setSelectedPost(null)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <ChevronLeft size={20} />
        Back to all posts
      </button>
      
      <article>
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-xl mb-8"
        />
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Clock size={16} />
            10 min
          </div>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
            coding
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>

        <div className="prose prose-lg max-w-none">
          {/* {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-600 mb-4">
              {paragraph.trim()}
            </p>
          ))} */}
          {showHTMLtags(post.content)}
        </div>
      </article>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      {/* Main Content */}
      <main>
        {selectedPost ? <BlogPost post={selectedPost} /> : <BlogList />}
      </main>
    </div>
  );
}

export default App;