import { useEffect, useRef, useState } from "react";

export function useHasMounted() {
    const [mounted, setMounted] = useState(false);
    const ran = useRef(false);

    useEffect(() => {
        if (!ran.current) {
            ran.current = true;
            setMounted(true);
        }
    }, []);

    return mounted;
}