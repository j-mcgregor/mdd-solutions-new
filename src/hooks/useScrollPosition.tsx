import { useRef, useLayoutEffect, DependencyList } from 'react'

const isBrowser = typeof window !== `undefined`

function getScrollPosition({ element, useWindow }) {
    if (!isBrowser) return { x: 0, y: 0 }

    const target = element ? element.current : document.body
    const position = target.getBoundingClientRect()

    return useWindow ? { x: window.scrollX, y: window.scrollY } : { x: position.left, y: position.top }
}

export function useScrollPosition(
    effect?: {
        ({ prevPos, currPos }: { prevPos: any; currPos: any }): void
        (arg0: { prevPos: { x: any; y: any }; currPos: { x: any; y: any } }): void
    },
    deps?: DependencyList,
    element?: unknown,
    useWindow?: unknown,
    wait?: number
) {
    // @ts-ignore
    const position = useRef(getScrollPosition({ useWindow }))

    let throttleTimeout = null

    const callBack = () => {
        const currPos = getScrollPosition({ element, useWindow })
        effect({ prevPos: position.current, currPos })
        position.current = currPos
        throttleTimeout = null
    }

    useLayoutEffect(() => {
        const handleScroll = () => {
            if (wait) {
                if (throttleTimeout === null) {
                    throttleTimeout = setTimeout(callBack, wait)
                }
            } else {
                callBack()
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, deps)
}
