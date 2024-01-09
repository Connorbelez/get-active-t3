import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Link
} from '@jsx-email/all';
import { Tailwind } from '@jsx-email/tailwind';

// import { QrCode } from '../QR/QRCode';
import * as React from 'react';

interface YelpRecentLoginEmailProps {
  userFirstName?: string;
  loginDate?: Date;
  loginDevice?: string;
  loginLocation?: string;
  loginIp?: string;
}

const textStyle = {
  paddingTop: '30px', // Example size, adjust as needed
  marginLeft: '10px', // Space between logo and text
  fontSize: '32px', // Example size, adjust as needed
  fontWeight: 'bold', 
  // Add more styling as needed
};

const baseUrl = 'https://jsx.email/assets/demo/';

const main = {
  backgroundColor: '#FFF',
  width: '100%',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
};

const paragraph = {
  fontSize: 16
};

const logo = {
  padding: '10px 10px',
  width: '100px',
  height: '100px'
};

const logoContainer ={
  display: 'flex',
  flexDirection: 'row', // TypeScript recognizes 'row' as a valid value for FlexDirection
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  width: '100%'

}

const containerButton = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%'
};

const button = {
  backgroundColor: '#e00707',
  borderRadius: 30,
  // width: '100%',
  color: '#FFF',
  fontWeight: 'bold',
  border: '1px solid rgb(0,0,0, 0.1)',
  cursor: 'pointer',
  padding: '12px 30px'
};

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: 30,
  overflow: 'hidden',
  width: '100%',

};

const boxInfos = {
  padding: '20px 40px'
};

const containerImageFooter = {
  padding: '45px 0 0 0'
};

const qrCodeStyle = {
  marginTop: 20,
  marginBottom: 20,
  display: 'flex',
  justifyContent: 'center'
};

interface EventTicketEmailProps {
  customerName?: string;
  eventName?: string;
  eventDate?: Date;
  eventLocation?: string;
  ticketId?: string;
  qrSrc: string;
  heroImage?: string;
  receiptUrl?: string;
}


export const EventTicketEmail = ({
  customerName,
  eventName,
  eventDate,
  eventLocation,
  ticketId,
  qrSrc,
  heroImage,
  receiptUrl,

}: EventTicketEmailProps) => {
  const formattedDate = new Intl.DateTimeFormat('en', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(eventDate);

  return (
    <Tailwind>
    <Html
      // className='bg-white mx-auto w-full'
      style={{
        backgroundColor: '#FFF',
        // display: 'flex',
        // flexDirection: 'column', // TypeScript recognizes 'row' as a valid value for FlexDirection
        // alignItems: 'center',
        // marginLeft: 'auto',
        // marginRight: 'auto',

        width: '100%',
        height: '100%',
      }}
    >
      <Head />
      <Preview>Event Ticket</Preview>
      <Body 
        style={main}>
        <Container
          width="105%"
        >
          <Section 
          style={content}
            // style={
            //   {              
            //     display: 'flex',
            //     flexDirection: 'column', // TypeScript recognizes 'row' as a valid value for FlexDirection
            //     alignItems: 'center',
            //     justifyContent: 'center',
            //     padding: '10px',
            //     width: '100%'}
            // }
            // className='flex justify-center w-full'
          >
            <div className='w-full flex justify-start align-middle'>

              <Img className='w-[100px] h-[100px]' src={heroImage} />
              <Heading className=' text-3xl text-center pt-[30px] pl-2 font-bold  '>Get Active Ticket</Heading>
            </div>

          </Section>

          <Section style={content}>
            <Row>
              <Img width="100%" src={`https://get-active.app/redbull.jpg`} />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: '0' }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  Hello {customerName},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                  className=' text-wrap my-2 '
                >
                  Your ticket for {eventName} is ready!
                </Heading>
                {/* <Heading
                  className='my-4 w-full'
                > */}

                  <Container className='w-full my-8 flex justify-center'>

                    <Link className='w-full' style={button} href={receiptUrl}>
                      View Receipt
                      {/* <Button style={button}>View Receipt</Button> */}
                    </Link>
                  </Container>

                {/* </Heading> */}
                <Text style={paragraph}>
                  <b>Date: </b>
                  {formattedDate}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Location: </b>
                  {eventLocation}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Ticket ID: </b>
                  {ticketId}
                </Text>

                <Container style={qrCodeStyle}>
                  <Img
                   src={qrSrc} />
                </Container>

                <Text style={paragraph}>Please show this QR code at the event entrance.</Text>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img width={620} src={`https://get-active.app/email_footer.png`} />
          </Section>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'rgb(0,0,0, 0.7)'
            }}
          >
            © 2024 | Get Active Technologies LLC., 160 RDF, Gatineau, Canada | https://getactive.com
          </Text>
        </Container>
      </Body>
    </Html>
    </Tailwind>
  );
};

export default EventTicketEmail;