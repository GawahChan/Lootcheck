import React from 'react';
import { shallow } from 'enzyme';

import { Wallet } from '../../components/Wallet';

describe('Wallet', () => {
    const mockDeposit = jest.fn();
    const mockWithdraw = jest.fn();
    const props = { balance: 20 , deposit: mockDeposit, withdraw: mockWithdraw };
    const wallet = shallow(<Wallet {...props} />);

    it('renders correctly', () => {
        expect(wallet).toMatchSnapshot();
    });

    it('displays the balance from props', () => {
        expect(wallet.find('.balance').text()).toEqual('Wallet balance: 20');
    });

    it('creates input to deposit or withdraw from balance', () => {
        expect(wallet.find('.input-wallet').exists()).toBe(true);
    });

    describe('when user types into wallet input', () => {
        const userBalance = '25';

        beforeEach(() => {
            wallet.find('.input-wallet').simulate('change', { target: { value: userBalance }})
        });

        it('updates the local wallet balance in `state` and converts it to a number', () => {
            expect(wallet.state().balance).toEqual(parseInt(userBalance, 10));
        });

        describe('and user wants to deposit', () => {
            beforeEach(() => {
                wallet.find('.btn-deposit').simulate('click')
            });

            it('dispatches the `deposit()` received from props with local balance', () => {
                expect(mockDeposit).toHaveBeenCalledWith(parseInt(userBalance, 10));
            });
        });

        describe('and user wants to withdraw', () => {
            beforeEach(() => {
                wallet.find('.btn-withdraw').simulate('click')
            });

            it('dispatches the withdraw() received from props with local balance', () => {
                expect(mockWithdraw).toHaveBeenCalledWith(parseInt(userBalance, 10));
            });
        });
    });
});