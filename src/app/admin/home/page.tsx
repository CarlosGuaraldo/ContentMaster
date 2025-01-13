import RichTextEditor from '@/components/RichTextEditor'

const Home = () => {
  return (
    <main>
      <h1>Customize Your Home Page</h1>
      <p>Use the editor below to configure the content displayed on your home page:</p>
      <section>
        <RichTextEditor />
      </section>
    </main>
  );
}

export default Home
