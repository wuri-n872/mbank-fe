import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type ConditionClosure = () => boolean;

export function useRedirector(path: string, condition: boolean | ConditionClosure = true) {
    const navigate = useNavigate();

    useEffect(() => {
        const redirecting = (typeof condition === 'boolean') ? condition : condition();

        redirecting && navigate(path);
    }, [condition, navigate, path]);
}