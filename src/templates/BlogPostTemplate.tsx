import React from "react";
import { graphql } from "gatsby";
import {
  Fields,
  Frontmatter,
  MarkdownRemark,
  SiteMetadata,
} from "../types/types";
import styled from "@emotion/styled";
import PostLayout from "../components/PostLayout";

type BlogPostTemplateProps = {
  data: {
    previous: { fields: Fields; frontmatter: Frontmatter };
    next: { fields: Fields; frontmatter: Frontmatter };
    site: { siteMetadata: SiteMetadata };
    markdownRemark: MarkdownRemark;
  };
  location: string;
};

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
}: BlogPostTemplateProps) => {
  const siteTitle = site.siteMetadata?.title;
  const title = post.frontmatter.title;
  const date = post.frontmatter.date;
  const html = post.html;

  return (
    <PostLayout title={siteTitle}>
      <StyledPostHeader>
        <StyledTitle>{title}</StyledTitle>
        <StyledDate>{date}</StyledDate>
      </StyledPostHeader>
      <StyledMarkdown
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </PostLayout>
  );
};

export default BlogPostTemplate;

const StyledPostHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledTitle = styled.span`
  font-size: 36px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray900};
`;

const StyledDate = styled.span`
  font-size: 18px;
  font-weight: medium;
  color: ${({ theme }) => theme.colors.gray700};
`;

const StyledMarkdown = styled.div``;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;