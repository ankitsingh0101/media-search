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
        <div className="w-full p-2">
    <div className="bg-white rounded-xl overflow-hidden relative">

        {/* IMAGE */}
        <div className="w-full h-64 sm:h-72 md:h-80 overflow-hidden">
            <a target="_blank" href={item.url}>
                <img
                    src={item.thumbnail}
                    className="w-full h-full object-cover"
                />
            </a>
        </div>

        {/* OVERLAY BUTTONS */}
        <div className="absolute bottom-0 left-0 w-full 
                        flex justify-between items-center 
                        px-4 py-3 
                        bg-black/40 backdrop-blur-sm 
                        text-white">

            <button
                onClick={() => addToCollection(item)}
                className="bg-indigo-600 active:scale-95 text-white rounded px-3 py-1 text-sm"
            >
                Save
            </button>

            <button
                onClick={() => downloadMedia(item.src, `${item.title || "media"}.jpg`)}
                className="bg-blue-600 active:scale-95 text-white rounded px-3 py-1 text-sm"
            >
                ⬇
            </button>
        </div>

    </div>
</div>
    )
}

export default ResultCard