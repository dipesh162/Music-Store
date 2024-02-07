import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginFormDummy from '@/app/components/Auth/LoginFormDummy'
// import { describe, it } from 'node:test'

describe('Login Form',()=>{
    it('Should render properly',()=>{
        render(<LoginFormDummy/>);

        const header = screen.getByRole('heading');
        const headerText = 'Sign In'

        expect(header).toHaveTextContent(headerText);
    })

    it('should have a disbaled button right after first h1', ()=>{
        render(<LoginFormDummy/>)

        const disabledBtn = screen.getByRole('button')
        expect(disabledBtn).toBeDisabled()
    })
})