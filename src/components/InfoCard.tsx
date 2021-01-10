import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'

interface InfoCardProps {
    title: string
    description: string
    icon: IconDefinition
    color?: string
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, icon, color = 'bg-red-400' }) => {
    return (
        <div className="lg:pt-12 pt-10 w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-10 flex-auto">
                    <FontAwesomeIcon
                        icon={icon}
                        className={`text-white ${color} p-5 text-center items-center justify-center content-center w-16 h-16 mb-5 shadow-lg rounded-full mx-auto`}
                    />
                    <h6 className="text-xl font-semibold">{title}</h6>
                    <p className="mt-2 mb-4 p-8 text-gray-600">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoCard
