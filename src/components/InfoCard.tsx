import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import * as React from 'react'
import { AnimateIn } from './AnimateIn'

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
        <AnimateIn
            animateIn
            triggerOnce
            className={classnames(
                'lg:p-4 text-center border-2 border-blue-700 rounded-3xl bg-gray-50 shadow-xl',
                classNames
            )}
        >
            <div className="relative flex flex-col min-w-0 break-words w-full h-full">
                <div className="flex-auto">
                    {icon && (
                        <FontAwesomeIcon
                            icon={icon}
                            className={`text-white ${color} p-5 text-center items-center justify-center content-center w-16 h-16 mb-5 shadow-lg rounded-full mx-auto`}
                        />
                    )}
                    <h6
                        className={classnames(
                            'text-xl tracking-wider text-gray-700 h-16 font-bold',
                            { uppercase: uppercaseTitle },
                            titleClasses
                        )}
                    >
                        {title}
                    </h6>
                    <p className={classnames('mt-2 mb-4 p-1 text-gray-500', descriptionSize === 'small' && 'text-xs')}>
                        {description}
                    </p>
                </div>
            </div>
        </AnimateIn>
    )
}

export default InfoCard
