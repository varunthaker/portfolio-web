import { createContext } from 'react'
import type { Lang } from '../content/types'

export const LangContext = createContext<Lang>('en')

export const LANG_STORAGE_KEY = 'lang'
