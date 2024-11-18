import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BlogCardWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1); /* Transparent background */
  border-radius: 10px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(15px); /* Frosted glass effect */
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: scale(1.05); /* Subtle zoom effect */
    box-shadow: 0 6px 35px rgba(0, 0, 0, 0.2);
  }
`;

const BlogImage = styled.div`
  width: 100%;
  height: 200px;
  background: url(${(props) => props.imageUrl}) no-repeat center center;
  background-size: cover;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1; /* Image becomes fully visible on hover */
  }
`;

const BlogContent = styled.div`
  padding: 1.5rem;
  color: white;
`;

const BlogTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ffffff; /* White text */
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* Slight text shadow */
`;

const BlogExcerpt = styled.p`
  font-size: 1rem;
  color: #cccccc;
  margin-bottom: 1.5rem;
`;

const ReadMoreButton = styled(Link)`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(90deg, #6a0dad, #4b0082); /* Gradient button */
  color: white;
  border-radius: 30px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #4b0082, #6a0dad); /* Reverse gradient on hover */
  }
`;

const BlogCard = ({ blog }) => {
  return (
    <BlogCardWrapper>
      <BlogImage imageUrl={blog.imageUrl} />
      <BlogContent>
        <BlogTitle>{blog.title}</BlogTitle>
        <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
        <ReadMoreButton to={`/blog/${blog.id}`}>Read More</ReadMoreButton>
      </BlogContent>
    </BlogCardWrapper>
  );
};

export default BlogCard;
