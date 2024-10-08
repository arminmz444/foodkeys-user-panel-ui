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

// export const syncNotificationsAtom = atom(
//     null,
//     async (get, set) => {
//         try {
//             const response = await axios.get('/api/notifications');
//             const newNotifications = response.data;
//
//             localStorage.setItem('notifications', JSON.stringify(newNotifications));
//             // @ts-ignore
//             set(notificationsAtom, newNotifications);
//         } catch (error) {
//             console.error('Failed to fetch notifications:', error);
//         }
//     }
// );