import React from 'react'

const PinnedContentList = ({ list }: { list: string[] }) => {
    return (
        <div className="border-t-2 border-black pt-8 space-y-5">
            <h3 className="uppercase font-medium text-sm">Pinned Content</h3>

            {list?.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {list.map((l, index) => (
                        <iframe
                            key={index}
                            width="500"
                            height="400"
                            src={l}
                            allowFullScreen
                            className='w-full flex-shrink-0'
                        ></iframe>
                    ))}
                </div>
            ) : (
                <p className='text-center py-10 text-neutral-400'>No pinned content available.</p>
            )}
        </div>

    )
}

export default PinnedContentList