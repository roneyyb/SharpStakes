import { useUserDetails } from '@/utils/user';
import React from 'react';
import { useUser } from '@/api/user';

const useUserDetailsHook = () => {
    const { data: user } = useUser();
    const { setUser } = useUserDetails();

    React.useEffect(() => {
        if (user) {
            setUser(user);
        }
    }, [user, setUser]);

    return user;
}

export default useUserDetailsHook;