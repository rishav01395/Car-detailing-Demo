import { Eye, EyeOff, LockKeyhole, LogIn, Mail, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { loginSchema } from '../schemas/forms'
import { getSupabaseFlagMessage, supabase } from '../lib/supabase'

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (values: { email: string; password: string }) => {
    const supabaseMessage = getSupabaseFlagMessage()
    if (supabaseMessage || !supabase) {
      setError(supabaseMessage ?? 'Supabase is not configured. Please add environment variables first.')
      setSuccess('')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    if (mode === 'signup') {
      const { error: signUpError, data } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      })

      setLoading(false)

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (data.user && !data.session) {
        setSuccess('Account created! Check your email to confirm the registration, then sign in.')
        return
      }

      setSuccess('Account created and signed in successfully.')
      navigate('/admin')
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    setLoading(false)
    if (signInError) {
      setError(signInError.message)
      return
    }

    navigate('/admin')
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-[30px] border border-white/10 bg-stone-900 shadow-2xl lg:grid-cols-2">
        <div className="bg-gradient-to-br from-stone-950 via-stone-900 to-[#1b1410] p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E7C98E]">Owner access</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">{mode === 'login' ? 'Secure dashboard login' : 'Create owner account'}</h1>
          <p className="mt-4 text-stone-300">Use the business owner account to manage bookings, services, and customer enquiries.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-10">
          <div className="mb-6 flex items-center gap-3 text-[#E7C98E]">
            <LockKeyhole size={18} />
            <span className="text-sm uppercase tracking-[0.25em]">{mode === 'login' ? 'Sign in' : 'Create account'}</span>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-stone-300">Email</label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-stone-950 px-4 py-3">
                <Mail size={16} className="text-stone-400" />
                <input {...register('email')} className="w-full bg-transparent text-white outline-none" placeholder="owner@domain.com" />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-400">{String(errors.email.message)}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm text-stone-300">Password</label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-stone-950 px-4 py-3">
                <LockKeyhole size={16} className="text-stone-400" />
                <input type={showPassword ? 'text' : 'password'} {...register('password')} className="w-full bg-transparent text-white outline-none" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-stone-400">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-400">{String(errors.password.message)}</p>}
            </div>
          </div>

          {error && <div className="mt-5 text-sm text-red-400">{error}</div>}
          {success && <div className="mt-5 text-sm text-emerald-400">{success}</div>}

          <button type="submit" disabled={loading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C7A15D] px-5 py-3 font-medium text-stone-950 disabled:opacity-60">
            {mode === 'login' ? <LogIn size={16} /> : <UserPlus size={16} />}
            {loading ? (mode === 'login' ? 'Signing in...' : 'Creating account...') : (mode === 'login' ? 'Sign in' : 'Create account')}
          </button>

          <div className="mt-5 text-center text-sm text-stone-300">
            {mode === 'login' ? 'Need an owner account?' : 'Already have an account?'}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login')
                setError('')
                setSuccess('')
              }}
              className="ml-2 font-medium text-[#E7C98E]"
            >
              {mode === 'login' ? 'Create account' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
