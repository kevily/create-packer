import { globalStyle } from '@vanilla-extract/css'
import { createGlobalStyle } from '@/shared/styles'
import { classNameSpace } from './constants'

globalStyle(classNameSpace, createGlobalStyle())
