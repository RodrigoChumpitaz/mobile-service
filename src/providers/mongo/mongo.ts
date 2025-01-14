import { Model } from "mongoose";

export class MongoProvider<T> {
    private readonly model: Model<any>;

    constructor(model: Model<any>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        const newRegister = new this.model(data);
        return await newRegister.save();
    }

    async getById(id: string): Promise<T | null> {
        return await this.model.findById(id);
    }
}