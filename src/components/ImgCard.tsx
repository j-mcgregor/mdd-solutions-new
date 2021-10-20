import * as React from 'react'

const ImgCard: React.FC<{ img: string }> = ({ img }) => {
    return (
        <div className="w-full px-4">
            <img alt="..." className="w-full rounded-lg shadow-lg" src={img} />
        </div>
    )
}

export default ImgCard
