import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import QueryBuilder from '../QueryBuilder'
import React from 'react'

// Mock Group component


describe('QueryBuilder Component', () => {
  beforeEach(() => {
    // Reset clipboard mock
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    })
  })

  test('renders the Group component and submit button', () => {
    render(<QueryBuilder />)


  })

  test('shows output on Submit', () => {
    render(<QueryBuilder />)

    fireEvent.click(screen.getByText('✅ Submit Query'))

    expect(screen.getByLabelText(/query output/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue(
      JSON.stringify(
        {
          type: 'group',
          logic: 'AND',
          children: [],
        },
        null,
        2
      )
    )
  })

  test('can edit the textarea manually', () => {
    render(<QueryBuilder />)

    fireEvent.click(screen.getByText('✅ Submit Query'))

    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'edited content' } })

    expect(textarea).toHaveValue('edited content')
  })

  test('copies to clipboard and shows confirmation', async () => {
    render(<QueryBuilder />)

    fireEvent.click(screen.getByText('✅ Submit Query'))
    fireEvent.click(screen.getByText('📋 Copy'))

    expect(navigator.clipboard.writeText).toHaveBeenCalled()

    expect(await screen.findByText('Copied to clipboard ✅')).toBeInTheDocument()

    // Wait 2 seconds for auto-hide
    await waitFor(
      () =>
        expect(
          screen.queryByText('Copied to clipboard ✅')
        ).not.toBeInTheDocument(),
      { timeout: 2500 }
    )
  })
})
