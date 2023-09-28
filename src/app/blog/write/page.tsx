'use client';
import BoxedContent from '@/components/common/BoxedContent';
import NewBlogForm from '@/components/common/Blog/NewBlogForm';
const WriteBlog = () => {
  return (
    <BoxedContent className="py-24 max-w-[800px] mx-auto">
      <h1 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-left">
        Write Your Blog
      </h1>
      <p className="text-sm md:text-base 2xl:text-lg w-full mt-2.5 mb-8">
        Unleash your creativity and share your knowledge with our community. Write a blog that will
        captivate readers and make a difference.
      </p>
      <NewBlogForm />
    </BoxedContent>
  );
};

export default WriteBlog;
