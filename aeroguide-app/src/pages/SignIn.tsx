import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

export function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        // Send credential to backend
        const response = await fetch(`${API_URL}/api/auth/google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            credential: credentialResponse.credential,
          }),
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const data = await response.json();
        
        // Data contains { user, token }
        login(data.user, data.token);
        navigate('/');
      } catch (error) {
        console.error('Sign In failed:', error);
      }
    }
  };

  const handleGoogleError = () => {
    console.error('Google Sign In failed');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Sign In Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src="/Ag-logo.svg" 
                alt="AeroGuide Logo" 
                className="h-20 w-20"
              />
            </div>
            <h2 className="text-[#1076D1] text-3xl font-bold mb-2">
              Welcome to AeroGuide
            </h2>
            <p className="text-gray-600">
              Sign in to continue your aviation journey
            </p>
          </div>

          {/* Google Sign In Button */}
          <div className="w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              theme="outline"
              size="large"
              width="100%"
            />
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              By signing in, you agree to our{' '}
              <a href="#" className="text-[#1076D1] hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#1076D1] hover:underline">
                Privacy Policy
              </a>
            </p>
            <p className="text-sm text-gray-500">
              New to AeroGuide?{' '}
              <a href="#" className="text-[#1076D1] font-semibold hover:underline">
                Create an account
              </a>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <a href="/contact" className="text-[#1076D1] hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

