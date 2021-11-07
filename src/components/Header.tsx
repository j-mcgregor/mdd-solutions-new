import { RichText, RichTextBlock } from 'prismic-reactjs'
import React from 'react'
import Polygon from './Polygon'

interface HeaderProps {
    title: RichTextBlock[]
    description?: RichTextBlock[]
    bgColor?: string
    overflow?: false
}

const Header: React.FC<HeaderProps> = ({ title, description, bgColor = 'bg-blue-900', overflow }) => {
    return (
        <div
            className={`relative pt-16 pb-10 flex content-center items-center justify-center ${bgColor}`}
            style={{
                minHeight: '35vh',
            }}
        >
            <div className="absolute top-0 w-full h-full bg-center bg-contain bg-no-repeat">
                {overflow && <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"></span>}
            </div>
            <div className="container relative mx-auto">
                <div className="items-center flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                        <div className="">
                            <h1 className="text-white text-xl md:text-5xl py-5 uppercase font-extralight tracking-widest">
                                {RichText.render(title)}
                            </h1>
                            <p className="mt-4 text-lg text-gray-300 text-justify">
                                <RichText render={description} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden hidden sm:block"
                style={{ height: '70px', transform: 'translateZ(0)' }}
            >
                <Polygon />
            </div>
        </div>
    )
}

export default Header
