import React from 'react';

import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Html } from '@react-email/html';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Tailwind } from '@react-email/tailwind';
import { Text } from '@react-email/text';

export type WaitingListProps = {
  name: string;
  email: string;
  password: string;
  // Other props...
};

export const WaitingList: React.FC<WaitingListProps> = ({ name, email, password }) => {
  const previewText = `Welcome to All Organics, ${name}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="my-10 mx-auto p-5 w-[465px]">
            <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0">
              Welcome to Organic living!
            </Heading>
            <Text className="text-sm">Hello {name},</Text>
            <Text className="text-sm">
              Thank you for joining our Team. We are excited to have you on board and will keep you
              updated on our latest updates and release date.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Text className="text-sm">Here are your login credentials</Text>
              <Text className="text-sm">Email: {email} </Text>
              <Text className="text-sm">Password: {password}</Text>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Text className="text-sm">
                If you have any questions or need further assistance, feel free to reach out to our
                support team.
              </Text>
            </Section>
            <Text className="text-sm">
              Best Regards,
              <br />
              All Organics Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
