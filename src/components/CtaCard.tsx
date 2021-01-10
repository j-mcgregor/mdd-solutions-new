import * as React from 'react'

interface CtaCardProps {
    img: string
    bgColor: string
    textColor: string
    title: string
    description: string
}

const CtaCard: React.FC<CtaCardProps> = ({
    img,
    title,
    description,
    bgColor = 'bg-pink-600',
    textColor = 'bg-pink-600',
}) => {
    return (
        <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
            <div
                className={`relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ${bgColor}`}
            >
                <img alt="..." src={img} className="w-full align-middle rounded-t-lg" />
                <blockquote className="relative p-8 mb-4">
                    <svg
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 583 95"
                        className="absolute left-0 w-full block"
                        style={{
                            height: '95px',
                            top: '-94px',
                        }}
                    >
                        <polygon points="-30,95 583,95 583,65" className={`${textColor} fill-current`}></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">{title}</h4>
                    <p className="text-md font-light mt-2 text-white">{description}</p>
                </blockquote>
            </div>
        </div>
    )
}

export default CtaCard
