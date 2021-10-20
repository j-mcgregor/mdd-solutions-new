import React from 'react'
import { useInView } from 'react-intersection-observer'

export const AnimateIn = ({
    threshold = 0.15,
    triggerOnce = false,
    transition = 800,
    animateIn = false,
    ...remainingProps
}) => {
    const [ref, inView] = useInView({ threshold, triggerOnce })

    return (
        <div
            ref={ref}
            style={
                animateIn
                    ? {
                          // adjust these as desired
                          transition: `opacity ${transition}ms, transform ${transition}ms`,
                          opacity: inView ? 1 : 0,
                          transform: `translateY(${inView ? 0 : 100}px)`,
                      }
                    : {}
            }
            {...remainingProps}
        />
    )
}
