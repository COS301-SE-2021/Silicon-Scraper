/**
 * Test message broadcasting to devices
 */

import Broadcast from '../src/broadcast/broadcast';
import { CPU } from '../src/entity/cpu';
import typeorm from 'typeorm';
import { deviceToken } from '../src/entity/deviceToken';

jest.mock('typeorm', () => {
    const actual = jest.requireActual('typeorm');
    return {
        ...actual,
        getRepository: jest.fn()
    }
});

const setQueryReturnValue = (newValue: deviceToken[]) => {
    typeorm.getRepository = jest.fn().mockReturnValueOnce({
        createQueryBuilder: jest.fn().mockReturnValueOnce({
            innerJoinAndSelect: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockResolvedValue(newValue)
        })
    });
}

describe('Broadcast functionality', () => {
    beforeEach(() => {
        const mockSend = jest.fn();
        Broadcast.prototype.send = mockSend;
    })

    const broadcaster = new Broadcast();

    const cpu = new CPU();
    cpu.type = 'cpu';

    it('should call send once', async () => {
        setQueryReturnValue([{token: '1', user: null}]);
        await broadcaster.broadcast(JSON.stringify(cpu));
        expect(broadcaster.send).toBeCalledTimes(1);
    })

    it('should call send twice because more than 500 messages were created', async () => {
        const newArray: deviceToken[] = [];
        for(let i = 0; i < 501; i++) {
            newArray.push({token: i.toString(), user: null});
        }
        setQueryReturnValue(newArray);
        await broadcaster.broadcast(JSON.stringify(cpu));
        expect(broadcaster.send).toBeCalledTimes(2);
    })

    it('should not call send because no device tokens were found', async () => {
        setQueryReturnValue([]);
        await broadcaster.broadcast(JSON.stringify(cpu));
        expect(broadcaster.send).toBeCalledTimes(0);
    })
})

describe('createNotification unit test', () => {
    const broadcaster = new Broadcast();
    const product: CPU = {
        id: 'id',
        image: 'imageURL',
        link: 'link',
        retailer: 'retailer',
        type: 'cpu',
        description: '',
        details: {},
        brand: 'brand',
        model: 'model',
        price: 5000,
        availability: 'in stock',

    }
    const device = {
        token: '1',
        user: null
    }
    it('should return an object of type admin.messaging.TokenMessage', () => {
        const message = broadcaster.createNotification(product, device);
        expect(message).toEqual({
            token: '1',
            notification: {
                title: `${product.brand} ${product.model} update`,
                body: `R${product.price} ${product.availability}`
            }
        })
    })
})