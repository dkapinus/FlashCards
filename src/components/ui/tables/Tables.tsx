import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui/typography'
import cn from 'classnames'

import s from './Tables.module.scss'

const Root = forwardRef<ElementRef<'table'>, ComponentPropsWithoutRef<'table'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <table className={cn(s.root, className)} ref={ref} {...restProps}>
        {children}
      </table>
    )
  }
)

const Head = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <thead className={cn(s.thead, className)} ref={ref} {...restProps}>
        {children}
      </thead>
    )
  }
)

const Body = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <tbody className={cn(s.body, className)} ref={ref} {...restProps}>
        {children}
      </tbody>
    )
  }
)

const Row = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <tr className={cn(s.row, className)} ref={ref} {...restProps}>
        {children}
      </tr>
    )
  }
)

const TitleCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <th className={cn(s.title, className)} ref={ref} {...restProps}>
        <Typography as={'span'} variant={'subtitle2'}>
          {children}
        </Typography>
      </th>
    )
  }
)

const Cell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <td className={cn(s.cell, className)} ref={ref} {...restProps}>
        <Typography as={'span'} variant={'body2'}>
          {children}
        </Typography>
      </td>
    )
  }
)

export const Tables = { Body, Cell, Head, Root, Row, TitleCell }
