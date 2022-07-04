import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Figure,
  Form,
  Image,
  Row,
} from 'react-bootstrap';
//import mailImage from '../assets/vecteezy_the-administrative-staff-sends-emails-to-the-company-s_.jpg';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import Loader from './Loader';

const { Control, Group, Label } = Form;

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [emailService, setEmailService] = useState();
  const [emailTemplateId, setEmailTemplateId] = useState();
  const [emailEmailKey, setEmailSerEmailKey] = useState();

  const form = useRef();

  const closeNotification = () => {
    setShowNotification(false);
  };

  const sendEmail = (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        `${emailService}`,
        `${emailTemplateId}`,
        form.current,
        `${emailEmailKey}`
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      )
      .finally(() => {
        form.current.reset();
        setShowNotification(true);
      });
  };

  const EmailNotification = () => {
    return (
      <Alert variant='success' onClose={() => closeNotification()} dismissible>
        <Alert.Heading>Sended!</Alert.Heading>
        <p>Tu mensaje ha sido enviado!</p>
      </Alert>
    );
  };

  useEffect(() => {
    axios.get('/api/config/emailjs').then(({ data }) => {
      setLoading(false);
      setEmailSerEmailKey(data.REACT_APP_EMAILJS_KEY);
      setEmailTemplateId(data.REACT_APP_TEMPLATE_ID);
      setEmailService(data.REACT_APP_EMAIL_SERVICE);
    });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className='contact'>
          <Container>
            <h1>Contacto</h1>
            {showNotification && <EmailNotification />}
            <Row className='my-3'>
              <Col xs='12' md={{ span: 8, order: 2 }}>
                <Form
                  ref={form}
                  onSubmit={sendEmail}
                  autoComplete='off'
                  className='px-4 pb-5'
                >
                  <Group className='mb-3' controlId='from_name'>
                    <Label>Email</Label>
                    <Control
                      type='email'
                      name='from_name'
                      placeholder='example@mail.com'
                    />
                  </Group>
                  <Group className='mb-3' controlId='user_name'>
                    <Label>Nombre</Label>
                    <Control
                      type='text'
                      name='user_name'
                      placeholder='John Doe'
                    />
                  </Group>
                  <Group className='mb-3' controlId='subject'>
                    <Label>Asunto</Label>
                    <Control type='text' name='subject' placeholder='Subject' />
                  </Group>
                  <Group className='mb-3' controlId='message'>
                    <Label>Mensaje</Label>
                    <Control
                      as='textarea'
                      placeholder='Leave a message here'
                      style={{ height: '200px' }}
                      name='message'
                    />
                  </Group>
                  <Button variant='primary' type='submit'>
                    Enviar
                  </Button>
                </Form>
              </Col>
              <Col xs='12' md={{ span: 4, order: 1 }}>
                <div className='m-4'>
                  <p>No dudes en enviar un correo o agregarme en Linkedin.</p>
                  <Figure>
                    <Image
                      src={process.env.PUBLIC_URL + '/images/email.jpg'}
                      alt='email-image'
                      fluid
                    />
                    <figcaption>
                      <a
                        href='https://www.vecteezy.com/free-vector/cartoon'
                        style={{ fontSize: '12px' }}
                        target='_blank'
                        rel='noreferrer'
                      >
                        Cartoon Vectors by Vecteezy
                      </a>
                    </figcaption>
                  </Figure>
                </div>
              </Col>
            </Row>
          </Container>
        </main>
      )}
    </>
  );
};

export default Contact;
