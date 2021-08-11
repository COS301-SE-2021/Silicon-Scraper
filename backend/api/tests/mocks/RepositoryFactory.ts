import { Repository } from "typeorm";
import { CPU } from "../../src/entity/cpu";
import { GPU } from "../../src/entity/gpu";
import { User } from "../../src/entity/user";
import { watchlistCPU } from "../../src/entity/watchlistCPU";
import { watchlistGPU } from "../../src/entity/watchlistGPU";
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

export class MockGPURepository extends MockRepositoryFactory {

    public create(findOneFound: boolean): Repository<GPU> {
        let save = jest.fn(entity => new Promise((res, rej) => res(entity)));
        let findOne;
        if (findOneFound === false)
            findOne = jest.fn(() => new Promise((res, rej) => res(undefined)));
        else
        {
            let gpu = new GPU();
            gpu.type = 'gpu';
            gpu.brand = 'test';
            gpu.brand = 'test';
            gpu.description = 'test';
            findOne = jest.fn(() => new Promise((res, rej) => res(gpu)));
        }

        const mockGPURepository: () => MockType<Repository<any>> = jest.fn(() => ({
            save: save,
            findOne: findOne
        }));
        return mockGPURepository() as unknown as Repository<GPU>;
    }
}

export class MockCPURepository extends MockRepositoryFactory {
    public create(findOneFound: boolean): Repository<CPU> {
        let save = jest.fn(entity => new Promise((res, rej) => res(entity)));
        let findOne;
        if (findOneFound === false)
            findOne = jest.fn(() => new Promise((res, rej) => res(undefined)));
        else
        {
            let cpu = new CPU();
            cpu.type = 'gpu';
            cpu.brand = 'test';
            cpu.brand = 'test';
            cpu.description = 'test';
            findOne = jest.fn(() => new Promise((res, rej) => res(cpu)));
        }

        const mockCPURepository: () => MockType<Repository<any>> = jest.fn(() => ({
            save: save,
            findOne: findOne
        }));
        return mockCPURepository() as unknown as Repository<CPU>;
    }
}

export class MockWatchGPURepositoryFactory extends MockRepositoryFactory {

    public create(findOneFound: boolean): Repository<watchlistGPU> {
        let save = jest.fn(entity => new Promise((res, rej) => res(entity)));
        let findOne;
        if (findOneFound === false)
            findOne = jest.fn(() => new Promise((res, rej) => res(undefined)));
        else if (findOneFound === true) {
            let gpu = new GPU();
            gpu.type = 'gpu';
            gpu.brand = 'test';
            gpu.description = 'test';
            findOne = jest.fn(() => new Promise((res, rej) => res(gpu)));
        }

        const mockWatchGPURepository: () => MockType<Repository<any>> = jest.fn(() => ({
            save: save,
            findOne: findOne,
            find: jest.fn(() => new Promise((res, rej) => res([{}]))),
            delete: jest.fn(() => new Promise((res, rej) => res('woo')))
        }));
        return mockWatchGPURepository() as unknown as Repository<watchlistGPU>;
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
            findOne: findOne,
            find: jest.fn(() => new Promise((res, rej) => res([{}]))),
            delete: jest.fn(() => new Promise((res, rej) => res('woo')))
        }));
        return mockWatchCPURepository() as unknown as Repository<watchlistCPU>;
    }
}