import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'], // 꼭 넣어야 Tailwind가 사용 클래스 인식함
  theme: {
    extend: {}
  },
  plugins: []
}
export default config