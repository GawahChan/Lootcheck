import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import App from './App';

describe('App', () => {
    const appTree = renderer.create(<App />).toJSON();
    const app = shallow(<App />);

    it('renders correctly', () => {
        expect(appTree).toMatchSnapshot();
    });
});
