import { ToastContainer } from 'react-toastify';

import { Position } from '@/app/helpers/notifications';

export function Notification() {
    return (
        <ToastContainer
            position={Position}
            autoClose={1500}
            hideProgressBar
            newestOnTop={false}
            pauseOnFocusLoss
            pauseOnHover
        />
    );
};
