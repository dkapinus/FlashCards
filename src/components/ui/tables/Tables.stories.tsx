import type { Meta, StoryObj } from '@storybook/react'

import { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Tables } from '@/components/ui/tables/Tables'

const meta = {
  argTypes: {},
  component: Tables.Root,
  title: 'components/Tables',
} satisfies Meta<typeof Tables.Root>

export default meta

type Story = StoryObj<typeof meta>

export const TitleCell: Story = {
  args: {
    children: 'I am a title cell',
  },
  render: (args: { children?: ReactNode }) => <Tables.TitleCell>{args.children}</Tables.TitleCell>,
}

export const Cell: Story = {
  args: {
    children: 'I am a cell',
  },
  render: (args: { children?: ReactNode }) => <Tables.Cell>{args.children}</Tables.Cell>,
}

export const RowTitleCells: Story = {
  args: {
    children: 'I am a title cell',
  },
  render: (args: { children?: ReactNode }) => (
    <Tables.Row>
      <Tables.TitleCell>{args.children}</Tables.TitleCell>
      <Tables.TitleCell>{args.children}</Tables.TitleCell>
      <Tables.TitleCell>{args.children}</Tables.TitleCell>
      <Tables.TitleCell>{args.children}</Tables.TitleCell>
    </Tables.Row>
  ),
}

export const RowCells: Story = {
  args: {
    children: 'I am a cell',
  },
  render: (args: { children?: ReactNode }) => (
    <Tables.Row>
      <Tables.Cell>{args.children}</Tables.Cell>
      <Tables.Cell>{args.children}</Tables.Cell>
      <Tables.Cell>{args.children}</Tables.Cell>
      <Tables.Cell>{args.children}</Tables.Cell>
    </Tables.Row>
  ),
}

export const TableDemo: Story = {
  args: {},
  render: () => (
    <Tables.Root>
      <Tables.Head>
        <Tables.Row>
          <Tables.TitleCell>Title cell name1</Tables.TitleCell>
          <Tables.TitleCell>Title cell name2</Tables.TitleCell>
          <Tables.TitleCell>Title cell name3</Tables.TitleCell>
          <Tables.TitleCell>Title cell name4</Tables.TitleCell>
        </Tables.Row>
      </Tables.Head>
      <Tables.Body>
        <Tables.Row>
          <Tables.Cell>Cell name1 (row1)</Tables.Cell>
          <Tables.Cell>Cell name2 (row1)</Tables.Cell>
          <Tables.Cell>Cell name3 (row1)</Tables.Cell>
          <Tables.Cell>Cell name4 (row1)</Tables.Cell>
        </Tables.Row>
        <Tables.Row>
          <Tables.Cell>Cell name1 (row2)</Tables.Cell>
          <Tables.Cell>Cell name2 (row2)</Tables.Cell>
          <Tables.Cell>Cell name3 (row2)</Tables.Cell>
          <Tables.Cell>Cell name4 (row2)</Tables.Cell>
        </Tables.Row>
        <Tables.Row>
          <Tables.Cell>
            <Button variant={'secondary'}>Button</Button>
          </Tables.Cell>
          <Tables.Cell>
            <Checkbox checked label={'Checkbox'} onCheckedChange={() => {}} />
          </Tables.Cell>{' '}
          <Tables.Cell>
            <Input disabled label={'Disabled'} />
          </Tables.Cell>
        </Tables.Row>
      </Tables.Body>
    </Tables.Root>
  ),
}
