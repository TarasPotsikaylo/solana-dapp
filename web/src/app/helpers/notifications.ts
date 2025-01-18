import { toast } from "react-toastify";
import { JSX } from "react";

export enum Type {
    ERROR = 'error',
    SUCCESS = 'success',
}

export const Position = 'top-right';

export class NotificationParameters {
    constructor(
        public label: string = '',
        public description: string | JSX.Element = '',
        public type: Type = Type.ERROR,
    ) { }
}

export class NotificationsPlugin {
    private static notify(message: string, type = Type.ERROR) {
        toast[type]!(message, {
            position: Position,
        });
    };

    static error(message: string) {
        NotificationsPlugin.notify(message, Type.ERROR);
    };

    static success(message: string) {
        NotificationsPlugin.notify(message, Type.SUCCESS);
    };
};
