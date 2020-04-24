export interface StorageInterface {
    open(): void;
    close(): void;
    getInstance(): void;
    create(document);
    find();
    findById(id: number | string);
    update(id: number, data: any);
    destroy(id: number);
}
