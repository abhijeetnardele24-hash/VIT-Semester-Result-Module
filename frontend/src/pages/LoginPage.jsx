import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Check email domain validity dynamically
  const isEmail = identifier.includes('@');
  const isValidVitEmail = isEmail && identifier.trim().toLowerCase().endsWith('@vit.edu');
  const isInvalidDomain = isEmail && !isValidVitEmail;

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setError('');

    if (isInvalidDomain) {
      setError('Access Denied: Only institutional emails ending with @vit.edu are authorized.');
      return;
    }

    setLoading(true);

    try {
      const response = await axiosClient.post('/auth/login', { 
        identifier: identifier.trim(),
        prnNumber: identifier.trim(), 
        password 
      });
      const { token, ...userData } = response.data;
      login(token, userData);
      
      if (userData.role === 'STUDENT') {
        navigate('/result');
      } else if (userData.role === 'FACULTY') {
        navigate('/faculty');
      } else {
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please verify your PRN/Email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (userIdentifier, pwd) => {
    setIdentifier(userIdentifier);
    setPassword(pwd);
    setError('');
    setLoading(true);
    
    axiosClient.post('/auth/login', { identifier: userIdentifier, prnNumber: userIdentifier, password: pwd })
      .then(res => {
        const { token, ...userData } = res.data;
        login(token, userData);
        if (userData.role === 'STUDENT') navigate('/result');
        else if (userData.role === 'FACULTY') navigate('/faculty');
        else navigate('/admin');
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Login failed');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex bg-white font-inter">
      
      {/* Left Panel - Institutional Information & Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#fafafa] border-r border-[#eaeaea] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-black text-base rounded-lg shadow-sm">
              VIT
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight text-black">Vishwakarma Institute of Technology</h2>
              <span className="text-xs text-[#888888] font-medium block">Autonomous Institute Affiliated to SPPU, Pune</span>
            </div>
          </div>
          
          <div className="max-w-md">
            <h1 className="text-3xl font-black tracking-tight text-black mb-4 leading-tight">
              Enterprise Academic & Multi-Semester ERP Portal
            </h1>
            <p className="text-[#666666] text-sm leading-relaxed mb-6 font-normal">
              Secure single sign-on portal for enrolled students, authorized faculty members, and institutional deans. Access academic transcripts, live attendance monitoring, and digital hall tickets.
            </p>
            
            <div className="space-y-3">
              {[
                'Single Sign-On with Official @vit.edu University Email or PRN',
                'Multi-Semester Gradebook & CGPA Progression Engine',
                'Official Printable Grade Sheets & Transcripts',
                'Live Classroom Attendance Logging & Defaulter Radar (<75%)',
                'Digital Examination Hall Tickets with Eligibility Check'
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs font-semibold text-[#333333]">
                  <div className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[10px] flex-shrink-0">✓</div>
                  {feat}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs font-medium text-[#888888]">
            &copy; {new Date().getFullYear()} Vishwakarma Institute of Technology, Pune. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-[420px] animate-fade-in space-y-6">
          
          <div className="text-center">
            <h2 className="text-2xl font-black text-black tracking-tight">Institutional Sign In</h2>
            <p className="text-[#666666] mt-1 text-xs">Enter your university email (<span className="font-mono font-bold text-black">@vit.edu</span>) or PRN number</p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold text-[#444444] uppercase tracking-wider">
                  Institutional Email or PRN
                </label>
                {isEmail && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isValidVitEmail ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                  }`}>
                    {isValidVitEmail ? '✓ Valid @vit.edu Domain' : '⚠️ Must end with @vit.edu'}
                  </span>
                )}
              </div>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className={`glass-input block w-full px-3.5 py-2.5 rounded-xl text-black text-xs font-bold ${
                  isInvalidDomain ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="e.g. aarav.sharma@vit.edu or 23BCE0001"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-[#444444] mb-1 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input block w-full px-3.5 py-2.5 rounded-xl text-black text-xs"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading || isInvalidDomain}
              className="w-full py-3 bg-black text-white text-xs font-bold rounded-xl hover:bg-[#222222] shadow-sm transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>

          {/* Quick Demo Login Credentials Bar */}
          <div className="pt-4 border-t border-[#eaeaea] space-y-2.5">
            <span className="block text-[10px] font-bold text-[#888888] uppercase tracking-wider text-center">
              1-Click Demo Accounts (@vit.edu)
            </span>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('aarav.sharma@vit.edu', 'password123')}
                className="p-2 rounded-lg border border-[#eaeaea] bg-[#fafafa] hover:bg-black hover:text-white transition-all text-center group"
              >
                <span className="block text-[11px] font-bold">Aarav (Student)</span>
                <span className="block text-[9px] font-mono text-[#888888] group-hover:text-gray-300">aarav.sharma@vit.edu</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('rajesh.rao@vit.edu', 'password123')}
                className="p-2 rounded-lg border border-[#eaeaea] bg-[#fafafa] hover:bg-black hover:text-white transition-all text-center group"
              >
                <span className="block text-[11px] font-bold">Dr. Rao (Faculty)</span>
                <span className="block text-[9px] font-mono text-[#888888] group-hover:text-gray-300">rajesh.rao@vit.edu</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('dean.academics@vit.edu', 'password123')}
                className="p-2 rounded-lg border border-[#eaeaea] bg-[#fafafa] hover:bg-black hover:text-white transition-all text-center group"
              >
                <span className="block text-[11px] font-bold">Dean (Admin)</span>
                <span className="block text-[9px] font-mono text-[#888888] group-hover:text-gray-300">dean.academics@vit.edu</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
