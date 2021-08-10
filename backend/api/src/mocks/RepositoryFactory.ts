import { Repository } from "typeorm";
import { User } from "../entity/user";
import {MockType} from './MockType';

abstract class MockRepositoryFactory {

    public abstract create(save: boolean, findOne: boolean): Repository<any>;
}

export class MockUserRepositoryFactory extends MockRepositoryFactory {

    public create(saveFail: boolean, findOneFound: boolean): Repository<User> {
        let save, findOne;
        if (saveFail === false)
            save = jest.fn(entity => new Promise((res, rej) => res(entity)));
        else if (saveFail === true)
            save = jest.fn(entity => new Promise((res, rej) => rej('Database error')));

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