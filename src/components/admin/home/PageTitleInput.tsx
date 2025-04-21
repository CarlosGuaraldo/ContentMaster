import { useCallback } from "react";
import inputStyles from "@/components/admin/home/styles/Input.module.css";

interface Props {
    pageTitle: string;
    setPageTitle: (title: string) => void;
    setPageRoute: (route: string) => void;
}

const PageTitleInput = ({ pageTitle, setPageTitle, setPageRoute }: Props) => {
    const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setPageTitle(title);

        const sanitizedRoute = title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

        setPageRoute(sanitizedRoute);
    }, [setPageTitle, setPageRoute]);

    return (
        <>
            <input
                type="text"
                name="pageTitle"
                id="pageTitle"
                value={pageTitle}
                onChange={handleTitleChange}
                required
                className={inputStyles.input}
            />
        </>
    );
};

export default PageTitleInput;
