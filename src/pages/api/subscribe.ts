import { prisma } from 'src/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { defaultPromptId } from 'src/lib/makeprompt';
import novu from '@/lib/email';

const subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email } = req.body
    const subscriber = await prisma.subscriber.findFirst({
      where: {
        email,
      },
    })
    if (!subscriber) {
      const subscriber = await prisma.subscriber.create({
        data: {
          email,
          defaultPromptId: defaultPromptId
        },
      })
      try {
        const { data: { data: novusubscriber}} = await novu.subscribers.identify(subscriber.id, {
          email,
        });
        await novu.trigger('subscribe-notification', {
          to: [{
            subscriberId: novusubscriber.subscriberId,
            email,
          }],
          payload: {}
        }
      );
      } catch (error) {
        console.log(error)
      }
      return res.json({ message: 'Subscription Successful!' });
    } else {
      return res.status(400).json({ error: 'Your email has already been subscribed.' });
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default subscribe
