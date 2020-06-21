import React from 'react'
import { ReactWrapper } from 'enzyme'
import { createMount } from '@material-ui/core/test-utils'
import PublicAppBar from '../../../components/PublicAppBar'

let wrapper: ReactWrapper
let mount: ReturnType<typeof createMount>
let setOpen: ReturnType<typeof jest.fn>

beforeEach(() => {
    mount = createMount()
    setOpen = jest.fn()
    wrapper = mount(<PublicAppBar setOpen={setOpen} open={false} />)
})

afterEach(() => {
    wrapper.unmount()
})

describe('<PublicAppBar /> rendering', () => {
    it('should render without problems', () => {
        expect(wrapper).toMatchSnapshot()
    })
})

describe('<PublicAppBar /> interactions', () => {
    it('should call window.open to show the github page when clicking the icon', () => {
        const openFn = jest.fn()
        window.open = openFn

        wrapper.find('#git-icon').at(0).simulate('click')

        expect(openFn).toHaveBeenCalledTimes(1)
        expect(openFn).toHaveBeenCalledWith(
            'https://github.com/nooexcept/Clothy',
            '_blank'
        )
    })

    it('should call the provided function to open the drawer', () => {
        wrapper.find('#open-drawer').at(0).simulate('click')

        expect(setOpen).toHaveBeenCalledTimes(1)
    })
})
