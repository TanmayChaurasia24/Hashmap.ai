"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";

import { Newsletter } from "@/components/Newsletter";
import { BlogPost } from "@/components/BlogPost";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Footer } from "@/components/Footer";


const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: What's Next in 2024",
    excerpt: "Explore the upcoming trends and technologies that will shape the future of web development...",
    content: `The landscape of web development is constantly evolving, and 2024 promises to bring even more exciting changes. From AI-powered development tools to WebAssembly becoming mainstream, developers have a lot to look forward to.

    One of the most significant trends we're seeing is the rise of AI-assisted coding. Tools powered by large language models are becoming increasingly sophisticated, helping developers write better code faster and catch potential issues before they become problems.

    WebAssembly (Wasm) is another technology that's gaining significant traction. It allows high-performance code written in languages like Rust and C++ to run in the browser, opening up new possibilities for web applications that previously required native software.

    The adoption of Edge Computing continues to grow, with more developers leveraging edge functions and distributed computing to deliver faster, more reliable user experiences. This shift is particularly important as users expect increasingly sophisticated applications with near-native performance.

    We're also seeing a strong push towards improved accessibility and inclusive design. This isn't just about compliance – it's about building better experiences for everyone. Tools and frameworks are increasingly baking in accessibility features by default.

    As we look ahead, it's clear that the role of web developers will continue to evolve. The key to success will be staying adaptable and embracing these new technologies while maintaining a strong foundation in the fundamentals of web development.`,
    author: "Sarah Johnson",
    date: "March 1, 2024",
    readTime: "8 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    likes: 234,
    comments: 56
  },
  {
    id: 2,
    title: "Building Scalable Applications with Modern Architecture",
    excerpt: "Learn the best practices for creating scalable and maintainable applications...",
    content: `Building scalable applications requires careful consideration of architecture, infrastructure, and development practices. In this comprehensive guide, we'll explore the key principles and patterns that enable applications to grow seamlessly.

    Microservices architecture has become a go-to solution for many organizations, but it's not without its challenges. We'll discuss when to use microservices, how to properly implement them, and common pitfalls to avoid.

    The role of containerization and orchestration cannot be overstated. Docker and Kubernetes have revolutionized how we deploy and manage applications, providing consistency across environments and making scaling more manageable.

    Data management is another crucial aspect of scalable applications. We'll explore different database solutions, caching strategies, and how to handle data consistency in distributed systems.

    Finally, we'll look at monitoring and observability solutions that help teams maintain and troubleshoot large-scale applications effectively.`,
    author: "Michael Chen",
    date: "February 28, 2024",
    readTime: "12 min read",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    likes: 189,
    comments: 42
  },
  {
    id: 3,
    title: "Mastering TypeScript: Advanced Patterns and Best Practices",
    excerpt: "Dive deep into TypeScript's advanced features and learn how to write better code...",
    content: `TypeScript has become an essential tool in modern web development, offering powerful features that help developers write safer, more maintainable code. In this in-depth guide, we'll explore advanced patterns and best practices that will take your TypeScript skills to the next level.

    We'll start by examining advanced type system features like conditional types, mapped types, and template literal types. These powerful features enable you to create flexible, reusable type definitions that can handle complex scenarios.

    Design patterns in TypeScript deserve special attention. We'll look at how traditional patterns can be implemented with TypeScript's type system, and explore patterns that are unique to TypeScript development.

    Error handling is another crucial aspect we'll cover. You'll learn how to create custom error types, implement error boundaries, and use TypeScript to ensure errors are handled consistently throughout your application.

    Finally, we'll discuss testing strategies for TypeScript applications, including how to properly type test fixtures and mock objects.`,
    author: "Emily Rodriguez",
    date: "February 27, 2024",
    readTime: "15 min read",
    category: "Programming",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    likes: 312,
    comments: 89
  }
];

export default function HomePage() {


  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <BlogPost blogPosts={blogPosts} />
        <HowItWorks />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  )
}

