import React from 'react'
import { ReactWrapper } from 'enzyme'
import { createMount } from '@material-ui/core/test-utils'
import PublicDrawer from '../../../components/PublicDrawer'

let mount: ReturnType<typeof createMount>
let setOpen: ReturnType<typeof jest.fn>
let wrapper: ReactWrapper

beforeEach(() => {
    mount = createMount()

    setOpen = jest.fn()
    wrapper = mount(<PublicDrawer setOpen={setOpen} open={true} />)
})

afterEach(() => {
    wrapper.unmount()
})

describe('<PublicDrawer /> rendering', () => {
    it('should render without problems', () => {
        expect(wrapper).toMatchSnapshot()
    })
})

describe('<PublicDrawer /> interactions', () => {
    it('should change href to trending on click', () => {
        delete window.location
        ;(window.location as Partial<Location>) = {}

        wrapper.find('#trending').at(0).simulate('click')

        expect(window.location.href).toEqual('/trending')
    })

    it('should call the provided function to close the drawer', () => {
        wrapper.find('#close-drawer').at(0).simulate('click')

        expect(setOpen).toHaveBeenCalledTimes(1)
    })
})
