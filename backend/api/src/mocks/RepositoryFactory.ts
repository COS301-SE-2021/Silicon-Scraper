import { Repository } from "typeorm";
import { CPU } from "../entity/cpu";
import { User } from "../entity/user";
import { watchlistCPU } from "../entity/watchlistCPU";
import {MockType} from './MockType';

abstract class MockRepositoryFactory {

    public abstract create(findOne: boolean): Repository<any>;
}

export class MockUserRepositoryFactory extends MockRepositoryFactory {

    public create(findOneFound: boolean): Repository<User> {
        let findOne;
        let save = jest.fn(entity => new Promise((res, rej) => res(entity)));
        if (findOneFound === false)
            findOne = jest.fn(() => new Promise((res, rej) => res(undefined)));
        else if (findOneFound === true) {
            let user = new User();
            user.username = 'test';
            user.hash = 'pass';
            findOne = jest.fn(() => new Promise((res, rej) => res(user)));
        }

        const mockUserRepository: () => MockType<Repository<any>> = jest.fn(() => ({
            save: save,
            findOne: findOne
        }));
        return mockUserRepository() as unknown as Repository<User>;
    }
}

export class MockWatchCPURepositoryFactory extends MockRepositoryFactory {

    public create(findOneFound: boolean): Repository<watchlistCPU> {
        let save = jest.fn(entity => new Promise((res, rej) => res(entity)));
        let findOne;
        if (findOneFound === false)
            findOne = jest.fn(() => new Promise((res, rej) => res(undefined)));
        else if (findOneFound === true) {
            let cpu = new CPU();
            cpu.type = 'cpu';
            cpu.brand = 'test';
            cpu.description = 'test';
            findOne = jest.fn(() => new Promise((res, rej) => res(cpu)));
        }

        const mockWatchCPURepository: () => MockType<Repository<any>> = jest.fn(() => ({
            save: save,
            findOne: findOne
        }));
        return mockWatchCPURepository() as unknown as Repository<watchlistCPU>;
    }
}