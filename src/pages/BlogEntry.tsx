import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar, Clock, Share2, Linkedin, Twitter, Facebook, ArrowLeft } from 'lucide-react';
import blog from '../content/blog.json';

const calculateReadTime = (content: any): number => {
  const wordsPerMinute = 200;
  const text = JSON.stringify(content);
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const BlogEntry: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const publication = blog.publications.find(pub => pub.id === id);

  if (!publication) {
    return (
      <PageLayout title="Publicación no encontrada" description="La publicación solicitada no existe">
        <div className="py-12 text-center">
          <h1 className="text-2xl font-display font-bold text-neutral-dark mb-4">
            Publicación no encontrada
          </h1>
          <Link to="/blog" className="text-primary hover:text-primary/80">
            Volver al blog
          </Link>
        </div>
      </PageLayout>
    );
  }

  const relatedPosts = blog.publications
    .filter(pub => pub.id !== id && pub.keywords.some(k => publication.keywords.includes(k)))
    .slice(0, 3);

  const shareUrl = window.location.href;
  const shareText = `Echa un vistazo a "${publication.title}" en MEIK LABS`;

  return (
    <PageLayout
      title={publication.title}
      description={publication.abstract}
    >
      <article className="py-12">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Blog
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8">
          <img
            src={publication.image}
            alt={publication.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-dark mb-6">
            {publication.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <time dateTime={publication.date}>
                {new Date(publication.date).toLocaleDateString()}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{calculateReadTime(publication.content)} min lectura</span>
            </div>
          </div>

          {/* Authors */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex -space-x-2">
              {publication.authors.map((author) => (
                <div
                  key={author}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm ring-2 ring-white"
                  title={author}
                >
                  {author.charAt(0)}
                </div>
              ))}
            </div>
            <div>
              <p className="font-medium text-neutral-dark">
                {publication.authors.join(', ')}
              </p>
            </div>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mb-8">
            {publication.keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* Abstract */}
          <div className="text-xl text-gray-600 mb-8">
            {publication.abstract}
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-4">
            <span className="font-medium text-neutral-dark flex items-center">
              <Share2 className="h-5 w-5 mr-2" />
              Compartir
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank')}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
              >
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto prose prose-lg mb-12">
          <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
            Desafío
          </h2>
          <p className="text-gray-600 mb-8">{publication.content.challenge}</p>

          <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
            Solución
          </h2>
          <p className="text-gray-600 mb-8">{publication.content.solution}</p>

          <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
            Implementación
          </h2>
          <ul className="list-disc list-inside text-gray-600 mb-8">
            {publication.content.implementation.map((step, index) => (
              <li key={index} className="mb-2">{step}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-display font-bold text-neutral-dark mb-4">
            Resultados
          </h2>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            {publication.content.results.metrics.map((metric, index) => (
              <li key={index} className="mb-2">{metric}</li>
            ))}
          </ul>
          <p className="text-gray-600">
            Inversión: {publication.content.results.investment}
          </p>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-neutral-dark mb-6">
              Publicaciones Relacionadas
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <Card key={post.id} variant="interactive" padding="none">
                  <Link to={`/blog/${post.id}`}>
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="object-cover w-full h-full rounded-t-lg"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-display font-bold text-neutral-dark mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {post.abstract}
                      </p>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </article>
    </PageLayout>
  );
};

export default BlogEntry;