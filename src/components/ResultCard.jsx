/* eslint-disable react/prop-types */

import { useDispatch } from 'react-redux'
import { addCollection, addedToast } from '../redux/features/collectionSlice'

const ResultCard = ({ item }) => {

    const dispatch = useDispatch()

    const addToCollection = (item) => {
        dispatch(addCollection(item))
        dispatch(addedToast())
    }

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
        <div className="w-full xs:w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
            <div className="bg-white rounded-xl overflow-hidden relative group">

                {/* MEDIA */}
                <a target="_blank" href={item.url}>
                    {item.type === "photo" && (
                        <img
                            src={item.src}
                            className="w-full h-auto object-cover"
                            alt=""
                        />
                    )}

                    {item.type === "video" && (
                        <video
                            src={item.src}
                            autoPlay
                            loop
                            muted
                            className="w-full h-auto object-cover"
                        />
                    )}

                    {item.type === "gif" && (
                        <img
                            src={item.src}
                            className="w-full h-auto object-cover"
                            alt=""
                        />
                    )}
                </a>

                {/* TITLE + BUTTONS */}
                <div className="flex justify-between items-center gap-3 w-full px-4 py-4 absolute bottom-0 text-white bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all">

                    <h2 className="text-base font-semibold capitalize overflow-hidden max-w-[70%]">
                        {item.title}
                    </h2>

                    <div className="flex gap-2">

                        {/* SAVE BUTTON */}
                        <button
                            onClick={() => addToCollection(item)}
                            className="bg-indigo-600 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium"
                        >
                            Save
                        </button>

                        {/* DOWNLOAD BUTTON */}
                        <button
                            onClick={() =>
                                downloadMedia(item.src, `${item.title || "media"}.jpg`)
                            }
                            className="bg-green-600 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium flex items-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 11.25L12 15.75m0 0l4.5-4.5M12 15.75V3"
                                />
                            </svg>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultCard