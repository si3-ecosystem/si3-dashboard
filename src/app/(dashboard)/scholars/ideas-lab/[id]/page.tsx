"use client";

import { useQuery } from "@tanstack/react-query";
import { getScholarsIdeasLabCardById } from "@/lib/sanity/client";
import { PortableText as PortableTextComponent } from "@portabletext/react";
import { useParams } from "next/navigation";
import Loading from "@/app/loading";
import { ContentDetailLayout } from "@/components/templates/ContentDetailLayout";
import { ContentHero } from "@/components/molecules/content/ContentHero";
import { IdeasLabCommentSection } from "@/components/organisms/comment/IdeasLabCommentSection";
import { CommentNotifications } from "@/components/molecules/comment/CommentNotifications";

export default function ScholarsIdeaLabDetail() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["scholars-idea-lab-detail", id],
    queryFn: () => getScholarsIdeasLabCardById(id),
    enabled: !!id,
  });

  if (isLoading) return <Loading />;

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Content Not Found</h1>
        <p className="text-gray-600">The requested idea lab content could not be found.</p>
      </div>
    );
  }

  return (
    <>
      <ContentDetailLayout
        backHref="/scholars/ideas-lab"
        backLabel="Back to Ideas Lab"
        contentId={data._id}
        contentType="scholar_ideas_lab"
        userRole="scholar" // TODO: Get from auth context
        enableComments={false} // Disable built-in comments, we'll use our optimized version
        maxWidth="xl"
      >
        {/* Hero Section */}
        <div className="p-6 lg:p-8">
          <ContentHero
            title={data.title}
            description={data.description}
            publishedAt={data.date}
            category={data.category}
            image={data.ideaLabImage}
            variant="default"
          />
        </div>

        {/* Content Body */}
        <div className="px-6 lg:px-8 pb-8">
          <div className="max-w-4xl mx-auto prose prose-lg prose-gray">
            <PortableTextComponent value={data.body} />
          </div>
        </div>

        {/* Optimized Comment Section */}
        <div className="px-6 lg:px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <IdeasLabCommentSection
              contentId={data._id}
              className="mt-8"
            />
          </div>
        </div>
      </ContentDetailLayout>

      {/* Global notifications */}
      <CommentNotifications />
    </>
  );
}
