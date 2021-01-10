import * as React from 'react'

const ImgCard: React.FC<{ img: string }> = ({ img }) => {
    return (
        <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
            <img alt="..." className="max-w-full rounded-lg shadow-lg" src={img} />
        </div>
    )
}

export default ImgCard
