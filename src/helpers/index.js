export const refactorShowsByGenre = (shows) => {
   return shows.reduce((acc, show) => {
        show.genres.forEach(genre => {
            if (acc[genre] === undefined) acc[genre] = []
            acc[genre].push(show)
        })
        return acc;
    }, {})
}

export const sortByRating = (shows) => {
    return shows.sort((a, b) => a.rating.average > b.rating.average ? -1 : 1);
}

