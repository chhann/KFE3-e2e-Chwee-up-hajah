import type { SignupData, ValidationErrors } from '../model/types'

export class AuthService {
  private static readonly API_BASE = '/api/auth'; 

  static async checkDuplicate(type: 'email' | 'username', value: string): Promise<boolean> {
    if (!value.trim()) {
      throw new Error(`${type === 'email' ? '이메일' : '닉네임'}을 입력해주세요.`)
    }

    try {
      // API 호출
      const response = await fetch(`${this.API_BASE}/check-duplicate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, value: value.trim() })
      })

      const data = await response.json()

      // 응답 처리
      if (!response.ok) {
        throw new Error(data.error || '중복 확인 중 오류가 발생했습니다.')
      }

      // 성공시 중복 확인 완료
      return true
    } catch (error) {
      if (error instanceof Error) throw error
      throw new Error('중복 확인 중 오류가 발생했습니다.')
    }
  }

  static async checkEmailDuplicate(email: string): Promise<boolean> {
    return this.checkDuplicate('email', email)
  }

  static async checkUsernameDuplicate(username: string): Promise<boolean> {
    return this.checkDuplicate('username', username)
  }

  // 간단한 유효성 검사
  static validateSignupData(data: SignupData & { confirmPassword: string }): ValidationErrors {
    const errors: ValidationErrors = {}

    if (!data.email) errors.email = '이메일을 입력해주세요.'
    if (!data.password) errors.password = '비밀번호를 입력해주세요.'
    if (!data.confirmPassword) errors.confirmPassword = '비밀번호 확인이 필요합니다.'
    if (!data.username) errors.username = '닉네임을 입력해주세요.'
    if (!data.address) errors.address = '주소를 입력해주세요.'

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (data.email && !emailRegex.test(data.email)) {
      errors.email = '올바른 이메일 형식을 입력해주세요.'
    }

    if (data.password && data.password.length < 8) {
      errors.password = '비밀번호는 8자 이상이어야 합니다.'
    }

    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    }

    return errors
  }

  static async signup(signupData: SignupData): Promise<{ success: boolean; needsVerification: boolean }> {
    try {
      // API 호출
      const response = await fetch(`${this.API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData)
      })

      const data = await response.json()

      // 응답 처리
      if (!response.ok) {
        throw new Error(data.error || '회원가입 중 오류가 발생했습니다.')
      }

      // 성공 시 상태 업데이트는 onAuthStateChange에서 자동 처리
      return {
        success: data.success,
        needsVerification: data.needsVerification
      }
    } catch (error) {
      console.error('💥 Signup error:', error)
      if (error instanceof Error) throw error
      throw new Error('회원가입 중 오류가 발생했습니다.')
    }
  }
}
