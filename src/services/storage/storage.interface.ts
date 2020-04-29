export interface DBQueryBuilderInterface {
    // TODO: Make this to be a builder pattern
    create(data: any, collection?: string);
    select(collection?: string, project?: object);
    selectById(id: number | string, collection?: string, project?: object);
    selectByEmail(id: number | string, collection?: string, project?: object);
    update(id: number, data: any, collection?: string);
    updateByEmail(email: string, data: any, collection?: string);
    destroy(id: number | string, collection?: string);
}
