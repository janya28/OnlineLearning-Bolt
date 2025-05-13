import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSuccess }) => {
  const { login, signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let success = false;
      
      if (type === 'login') {
        success = await login(email, password);
        if (!success) {
          setError('Invalid email or password');
        }
      } else {
        // Validate form fields for signup
        if (!name.trim()) {
          setError('Name is required');
          setLoading(false);
          return;
        }
        
        success = await signup(name, email, password);
        if (!success) {
          setError('This email is already registered');
        }
      }

      if (success) {
        onSuccess();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {type === 'signup' && (
        <Input
          label="Full Name"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          required
        />
      )}

      <Input
        label="Email Address"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />

      <Input
        label="Password"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={type === 'signup' ? 'Create a password' : 'Enter your password'}
        required
      />

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={loading}
      >
        {loading ? 'Processing...' : type === 'login' ? 'Login' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default AuthForm;