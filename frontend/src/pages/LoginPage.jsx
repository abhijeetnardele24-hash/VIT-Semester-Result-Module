import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [prnNumber, setPrnNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axiosClient.post('/auth/login', { prnNumber, password });
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
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (prn, pwd) => {
    setPrnNumber(prn);
    setPassword(pwd);
    // Submit
    setTimeout(() => {
      axiosClient.post('/auth/login', { prnNumber: prn, password: pwd })
        .then(res => {
          const { token, ...userData } = res.data;
          login(token, userData);
          if (userData.role === 'STUDENT') navigate('/result');
          else if (userData.role === 'FACULTY') navigate('/faculty');
          else navigate('/admin');
        })
        .catch(err => {
          setError(err.response?.data?.message || 'Login failed');
        });
    }, 100);
  };

  return (
    <div className="min-h-screen flex bg-white font-inter">
      
      {/* Left Panel - Institutional Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#fafafa] border-r border-[#eaeaea] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-black text-base rounded-lg shadow-sm">
              VIT
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight text-black">Vishwakarma Institute of Technology</h2>
              <span className="text-xs text-[#888888] font-medium block">Autonomous Institute Affiliated to SPPU</span>
            </div>
          </div>
          
          <div className="max-w-md">
            <h1 className="text-3xl font-black tracking-tight text-black mb-4 leading-tight">
              Enterprise Academic & Multi-Semester ERP Portal
            </h1>
            <p className="text-[#666666] text-sm leading-relaxed mb-6 font-normal">
              Unified institutional platform powering complete multi-semester gradebook engines, live classroom attendance logging, fee clearance verification, and digital hall ticket issuance.
            </p>
            
            <div className="space-y-3">
              {[
                'Multi-Semester Gradebook & CGPA Progression Engine',
                'Printable Official University Grade Cards & Transcripts',
                'Subject-wise Attendance & Defaulter Radar (<75%)',
                'Digital Examination Hall Tickets with Eligibility Verification',
                'Faculty Marks Entry & Live Classroom Attendance Logger'
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
            <p className="text-[#666666] mt-1 text-xs">Enter your university credentials to access your portal</p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#444444] mb-1 uppercase tracking-wider">
                PRN / Faculty / Admin ID
              </label>
              <input
                type="text"
                required
                value={prnNumber}
                onChange={(e) => setPrnNumber(e.target.value)}
                className="glass-input block w-full px-3.5 py-2.5 rounded-xl text-black text-xs font-mono font-bold"
                placeholder="e.g. 23BCE0001, FACULTY01, ADMIN01"
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
              disabled={loading}
              className="w-full py-3 bg-black text-white text-xs font-bold rounded-xl hover:bg-[#222222] shadow-sm transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>

          {/* Quick Demo Login Credentials Bar */}
          <div className="pt-4 border-t border-[#eaeaea] space-y-2.5">
            <span className="block text-[10px] font-bold text-[#888888] uppercase tracking-wider text-center">
              1-Click Demo Accounts
            </span>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('23BCE0001', 'password123')}
                className="p-2 rounded-lg border border-[#eaeaea] bg-[#fafafa] hover:bg-black hover:text-white transition-all text-center group"
              >
                <span className="block text-[11px] font-bold">Aarav (Student)</span>
                <span className="block text-[9px] font-mono text-[#888888] group-hover:text-gray-300">23BCE0001</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('FACULTY01', 'password123')}
                className="p-2 rounded-lg border border-[#eaeaea] bg-[#fafafa] hover:bg-black hover:text-white transition-all text-center group"
              >
                <span className="block text-[11px] font-bold">Dr. Rao (Faculty)</span>
                <span className="block text-[9px] font-mono text-[#888888] group-hover:text-gray-300">FACULTY01</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('ADMIN01', 'password123')}
                className="p-2 rounded-lg border border-[#eaeaea] bg-[#fafafa] hover:bg-black hover:text-white transition-all text-center group"
              >
                <span className="block text-[11px] font-bold">Dean (Admin)</span>
                <span className="block text-[9px] font-mono text-[#888888] group-hover:text-gray-300">ADMIN01</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
