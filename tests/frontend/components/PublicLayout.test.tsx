import React from 'react'
import { ShallowWrapper } from 'enzyme'
import { createShallow } from '@material-ui/core/test-utils'
import PublicLayout from '../../../components/PublicLayout'

let shallow: ReturnType<typeof createShallow>
let wrapper: ShallowWrapper

beforeEach(() => {
    shallow = createShallow()
    wrapper = shallow(
        <PublicLayout>
            <p>Hello world</p>
        </PublicLayout>
    )
})

describe('<PublicLayout /> rendering', () => {
    it('should render without problems', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
