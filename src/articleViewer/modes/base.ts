import { ArticlePanel } from "../articlePanel";

export abstract class ArticleViewMode {
    abstract stage(article: ArticlePanel): void
    abstract center(articles: ArticlePanel[]): void
    abstract orbit(articles: ArticlePanel[]): void
}