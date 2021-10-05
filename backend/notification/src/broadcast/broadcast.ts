import admin from 'firebase-admin';
import { getRepository } from 'typeorm';
import { CPU } from "../entity/cpu";
import { GPU } from "../entity/gpu";
import { watchlistCPU } from "../entity/watchlistCPU";
import { watchlistGPU } from "../entity/watchlistGPU";
import { deviceToken } from '../entity/deviceToken';

/**
 * Class used to send notifications to devices
 */
export default class Broadcast {
    /**
     * Fetch device tokens of users who have added the relevant product to their watchlist and send the notification
     * @param {string} product - Product update received by the database
     */
    public async broadcast(product: string) {
        // for every subscribed user, fetch watchlist and check if product is in their watchlist
        // if contained in watchlist, send notification
        const devices: deviceToken[] = [];
        const tokens = getRepository(deviceToken);
        const prod = JSON.parse(product);
        switch(prod.type.toLowerCase()) {
            case 'gpu':
                let gpuResult = await tokens.createQueryBuilder('deviceToken')
                .innerJoinAndSelect(watchlistGPU, 'watchlistGPU', 'watchlistGPU.user.id = deviceToken.user.id')
                .where('watchlistGPU.gpu.id = :productId', {productId: prod.id}).getMany();
                devices.push(...gpuResult);
                break;
            case 'cpu':
                let cpuResult = await tokens.createQueryBuilder('deviceToken')
                .innerJoinAndSelect(watchlistCPU, 'watchlistCPU', 'watchlistCPU.user.id = deviceToken.user.id')
                .where('watchlistCPU.cpu.id = :productId', {productId: prod.id}).getMany();
                devices.push(...cpuResult);
                break;
            default:
                return;
        }

        let messages: admin.messaging.TokenMessage[] = [];
        
        devices.forEach((device) => {
            if(messages.length === 500) {
                // max messages allowed in batch send
                this.send(messages);
                messages = [];
            }
            const message = this.createNotification(prod, device);
            messages.push(message);
        });

        if(messages.length > 0)
            this.send(messages);
    }

    /**
     * Contructs the notification to be sent via firebase messaging using the product and device token
     * @param {CPU | GPU} product - Updated or newly inserted product
     * @param {deviceToken} device - Device token of the user
     * @returns {admin.messaging.TokenMessage} Newly constructed message including the device token and notification
     */
    public createNotification(product: CPU | GPU, device: deviceToken) {
        const message: admin.messaging.TokenMessage = {
            notification: {
                title: `${product.brand} ${product.model} update`,
                body: `R${product.price} ${product.availability}`
            },
            token: device.token
        }
        return message;
    }

    /**
     * Sends the notification to all relevant users using firebase messaging
     * @param {admin.messaging.TokenMessage[]} messages - Array of messages to be sent as a batch 
     */
    public send(messages: admin.messaging.TokenMessage[]) {
        admin.messaging().sendAll(messages)
        .then((response) => {
            response.responses.forEach((res) => {
                if(res.success == false) {
                    console.log(res.error);
                }
                else {
                    console.log(res.messageId);
                }
            })
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
    }
}