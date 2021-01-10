import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'

interface CtaInfoProps {
    color?: string
    title: string
    description: string
    link: {
        to: string
        label: string
    }
    icon: IconDefinition
}

const CtaInfo: React.FC<CtaInfoProps> = ({ title, description, color = 'gray', link, icon }) => {
    return (
        <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
            <FontAwesomeIcon
                icon={icon}
                className={`text-white p-5 text-center items-center justify-center content-center w-16 h-16 mb-5 shadow-lg rounded-full bg-${color}-600`}
            />
            <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">{title}</h3>
            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-50">{description}</p>
            <a href={link.to} className="font-bold text-gray-100 mt-8">
                {link.label}
            </a>
        </div>
    )
}

export default CtaInfo
