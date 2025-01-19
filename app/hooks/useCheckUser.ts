import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

export function useCheckUser() {
  const { user, isLoading: authLoading } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/check-user?userId=${user.sub}`);
        const data = await response.json();

        const currentPath = window.location.pathname;
        
        if (!data.exists) {
          // If user doesn't exist in database and not already on survey page
          if (currentPath !== '/survey') {
            router.push('/survey');
          }
        } else {
          // If user exists and trying to access survey
          if (currentPath === '/survey') {
            router.push('/home');
          }
        }
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      checkUser();
    }
  }, [user, authLoading, router]);

  return { isLoading: isLoading || authLoading };
}
