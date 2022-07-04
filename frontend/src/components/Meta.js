import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
      <meta property='og:title' content='Bienvenido a Bookommerce' />
      <meta property='og:image' content='%PUBLIC_URL%/images/preview.png' />
      <meta
        property='og:description'
        content='Compre los mejores libros al mejor precio.'
      />
      <meta property='og:url' content='https://www.carlosportafolio.com/' />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Bienvenido a Bookommerce',
  description: 'Compre los mejores libros al mejor precio.',
  keywords: 'libros',
};

export default Meta;
