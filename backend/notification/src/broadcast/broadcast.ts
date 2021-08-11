import admin from 'firebase-admin';
import { getRepository } from 'typeorm';
import { CPU } from "../entity/cpu";
import { GPU } from "../entity/gpu";
import { watchlistCPU } from "../entity/watchlistCPU";
import { watchlistGPU } from "../entity/watchlistGPU";
import { deviceToken } from '../entity/deviceToken';

export default class Broadcast {
    /**
     * Send notification to client
     */
    async broadcast(product: CPU | GPU) {
        // for every subscribed user, fetch watchlist and check if product is in their watchlist
        // if contained in watchlist, send notification
        const devices: deviceToken[] = [];
        const tokens = getRepository(deviceToken);
        switch(product.type.toLowerCase()) {
            case 'gpu':
                let gpuResult = await tokens.createQueryBuilder('deviceToken')
                .innerJoinAndSelect(watchlistGPU, 'watchlistGPU', 'watchlistGPU.user.id = deviceToken.user.id')
                .where('watchlistGPU.gpu.id = :productId', {productId: product.id}).getMany();
                devices.push(...gpuResult);
                break;
            case 'cpu':
                let cpuResult = await tokens.createQueryBuilder('deviceToken')
                .innerJoinAndSelect(watchlistCPU, 'watchlistCPU', 'watchlistCPU.user.id = deviceToken.user.id')
                .where('watchlistCPU.cpu.id = :productId', {productId: product.id}).getMany();
                devices.push(...cpuResult);
                break;
            default:
                return;
        }
        let messages = [];
        devices.forEach((device) => {
            if(messages.length === 500) {
                // max messages allowed in batch send
                this.send(messages);
                messages = [];
            }
            const message: admin.messaging.TokenMessage = {
                notification: {
                    title: `${product.brand} ${product.model} update`,
                    body: `R${product.price} ${product.availability}`
                },
                token: device.token
            }
            messages.push(message);
        });
        if(messages.length > 0)
            this.send(messages);
    }

    private send(messages: admin.messaging.TokenMessage[]) {
        admin.messaging().sendAll(messages)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
    }
}