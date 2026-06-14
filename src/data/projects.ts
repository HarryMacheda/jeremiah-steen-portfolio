export type Project = {
    id: string;
    title: string;  
    description: string;
    brief: string[];
    response: string[];
    services: string[];
    hero: string;
    banner: string;
    assetPath: string;
    gallery: ProjectGalleryItem[][];

}

export type ProjectGalleryItem = {
    src: string;
    alt: string;
    description: string;
}