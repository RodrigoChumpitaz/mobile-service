import { GenericObject } from "../types";

export interface IRepository<T> {
    create(data: Partial<T>): Promise<T>;
    getById(id: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<void>;
    findAll(query?: Record<string, any>): Promise<T[]>;
}

export abstract class MainRepository<T> implements IRepository<T> {
    protected readonly provider: GenericObject;

    constructor(provider: GenericObject) {
        this.provider = provider;
    }

    abstract create(data: Partial<T>): Promise<T>;
    abstract getById(id: string): Promise<T | null>;
    abstract update(id: string, data: Partial<T>): Promise<T | null>;
    abstract delete(id: string): Promise<void>;
    abstract findAll(query?: Record<string, any>): Promise<T[]>;
    abstract signIn(data: { email: string, password: string }): Promise<any>;
    abstract getByFilter(filter: Record<string, any>): Promise<T | null>;
}