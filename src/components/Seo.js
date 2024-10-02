import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const SEO = ({ title, description, pageRelativeUrl, image }) => {
  // TODO: Make sure this is still current.
  const siteMetadata = {
    title: 'Montana Free Press',
    description: 'In-depth news from across the state of Montana',
    author: 'Jacob Olness',
    // TODO: What is our default image?
    image: '/default-image.png',
    siteUrl: 'https://montanafreepress.org',
    twitterUsername: '@mtfreepress',
  };

  const metaDescription = description || siteMetadata.description;
  const metaImage = image || siteMetadata.image;
  const metaTitle = title ? `${title} | ${siteMetadata.title}` : siteMetadata.title;
  const metaUrl = `${siteMetadata.siteUrl}/${pageRelativeUrl || ''}`;

  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="image" content={metaImage} />
      <link rel="canonical" href={metaUrl} />

      {/* OpenGraph / Facebook */}
      <meta property="og:url" content={metaUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Montana Free Press" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={siteMetadata.twitterUsername} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:description" content={metaDescription} />

      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-179R4DKQFZ"></script>
      <script>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-179R4DKQFZ');
      `}
      </script>

      {/* Parsely information */}
      <script type="application/ld+json">
        {`
          {
            "@context": "http://schema.org",
            "@type": "NewsArticle",
            "name": "${metaTitle}",
            "url": "${metaUrl}",
            "thumbnailUrl": "${metaImage}",
            "datePublished": "${new Date().toISOString()}",
            "articleSection": "News apps",
            "creator": "Eric Dietrich"
          }
        `}
      </script>
    </Head>
  );
};

SEO.defaultProps = {
  description: '',
  image: '',
  pageRelativeUrl: '',
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  pageRelativeUrl: PropTypes.string,
};

export default SEO;
