export const COLORS = {
    boc: getColors("#009c3c", "#c3c3c3")
}


/**
 * Get color gradings based on the color input
 * @param primaryColor 
 * @param secondaryColor 
 * @returns 
 */
function getColors(primaryColor: string, secondaryColor?: string) {

    const primaries = {
        primaryColor: primaryColor,
        primaryColorLighter: colorShade(primaryColor, 20),
        primaryColorDarker: colorShade(primaryColor, -20)
    }

    if(secondaryColor) {
        return {
            ...primaries,
            secondaryColor: secondaryColor,
            secondaryColorLighter: colorShade(secondaryColor, 20),
            secondaryColorDarker: colorShade(secondaryColor, -20),
        }
    }

    return primaries

}


/**
 * Lighten or darken a color because there's no SASS atm
 * credit: https://stackoverflow.com/a/62640342/13533930
 */
function colorShade(col: string, amt: number) {
    col = col.replace(/^#/, '')
    if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2]
  
    // @ts-ignore
    let [r, g, b] = col.match(/.{2}/g);
    ([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt])
  
    r = Math.max(Math.min(255, r), 0).toString(16)
    g = Math.max(Math.min(255, g), 0).toString(16)
    b = Math.max(Math.min(255, b), 0).toString(16)
  
    const rr = (r.length < 2 ? '0' : '') + r
    const gg = (g.length < 2 ? '0' : '') + g
    const bb = (b.length < 2 ? '0' : '') + b
  
    return `#${rr}${gg}${bb}`
  }