/* eslint-disable react/prop-types */

import { useDispatch } from 'react-redux'
import { addCollection, addedToast } from '../redux/features/collectionSlice'

const ResultCard = ({ item }) => {

    const dispatch = useDispatch()

    const addToCollection = (item) => {
        dispatch(addCollection(item))
        dispatch(addedToast())
    }

    // ⭐ DOWNLOAD FUNCTION
    const downloadMedia = async (url, filename) => {
        try {
            const response = await fetch(url)
            const blob = await response.blob()
            const downloadUrl = window.URL.createObjectURL(blob)

            const link = document.createElement("a")
            link.href = downloadUrl
            link.download = filename
            link.click()

            URL.revokeObjectURL(downloadUrl)
        } catch (error) {
            console.log("DOWNLOAD ERROR:", error)
        }
    }

    return (
        <div className='w-[18vw] relative h-80 bg-white rounded-xl overflow-hidden'>
            
            {/* MEDIA DISPLAY */}
            <a target='_blank' className='h-full' href={item.url}>
                {item.type === 'photo' && (
                    <img
                        className='h-full w-full object-cover object-center'
                        src={item.src}
                        alt=""
                    />
                )}

                {item.type === 'video' && (
                    <video
                        className='h-full w-full object-cover object-center'
                        autoPlay
                        loop
                        muted
                        src={item.src}
                    ></video>
                )}

                {item.type === 'gif' && (
                    <img
                        className='h-full w-full object-cover object-center'
                        src={item.src}
                        alt=""
                    />
                )}
            </a>

            {/* TITLE + BUTTONS */}
            <div id='bottom' className='flex justify-between gap-3 items-center w-full px-4 py-6 absolute bottom-0 text-white'>

                <h2 className='text-lg font-semibold capitalize h-14 overflow-hidden'>
                    {item.title}
                </h2>

                <div className="flex gap-2">

                    {/* SAVE BUTTON */}
                    <button
                        onClick={() => addToCollection(item)}
                        className='bg-indigo-600 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium'
                    >
                        Save
                    </button>

                    {/* ⭐ DOWNLOAD BUTTON WITH ICON */}
                    <button
                        onClick={() =>
                            downloadMedia(
                                item.src,
                                `${item.title || "media"}.jpg`
                            )
                        }
                        className='bg-green-600 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium flex items-center justify-center'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 11.25L12 15.75m0 0l4.5-4.5M12 15.75V3" />
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ResultCard