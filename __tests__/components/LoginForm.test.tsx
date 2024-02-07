import React from 'react'
import {fireEvent, render as rtlRender, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios'; // Import axios for mocking purposes
import { useRouter } from 'next/navigation'; // Import useRouter for mocking purposes
import LoginForm from '@/app/components/Auth/LoginForm'
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

// Mocking useRouter
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));

// Mocking axios
jest.mock('axios');


const render = (comp) => rtlRender(
    <Provider store={store}>
        <LoginForm/>
    </Provider>
)

describe('Login Form',()=>{
    it('Should render properly',()=>{
        render(<LoginForm/>)

        // Use getByText to find the element by its text content
        const headingByText = screen.getByText('Sign In');
        expect(headingByText).toBeInTheDocument();
        expect(headingByText).toHaveClass('text-[#161616] text-[18px] font-semibold my-4');


        // Check if label exists and has the correct color style
        const label = screen.getByTestId('email-label');
        expect(label).toBeInTheDocument();
        expect(label).toHaveAttribute('for', 'email');
        expect(label).toHaveStyle('color: black');

        // Check if input field exists and has the correct attributes and value
        const emailInput = screen.getByPlaceholderText('Email');
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveAttribute('type', 'email');
        expect(emailInput).toHaveAttribute('id', 'email');
        expect(emailInput).toHaveValue('');

        // Simulate user typing in the emailInput field and check if the value changes
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput).toHaveValue('test@example.com');
    })

})