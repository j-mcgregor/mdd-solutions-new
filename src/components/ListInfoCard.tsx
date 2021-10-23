import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'

interface ListInfoCardProps {
    title: RichTextBlock[]
    description: RichTextBlock[]
    icon?: IconDefinition
    bgColor: string
}
const ListInfoCard: React.FC<ListInfoCardProps> = ({ title, description, icon, bgColor }) => {
    return (
        <div className="w-full">
            <div className="md:pr-12">
                {icon && (
                    <FontAwesomeIcon
                        icon={icon}
                        className={`text-white p-5 text-center items-center justify-center content-center w-16 h-16 mb-5 shadow-lg rounded-full ${bgColor}`}
                    />
                )}
                <h3 className="text-4xl font-semibold">{<RichText render={title} />}</h3>
                <p className="mt-4 text-md leading-8 text-gray-600 text-justify">{<RichText render={description} />}</p>
            </div>
        </div>
    )
}

export default ListInfoCard
