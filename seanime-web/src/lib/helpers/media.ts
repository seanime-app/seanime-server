import { AL_AnimeListEntry, AL_BaseAnime, AL_MangaListEntry, Nullish } from "@/api/generated/types"

export function anilist_getListDataFromEntry(entry: Nullish<AL_AnimeListEntry | AL_MangaListEntry>) {
    return {
        progress: entry?.progress,
        score: entry?.score,
        status: entry?.status,
        startedAt: new Date(entry?.startedAt?.year || 0,
            entry?.startedAt?.month ? entry?.startedAt?.month - 1 : 0,
            entry?.startedAt?.day || 0).toUTCString(),
        completedAt: new Date(entry?.completedAt?.year || 0,
            entry?.completedAt?.month ? entry?.completedAt?.month - 1 : 0,
            entry?.completedAt?.day || 0).toUTCString(),
    }
}


export function anilist_animeIsMovie(anime: Nullish<AL_BaseAnime>) {
    if (!anime) return false
    return anime?.format === "MOVIE"

}

export function anilist_animeIsSingleEpisode(anime: Nullish<AL_BaseAnime>) {
    if (!anime) return false
    return anime?.format === "MOVIE" || anime?.episodes === 1
}

