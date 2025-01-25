import { useState } from "react";

export const useUpdate = () => {
    const [reload, setReload] = useState(false);
    const update = () => {
        setReload(current => !current);
    }
    return {reload,update};
}