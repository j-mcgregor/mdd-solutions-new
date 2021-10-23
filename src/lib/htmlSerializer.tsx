import { Elements } from 'prismic-reactjs'
import React from 'react'

// -- HTML Serializer
// This function will be used to change the way the HTML is loaded
export const htmlSerializer = function (type, element, content, children, key) {
    switch (type) {
        case Elements.heading1:
            return <h1 className="text-2xl">{children}</h1>
        case Elements.heading4:
            return <h4 className="font-bold">{children}</h4>
        case Elements.list:
            return <ul className="list-disc pl-5">{children}</ul>

        // Return null to stick with the default behavior
        default:
            return null
    }
}
