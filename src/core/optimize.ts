let svgoOptimize: ((...args: any[]) => { data: string }) | false | null = null

function getSvgOptimize(): ((...args: any[]) => { data: string }) | false {
  if (svgoOptimize !== null) {
    return svgoOptimize
  }

  try {
    const svgo = require('svgo')
    if (svgo && svgo.optimize) {
      svgoOptimize = (svg) => {
        return svgo.optimize(svg, {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  // viewBox is required to resize SVGs with CSS.
                  // @see https://github.com/svg/svgo/issues/1128
                  removeViewBox: false
                }
              }
            }
          ]
        })
      }
    }
  } catch (err) {
    // svgo not installed
  }

  svgoOptimize = svgoOptimize || false

  return svgoOptimize
}

export function optimize(svg: string) {
  const opt = getSvgOptimize()

  if (opt) {
    try {
      const result = opt(svg).data
      if (typeof result === 'string') {
        return { svg: result, optimized: true }
      }
    } catch (err) {
      // ignore the error
      console.error(err)
    }
  }

  return { svg, optimized: false }
}
