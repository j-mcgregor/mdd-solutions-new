import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'

interface ListInfoCardProps {
    title: string
    description: string
    icon: IconDefinition
    bgColor: string
    textColor: string
    listItems: Array<{ label: string }>
}

const ListInfoCard: React.FC<ListInfoCardProps> = ({ title, description, icon, bgColor, textColor, listItems }) => {
    return (
        <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
            <div className="md:pr-12">
                <FontAwesomeIcon
                    icon={icon}
                    className={`text-white p-5 text-center items-center justify-center content-center w-16 h-16 mb-5 shadow-lg rounded-full ${bgColor}`}
                />
                <h3 className="text-3xl font-semibold">{title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-600 text-justify">{description}</p>
                <ul className="list-none mt-6">
                    {listItems.map((li, i) => (
                        <li key={i} className="py-2">
                            <div className="flex items-center">
                                <div>
                                    <span
                                        className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${textColor} ${bgColor} mr-3`}
                                    ></span>
                                </div>
                                <div>
                                    <h4 className="text-gray-600">{li.label}</h4>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ListInfoCard
