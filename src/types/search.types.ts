export interface ISearchServiceOptions {
  appId: string
  apiKey: string
  indexName: string
  apiOptions: { [key: string]: string }
  attributesToRetrieve: string[]
  analyticsTags: string[]
}

export interface ISearchOptions {
  text: string
  page: number
  hitsPerPage: number
}

export type TSearchHit = {
  name: string
  description: string
  githubRepo: {
    head: string
    path: string
    project: string
    user: string
  }
  homepage: string
  keywords: string[]
  license: string
  objectID: string
  owner: {
    avatar: string
    link: string
    name: string
  }
  version: string
}

export type THitsResponse = {
  hatsPerPage: number
  hits: TSearchHit[]
  nbPages: number
  page: number
  nbHits: number
}
