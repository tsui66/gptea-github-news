import { useId, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button'

export function SubscribeForm() {
  let id = useId()
  const [email, setEmail] = useState(null)
  const [awaitSubscribe, setAwaitSubscribe] = useState(false)
  
  async function subscribeNewsletters() {
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email address.');
      return;
    }
    const res = await fetch(`/api/subscribe`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });
    if (!res.ok) {
      const json = await res.json();
      if (json.error) {
        toast.error(json.error);
      } else {
        throw new Error('An unexpected error occurred');
      }
    } else {
      toast.success('Subscription Successful!');
    }
  }

  return (
    <form className="relative isolate mt-8 flex items-center pr-1">
      <label htmlFor={id} className="sr-only">
        Enter your Email
      </label>
      <input
        required
        type="email"
        autoComplete="email"
        name="email"
        id={id}
        placeholder="Enter your Email"
        onChange={(e) => setEmail(e.target.value)}
        className="peer w-0 flex-auto bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-[0.8125rem]/6"
      />
      <Button type="submit" arrow loading={awaitSubscribe} onClick={
        async () => {
          setAwaitSubscribe(true)
          await subscribeNewsletters()
          setAwaitSubscribe(false)
        }
      }>
        Subscribe
      </Button>
      <div className="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/15" />
      <div className="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300" />
    </form>
  )
}
