import UploadImageView from '@/components/common/Blog/UploadImageView';

export default function NewBlogForm(){
  const onCoverImageUploadSuccess = (url: string) => {

  }

  const onThumbnailImageUploadSuccess = (url: string) => {

  }

  return (
    <div className="">
      <div>
        <h3 className="mb-2">Upload Cover Image</h3>
        <UploadImageView onUploadSuccess={onCoverImageUploadSuccess} />
      </div>
      <div className="mt-4">
        <h3 className="mb-2">Upload Thumbnail Image</h3>
        <UploadImageView onUploadSuccess={onThumbnailImageUploadSuccess} />
      </div>
    </div>
  )
}