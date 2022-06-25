import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const About = () => {
  return (
    <section id='about'>
      <Row>
        <Col
          xs='12'
          sm='3'
          md='3'
          className='d-flex flex-row justify-content-center align-items-center'
        >
          <img
            src='https://avatars.githubusercontent.com/u/18407712?s=400&u=4aaf8572a2810a8ee1e0eea7a489bdd260dc5e35&v=4'
            alt='logo'
            className='me-image'
          />
        </Col>
        <Col xs='12' sm='9' md='9' className='my-5'>
          <h2>Bookommerce, un proyecto personal</h2>
          <p>
            Hola! Me llamo Carlos Velazquez y soy el creador de esta aplicación.
          </p>
          <p>
            Primero, te cuento un poco sobre Bookommerce. Bookommerce fue
            desarrolado utilzando como base el curso{' '}
            <a
              href='https://www.udemy.com/course/mern-ecommerce/?utm_source=adwords&utm_medium=udemyads&utm_campaign=LongTail_la.EN_cc.ROW&utm_content=deal4584&utm_term=_._ag_77879424134_._ad_535397245863_._kw__._de_c_._dm__._pl__._ti_dsa-1007766171312_._li_9069967_._pd__._&matchtype=&gclid=CjwKCAjw5NqVBhAjEiwAeCa97UUt_-a4ISpbocap3stuqDbG76ubN9S7c79jauIYg-s4C55YIbLSSxoCMq8QAvD_BwE'
              target='_blank'
              rel='noreferrer'
            >
              MERN for eCommerce from scratch
            </a>
            &nbsp;de&nbsp;
            <a
              href='https://twitter.com/traversymedia?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'
              target='_blank'
              rel='noreferrer'
            >
              Brad Traversy
            </a>
            , con la idea de fortalecer mis conocimientos sobre MongoDb, react y
            node. Un curso fantástico y recomendado.
          </p>
          <p>
            Luego fui personalizando un poco para darle un toque màs personal y
            probar nuevas funcionalidades. Ahora mismo tengo pensado agregar un
            montón de cosas que voy a ir subiendo poco a poco.
          </p>
          <p>
            Si quieres conocer un poco màs de mi, puedes utilizar el siguiente
            enlace para ver mi portafolio (Solo en inglés de momento).
          </p>
          <p>
            <Button
              type='button'
              variant='primary'
              href='https://www.carlosportafolio.com/'
              target='_blank'
              rel='noreferrer'
            >
              Conocer más
            </Button>
          </p>
        </Col>
      </Row>
    </section>
  );
};

export default About;
