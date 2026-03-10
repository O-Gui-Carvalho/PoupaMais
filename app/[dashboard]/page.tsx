import { auth } from '@/lib/auth/server';
import { redirect } from 'next/navigation';

export default async function page() {
    /*const { data: session } = await auth.getSession();
  
    if (session?.user) {
        redirect ('/')
    }*/

  return (
    <div>page</div>
  )
}
