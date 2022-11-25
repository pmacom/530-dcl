import { ArticlePanel } from "./articlePanel";

export const ArticleCategories = ["modeling", "tech", "metaverse", "coding", "engines", "events", "other"];

export interface ArticleRawData {
    id: number,
    attributes: {
        title: string
        releaseDate: string
        url: string
        year: number
        weight: number
        contentCreatorName: string
        width: number | null
        height: number | null
        duration: number | null
        source: string
        contentCreationUrl: string
        thumbnails: ArticleRawThumbnailData[]
        customTitle: string | null
        contentId: string
        description: string
        submittedBy: string
        showOnFeed: boolean
        createdAt: string | null
        updatedAt: string | null
    }
}

export interface ArticleRawThumbnailData {
    id: string
    url: string
    width: number
    height: number
    resolution: string
}

export interface ArticleData {
    id: number
    thumbnail: string
    contentCreatorName: string
    description: string
    url: string
    category: string
}
