import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const message = flash?.success || flash?.error;
    const isError = Boolean(flash?.error);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!visible || !message) return null;

    return (
        <div
            className={`fixed right-4 top-20 z-50 max-w-sm rounded-xl px-4 py-3 text-sm shadow-lg ${
                isError ? 'bg-red-600 text-white' : 'bg-sage-600 text-white'
            }`}
            role="alert"
        >
            {message}
        </div>
    );
}
