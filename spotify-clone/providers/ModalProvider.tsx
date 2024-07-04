"use client"

import AuthModal from "@/components/AuthModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMount, setIsMount] = useState(false);

    useEffect(() => {
        setIsMount(true);
    }, [])
    if (!isMount) {
        return null;
    }
    return (
        <>
            <AuthModal></AuthModal>
        </>
    );
};

export default ModalProvider;