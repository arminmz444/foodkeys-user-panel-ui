import { atom } from 'jotai';

export const notificationsAtom = atom(() => {
    const storedNotifications = localStorage.getItem('notifications');
    return storedNotifications ? JSON.parse(storedNotifications) : [];
});

export const updateNotificationsAtom = atom(
    null,
    (get, set, update) => {
        const updatedNotifications = typeof update === 'function' ? update(get(notificationsAtom)) : update;

        localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

        // @ts-ignore
        set(notificationsAtom, updatedNotifications);
    }
);
