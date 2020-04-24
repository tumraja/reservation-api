export interface StorageInterface {
    connect(): void;
    close(): void;
    create(document);
    find(project?: object);
    findById(id: number | string, project?: object);
    update(id: number, data: any);
    destroy(id: number);
}
