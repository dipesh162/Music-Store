import React from 'react'
import {fireEvent, render as rtlRender, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios'; // Import axios for mocking purposes
import { useRouter } from 'next/navigation'; // Import useRouter for mocking purposes
import LoginForm from '@/app/components/Auth/LoginForm'
import { Provider,useDispatch } from 'react-redux';
import { store } from '@/redux/store';
import { toast } from 'react-toastify';

// Mocking useRouter
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));

// Mocking axios
jest.mock('axios');
// jest.mock('react-redux', () => ({
//     useDispatch: jest.fn(),
//   }));
jest.mock('react-toastify', () => ({
toast: {
    success: jest.fn(),
    error: jest.fn(),
    POSITION: {
    BOTTOM_RIGHT: 'bottom-right',
    },
},
}));


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
        const emailLabel = screen.getByTestId('email-label');
        expect(emailLabel).toBeInTheDocument();
        expect(emailLabel).toHaveAttribute('for', 'email');
        expect(emailLabel).toHaveStyle('color: black');

        // Check if input field exists and has the correct attributes and value
        const emailInput = screen.getByPlaceholderText('Email');
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveAttribute('type', 'email');
        expect(emailInput).toHaveAttribute('id', 'email');
        expect(emailInput).toHaveValue('');

        // Simulate user typing in the emailInput field and check if the value changes
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput).toHaveValue('test@example.com');


        // Check if label exists and has the correct color style
        const passwordLabel = screen.getByTestId('password-label');
        expect(passwordLabel).toBeInTheDocument();
        expect(passwordLabel).toHaveAttribute('for', 'password');
        expect(passwordLabel).toHaveStyle('color: black');

        // Check if input field exists and has the correct attributes and value
        const passwordInput = screen.getByPlaceholderText('Password');
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(passwordInput).toHaveAttribute('id', 'password');
        expect(passwordInput).toHaveValue('');

        // Simulate user typing in the passwordInput field and check if the value changes
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(passwordInput).toHaveValue('password123');


        // Login Button
        const submitBtn = screen.getByRole('button')
        expect(submitBtn).toHaveTextContent('Login')
        expect(submitBtn).toHaveClass('cursor-pointer border-[1px] border-[#616364] bg-[#616364] text-[#fff] px-5 py-2 block text-[16px] text-center font-semibold focus:outline-none')


        // Check if the span element with the specific text content is present
        const spanElement = screen.getByText("Don’t have an account?");

        // Check if the nested Link component is present
        const linkElement = screen.getByRole('link', { name: 'Get Started!' });

        // Check if the nested span element within the Link component is present
        const nestedSpanElement = screen.getByText('Get Started!', { selector: 'span' });

        expect(spanElement).toBeInTheDocument();
        expect(linkElement).toBeInTheDocument();
        expect(nestedSpanElement).toBeInTheDocument();
    })

})