import Seo from '../components/Seo.jsx';
import Blocks from '../components/Blocks.jsx';
import { legalDocs } from '../data/legal.js';
import NotFound from './NotFound.jsx';

export default function Legal({ doc }) {
  const data = legalDocs[doc];
  if (!data) return <NotFound />;

  return (
    <>
      <Seo title={data.meta.title} description={data.meta.description} />

      <section className="section">
        <div className="container-x max-w-3xl">
          {/* Los términos legales del original arrancan directamente en "1. Información General" */}
          {doc === 'terminos' ? (
            <h1 className="sr-only">{data.title}</h1>
          ) : (
            <h1 className="mb-10 text-h1">{data.title}</h1>
          )}
          <Blocks blocks={data.blocks} />
        </div>
      </section>
    </>
  );
}
