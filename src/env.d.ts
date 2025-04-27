/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_PUBLIC_KEY: string
  readonly VITE_EMAILJS_SERVICE_ID: string
  readonly VITE_EMAILJS_TEMPLATE_ID: string
  readonly VITE_CONTACT_EMAIL: string
  readonly VITE_TELEGRAM_USERNAME: string
  readonly VITE_LEETCODE_USERNAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 