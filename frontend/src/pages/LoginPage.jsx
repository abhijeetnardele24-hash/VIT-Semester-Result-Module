import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import vitLogoFull from '../assets/vit_logo_full.png';
import vitLogoSymbol from '../assets/vit_logo_symbol.png';

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
      setError('Access Denied: Only official university emails ending with @vit.edu are authorized.');
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
      setError(err.response?.data?.message || 'Authentication failed. Please verify your PRN or Institutional Email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-inter selection:bg-[#0072bc] selection:text-white">
      
      {/* Left Panel - Official Institutional Branding with Faint Institutional Blue */}
      <div className="lg:w-7/12 bg-gradient-to-br from-[#edf5fc] via-[#f4f9fd] to-[#ffffff] border-r border-[#dceaf6] flex flex-col justify-between p-8 sm:p-12 lg:p-16 relative overflow-hidden">
        
        {/* Subtle Geometric Background Overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0072bc 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}></div>
        
        {/* Top Header - Fitted Official Logo & Trust Details */}
        <div className="relative z-10 space-y-6">
          
          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-[#d8e8f5] shadow-[0_2px_12px_rgba(0,114,188,0.05)] w-fit">
            <img 
              src={vitLogoSymbol} 
              alt="VIT Logo Symbol" 
              className="h-12 w-auto object-contain"
            />
            <div className="border-l border-[#dceaf6] pl-4">
              <span className="text-[11px] font-semibold text-[#0072bc] uppercase tracking-wider block">
                Bansilal Ramnath Agarwal Charitable Trust
              </span>
              <h2 className="text-sm sm:text-base font-black text-[#0f2942] tracking-tight leading-tight">
                Vishwakarma Institutes, Pune
              </h2>
            </div>
          </div>

          {/* Main Hero Header */}
          <div className="max-w-xl pt-4">
            
            {/* Full Official Horizontal Logo Banner */}
            <div className="mb-6 p-4 bg-white rounded-2xl border border-[#d8e8f5] shadow-sm inline-block">
              <img 
                src={vitLogoFull} 
                alt="Vishwakarma Institute of Technology, Pune" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>

            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#e0effa] text-[#0060aa] border border-[#cbe3f5]">
                <span className="w-2 h-2 rounded-full bg-[#0072bc] animate-pulse"></span>
                Autonomous Institute Affiliated to SPPU | NAAC 'A++' Accredited
              </span>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0a1e30] leading-[1.2]">
                Enterprise Academic & Multi-Semester ERP System
              </h1>

              <p className="text-sm sm:text-base text-[#4a6378] leading-relaxed font-normal">
                A centralized, secure institutional gateway for Students, Faculty Evaluators, and Department Heads. Access real-time gradebooks, live lecture attendance tracking, and official examination hall tickets.
              </p>
            </div>

            {/* Institutional Features Pill List */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-[#d8e8f5]">
              {[
                { title: 'Single Sign-On Authentication', desc: 'Secure login via PRN or verified @vit.edu email' },
                { title: 'Multi-Semester Gradebook', desc: 'Continuous CGPA/SGPA progression & KT tracking' },
                { title: 'Official Statement of Grades', desc: 'Printable university transcripts & PDF export' },
                { title: 'Live Attendance & Defaulters', desc: 'Subject-wise session tracking & <75% warnings' },
              ].map((feat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/70 border border-[#dceaf6] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#0072bc] text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                    <h4 className="text-xs font-bold text-[#0f2942]">{feat.title}</h4>
                  </div>
                  <p className="text-[11px] text-[#60798e] pl-6">{feat.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Footer info */}
        <div className="relative z-10 pt-8 border-t border-[#d8e8f5] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#6a8499] gap-2">
          <span>666, Upper Indira Nagar, Bibwewadi, Pune, Maharashtra - 411037</span>
          <span className="font-semibold">&copy; {new Date().getFullYear()} VIT Pune. All Rights Reserved.</span>
        </div>

      </div>

      {/* Right Panel - Clean Production Sign In Form */}
      <div className="lg:w-5/12 flex items-center justify-center p-6 sm:p-12 bg-[#fafbfc]">
        <div className="w-full max-w-[420px] bg-white p-8 sm:p-10 rounded-3xl border border-[#dceaf6] shadow-[0_8px_30px_rgba(0,114,188,0.06)] animate-fade-in space-y-7">
          
          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 bg-[#0072bc] text-white rounded-2xl flex items-center justify-center font-black text-lg mx-auto shadow-md shadow-[#0072bc]/20 mb-3">
              VI
            </div>
            <h2 className="text-2xl font-black text-[#0a1e30] tracking-tight">Institutional Sign In</h2>
            <p className="text-xs text-[#60798e]">
              Enter your official credentials to access the academic portal
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold text-center animate-fade-in">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* PRN or Email Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-[#344d63] uppercase tracking-wider">
                  PRN or Official Email
                </label>
                {isEmail && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isValidVitEmail ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                  }`}>
                    {isValidVitEmail ? '✓ Valid @vit.edu' : '⚠️ Must end with @vit.edu'}
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className={`glass-input block w-full pl-3.5 pr-10 py-3 rounded-xl text-[#0a1e30] text-xs font-medium border-[#cbe0f0] focus:border-[#0072bc] focus:ring-[#0072bc] ${
                    isInvalidDomain ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="e.g. 23BCE0001 or aarav.sharma@vit.edu"
                />
                <div className="absolute right-3 top-3 text-[#94abbf]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
              </div>
              <span className="text-[10px] text-[#7a93a8] mt-1 block">
                Students, Faculty & Administrators can log in via PRN or <span className="font-mono font-bold text-[#0072bc]">@vit.edu</span> email.
              </span>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-[#344d63] uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input block w-full pl-3.5 pr-10 py-3 rounded-xl text-[#0a1e30] text-xs border-[#cbe0f0] focus:border-[#0072bc] focus:ring-[#0072bc]"
                  placeholder="••••••••••••"
                />
                <div className="absolute right-3 top-3 text-[#94abbf]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
              </div>
            </div>

            {/* Submit Button with Official Blue Gradient */}
            <button
              type="submit"
              disabled={loading || isInvalidDomain}
              className="w-full py-3.5 bg-gradient-to-r from-[#0060aa] to-[#0072bc] hover:from-[#004e8c] hover:to-[#0060aa] text-white text-xs font-bold rounded-xl shadow-md shadow-[#0072bc]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Academic Portal →</span>
              )}
            </button>

          </form>

          {/* Production Institutional Help & Security Footer (Replacing demo buttons) */}
          <div className="pt-5 border-t border-[#e2eef7] space-y-3">
            <div className="flex items-center gap-2 text-[11px] text-[#60798e]">
              <svg className="w-4 h-4 text-[#0072bc] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              <span>256-bit SSL Encrypted Institutional Gateway</span>
            </div>
            <p className="text-[10.5px] text-[#7a93a8] leading-relaxed">
              If you have forgotten your password or are experiencing issues logging in, please contact the <strong className="text-[#0f2942]">VIT ERP Helpdesk</strong> at <span className="font-mono text-[#0072bc]">erp.support@vit.edu</span>.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
