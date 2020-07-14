export const timeDifference = ( dateAdded ) => {
    const diff = new Date() - new Date(dateAdded)

    const s = Math.floor( diff/1000 )

    if (s <= 60 ) return String( s + ' s')
    if (s > 60 && s <= 3600 ) return String(Math.floor(s/60) + ' m')
    if (s > 3600 && s < 86400 ) return String(Math.floor(s/3600) + ' h')
    if (s >= 86400) return String(Math.floor(s/86400) + 'days')

}