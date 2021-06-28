import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import * as React from 'react'

interface InfoCardProps {
    title: React.ReactNode
    description: React.ReactNode
    icon: IconDefinition
    color?: string
    classNames?: string
    descriptionSize?: 'small'
    uppercaseTitle?: boolean
    titleClasses?: string
}

const InfoCard: React.FC<InfoCardProps> = ({
    title,
    description,
    icon,
    color = 'bg-red-400',
    classNames,
    descriptionSize,
    uppercaseTitle,
    titleClasses,
}) => {
    return (
        <div className={classnames('lg:pt-12 pt-10 px-2 text-center', classNames)}>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full h-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-6 flex-auto">
                    {icon && (
                        <FontAwesomeIcon
                            icon={icon}
                            className={`text-white ${color} p-5 text-center items-center justify-center content-center w-16 h-16 mb-5 shadow-lg rounded-full mx-auto`}
                        />
                    )}
                    <h6 className={classnames('text-xl tracking-wider', { uppercase: uppercaseTitle }, titleClasses)}>
                        {title}
                    </h6>
                    <p className={classnames('mt-2 mb-4 p-8 text-gray-600', descriptionSize === 'small' && 'text-xs')}>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InfoCard
