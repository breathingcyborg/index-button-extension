import { request } from './request';

export enum PublishType {
    URL_UPDATED='URL_UPDATED',
    URL_DELETED='URL_DELETED',
}

export type PublishRequest = {
    url: string,
    type: PublishType
}

export function publish(data: PublishRequest) {
    return request<any>({
        url: 'urlNotifications:publish',
        data: data,
        method: "POST",
    });
}