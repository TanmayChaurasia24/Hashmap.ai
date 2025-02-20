import React, { useState } from 'react';
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

// Types
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  likes: number;
  comments: number;
}
interface BlogPostsProps {
  blogPosts: BlogPost[];
}

export function BlogPost({blogPosts}: BlogPostsProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const BlogList = () => (
    <div className="max-w-5xl mx-auto px-4 py-8">
     <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-t from-black to-blue-500 bg-clip-text text-transparent">Recent Blog Posts</h2>
      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post: any) => (
          <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
                  {post.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={16} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={14} />
                      {post.readTime}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
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
          src={post.image}
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
            {post.readTime}
          </div>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
            {post.category}
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>

        <div className="prose prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-600 mb-4">
              {paragraph.trim()}
            </p>
          ))}
        </div>

        <div className="flex items-center gap-6 mt-8 pt-8 border-t">
          <button className="flex items-center gap-2 text-gray-600 hover:text-red-600">
            <Heart size={20} />
            {post.likes}
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
            <MessageCircle size={20} />
            {post.comments}
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
            <Share2 size={20} />
            Share
          </button>
        </div>
      </article>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {selectedPost ? <BlogPost post={selectedPost} /> : <BlogList />}
      </main>
    </div>
  );
}

export default BlogPost;