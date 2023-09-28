import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

import BoxedContent from '@/components/common/BoxedContent';
import NewBlogForm from '@/components/common/Blog/NewBlogForm';

const fetchGetBlogPost = async (blogPostId: string) => {
  const docRef = await getDoc(doc(db, 'blog-posts', blogPostId));
  return docRef.data();
};

export default async function EditBlog({ params }: { params: { blogId: string } }) {
  const data = await fetchGetBlogPost(params.blogId);

  return (
    <BoxedContent className="py-24 max-w-[800px] mx-auto">
      <h1 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-left">
        Revise and Enhance
      </h1>
      <p className="text-sm md:text-base 2xl:text-lg w-full mt-2.5 mb-8">
        Edit your blog to perfection. Fine-tune your content and make it even more impactful.
      </p>
      <NewBlogForm
        slug={params?.blogId}
        blogData={{
          title: data?.title,
          content: data?.content,
          coverImage: data?.coverImage || '',
          thumbnailImage: data?.thumbnailImage || '',
          status: data?.status
        }}
      />
    </BoxedContent>
  );
}
