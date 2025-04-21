"use client";

import { useState, useCallback } from "react";
import { createPage } from "@/app/actions/admin/home/createPage";
import PageTitleInput from "@/components/admin/home/PageTitleInput";
import RichTextEditorWrapper from "@/components/richTextEditor/RichTextEditorWrapper";
import buttonStyles from "@/components/admin/home/styles/Button.module.css";
import formStyles from "@/components/admin/home/styles/Form.module.css";
import inputStyles from "@/components/admin/home/styles/Input.module.css";

const PageForm = ({ userId }: { userId: string }) => {
    const [editorContent, setEditorContent] = useState("");
    const [pageTitle, setPageTitle] = useState("");
    const [pageRoute, setPageRoute] = useState("");

    const handleEditorChange = useCallback((content: string) => {
        setEditorContent(content);
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!pageTitle || !pageRoute) {
            alert("Please provide a valid page title and route.");
            return;
        }

        try {
            const response = await createPage({ title: pageTitle, route: pageRoute, content: editorContent, userId });

            alert(response.message);
        } catch (error) {
            console.error("Error submitting content:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    }, [pageTitle, pageRoute, editorContent, userId]);

    return (
        <form onSubmit={handleSubmit} className={formStyles.form}>
            <label htmlFor="pageTitle" className={inputStyles.label}>Page Title:</label>
            <PageTitleInput pageTitle={pageTitle} setPageTitle={setPageTitle} setPageRoute={setPageRoute} />

            <label htmlFor="pageRoute" className={inputStyles.label}>Page Route:</label>
            <input
                type="text"
                id="pageRoute"
                value={pageRoute}
                className={inputStyles.input}
                readOnly
            />

            <label className={inputStyles.label}>Page Content:</label>
            <RichTextEditorWrapper content={editorContent} onChange={handleEditorChange} />

            <button type="submit" className={buttonStyles.button} >Save</button>
        </form>
    );
};

export default PageForm;
