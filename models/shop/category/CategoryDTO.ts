export interface CategoryDTO {
    id: number;
    image: string;
    title_ir: string;
    display_title: string;
    url: string;
    children: CategoryDTO[];
    products: CategoryProductDTO[];
}

export interface CategoryProductDTO{
    id: number;
    title_ir: string;
    url: string;

}