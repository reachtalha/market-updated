import { Cross1Icon } from '@radix-ui/react-icons';
interface SocialMedia {
  type: string;
  link: string;
}

interface SocialMediaListProps {
  items: SocialMedia[];
  onDeleteSocialLink: (index: number) => void;
}

const SocialMediaList: React.FC<SocialMediaListProps> = ({ items, onDeleteSocialLink }) => {
  return (
    <div className="mt-3 ">
      <h6 className="text-sm text-gray-600">Social Media Links:</h6>
      {items.length === 0 ? (
        <p className="text-sm text-center py-6 text-gray-600">No social media links added yet.</p>
      ) : (
        <ul className="space-y-1 mt-2">
          {items.map((socialMedia: SocialMedia, index: number) => (
            <li key={index} className="flex justify-between items-center gap-x-2">
              <p>
                <span className="font-medium">{socialMedia.type}</span>:{socialMedia.link}
              </p>
              <button
                onClick={() => onDeleteSocialLink(index)}
                className="hover:bg-gray-100 rounded-full p-1.5"
              >
                <Cross1Icon className="w-4 h-4 2xl:w-5 2xl:h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SocialMediaList;
