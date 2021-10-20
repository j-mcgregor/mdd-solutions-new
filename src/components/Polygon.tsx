import * as React from 'react'

export const InversePolygon: React.FC<{ fillColor?: string }> = ({ fillColor }) => {
    return (
        <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full overflow-hidden transform rotate-180"
            style={{ lineHeight: 0 }}
            fill={fillColor}
        >
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
        </svg>
    )
}

const Polygon: React.FC<{ fillColor?: string }> = ({ fillColor }) => {
    return (
        <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
        >
            <polygon fill={fillColor} points="2560 0 2560 100 0 100"></polygon>
        </svg>
    )
}

export default Polygon
