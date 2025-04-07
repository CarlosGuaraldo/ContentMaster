'use client'

import { useState } from 'react'
import RichTextEditor from '@/components/RichTextEditor'
import styles from '@/components/AdminHome.module.css'
import { createPage } from '@/app/actions/admin/home/createPage'

const Page = () => {
    const [editorContent, setEditorContent] = useState('')
    const [pageTitle, setPageTitle] = useState('')
    const [pageRoute, setPageRoute] = useState('')

    const handleEditorChange = (content: string) => {
        setEditorContent(content)
    }

    const handlePageTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setPageTitle(title);

        const sanitizedRoute = title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
        setPageRoute(sanitizedRoute);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // TODO: create validations to be used across the client and server side

        console.log('Submitted content:', { pageTitle, pageRoute, editorContent })

        await createNewPage()
    }

    const createNewPage = async () => {
        try {
            const response = await createPage({
                title: pageTitle,
                route: pageRoute,
                content: editorContent,
            });

            if (response.success) {
                alert(response.message);
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error('Error submitting content:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label htmlFor="pageTitle" className={styles.label}>Page Title</label>
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
                    <label htmlFor="pageRoute" className={styles.label}>Page Route</label>
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
                    <RichTextEditor onChange={handleEditorChange} />
                </div>
                <button type="submit" className={styles.button}>Save</button>
            </form>
        </div>
    )
}

export default Page
