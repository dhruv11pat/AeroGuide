'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { Plane, Shield } from 'lucide-react';

export default function LoginPage() {
  const { user, isAdmin, isLoading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin, isLoading, router]);

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    if (response.credential) {
      const result = await login(response.credential);
      if (result.success) {
        router.push('/dashboard');
      } else {
        alert(result.error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary-600 p-3 rounded-xl">
              <Plane className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              AeroGuide Admin Portal
            </h1>
            <p className="text-gray-600">
              Sign in with your admin account to manage flight schools
            </p>
          </div>

          {/* Admin badge */}
          <div className="flex items-center justify-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-lg mb-6">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Admin Access Required</span>
          </div>

          {/* Google Sign In */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert('Login failed. Please try again.')}
              theme="outline"
              size="large"
              text="signin_with"
              shape="rectangular"
              width="300"
            />
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-8">
            Only authorized administrators can access this portal.
            <br />
            Contact support if you need access.
          </p>
        </div>
      </div>
    </div>
  );
}
