import raf from 'raf'

const cache = new WeakMap()

const difference = (a, b) => Math.abs(a - b)

const elements = className => {
  const els = [ ...document.querySelectorAll(`.${className}`) ]

  return els.map(el => {
    const end = parseInt(el.dataset.end, 10)
    const start = parseInt(el.dataset.start, 10)
    const opacityStart = parseFloat(el.dataset.opacityStart)
    const opacityEnd = parseFloat(el.dataset.opacityEnd)
    const translateXStart = parseInt(el.dataset.translatexStart, 10)
    const translateXEnd = parseInt(el.dataset.translatexEnd, 10)
    const translateYStart = parseInt(el.dataset.translateyStart, 10)
    const translateYEnd = parseInt(el.dataset.translateyEnd, 10)
    const scaleStart = parseFloat(el.dataset.scaleStart)
    const scaleEnd = parseFloat(el.dataset.scaleEnd)
    const updates = {}

    if (!isNaN(opacityStart) && !isNaN(opacityEnd)) {
      updates.opacity = {
        end: opacityEnd,
        start: opacityStart
      }
    }

    if (!isNaN(translateXStart) && !isNaN(translateXEnd)) {
      updates.translateX = {
        end: translateXEnd,
        start: translateXStart
      }
    }

    if (!isNaN(translateYStart) && !isNaN(translateYEnd)) {
      updates.translateY = {
        end: translateYEnd,
        start: translateYStart
      }
    }

    if (!isNaN(scaleStart) && !isNaN(scaleEnd)) {
      updates.scale = {
        end: scaleEnd,
        start: scaleStart
      }
    }

    if (
      typeof end === 'undefined' ||
      typeof start === 'undefined' ||
      Object.keys(updates) === 0
    ) {
      return null
    }

    return { el, end, start, updates }
  }).filter(x => x)
}

const init = ({ className = 'js-parallaxis' } = {}) => {
  const els = elements(className)

  if (els.length) {
    const updateFunc = update(els)
    window.addEventListener('scroll', () => raf(updateFunc))
  }
}

const interpolate = (start, end, progress) => {
  const p = difference(start, end) * progress
  return start > end ? start - p : start + p
}

const interval = (start, end, current) => (
  difference(start, current) / difference(start, end)
)

const limit = (min, max, value) => Math.max(Math.min(value, max), min)

const prefixedTransformProp = () => {
  const el = document.createElement('div')
  const vendors = ['Webkit', 'webkit', 'Moz', 'moz', 'ms', 'o']

  if (el.style.transform != null) {
    return 'transform'
  }

  for (let v in vendors) {
    const prop = `${vendors[ v ]}Transform`

    if (typeof el.style[ prop ] !== 'undefined') {
      return prop
    }
  }
}

const scrollY = () => parseInt(
  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
10)

const update = els => {
  const transformProp = prefixedTransformProp()

  return () => {
    const y = scrollY()

    els.map(({ el, end, start, updates }) => {
      const state = cache.get(el)

      if (
        (y >= start && y <= end) ||
        (state !== 'before' && y < start) ||
        (state !== 'after' && y > end)
      ) {
        let translateX = 0
        let translateY = 0
        let scale = 1

        const current = limit(start, end, y)
        const i = interval(start, end, current)

        if (updates.opacity) {
          const { end, start } = updates.opacity
          const opacity = interpolate(start, end, i).toFixed(2)
          el.style.opacity = opacity
        }

        if (updates.translateX) {
          const { end, start } = updates.translateX
          translateX = parseInt(interpolate(start, end, i), 10)
        }

        if (updates.translateY) {
          const { end, start } = updates.translateY
          translateY = parseInt(interpolate(start, end, i), 10)
        }

        if (updates.scale) {
          const { end, start } = updates.scale
          scale = interpolate(start, end, i).toFixed(2)
        }

        el.style[transformProp] =
          `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`

        if (y < start) {
          cache.set(el, 'before')
        } else if (y > end) {
          cache.set(el, 'after')
        } else {
          cache.set(el, 'during')
        }
      }
    })
  }
}

export default init
