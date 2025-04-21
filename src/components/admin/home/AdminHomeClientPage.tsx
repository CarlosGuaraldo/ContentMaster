'use client'

import { useCallback, useState } from 'react';
import { createPage } from '@/app/actions/admin/home/createPage';
import styles from '@/components/admin/home/AdminHome.module.css';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

const RichTextEditorWrapper = dynamic(() => import('@/components/richTextEditor/RichTextEditorWrapper'), {
    ssr: false,
});

const AdminHomeClientPage = () => {
    const { data: session, status } = useSession()
    const [editorContent, setEditorContent] = useState('');
    const [pageTitle, setPageTitle] = useState('');
    const [pageRoute, setPageRoute] = useState('');

    if (status === "loading") {
        return <>loading</>
    }
    if (status === "unauthenticated") {
        return <>loading</>
    }

    const userId = session?.user.id
    if (!userId) {
        throw new Error("");
    }

    const handleEditorChange = useCallback((content: string) => {
        setEditorContent(content);
    }, []);

    const handlePageTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setPageTitle(title);

        const sanitizedRoute = title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
        setPageRoute(sanitizedRoute);
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!pageTitle || !pageRoute) {
            alert("Please provide a valid page title and route.");
            return;
        }

        try {
            const response = await createPage({
                title: pageTitle,
                route: pageRoute,
                content: editorContent,
                userId: userId,
            });

            alert(response.message);
        } catch (error) {
            console.error("Error submitting content:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    }, [pageTitle, pageRoute, editorContent, userId]);


    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div>
                <label htmlFor="pageTitle" className={styles.label}>
                    Page Title
                </label>
                <input
                    type="text"
                    name="pageTitle"
                    id="pageTitle"
                    value={pageTitle}
                    onChange={handlePageTitleChange}
                    required
                    className={styles.input}
                />
            </div>
            <div>
                <label htmlFor="pageRoute" className={styles.label}>
                    Page Route
                </label>
                <input
                    type="text"
                    name="pageRoute"
                    id="pageRoute"
                    value={pageRoute}
                    readOnly
                    className={styles.input}
                />
            </div>
            <div className={styles.richTextEditor}>
                <RichTextEditorWrapper content={editorContent} onChange={handleEditorChange} />
            </div>
            <button type="submit" className={styles.button}>
                Save
            </button>
        </form>
    );
};

export default AdminHomeClientPage;