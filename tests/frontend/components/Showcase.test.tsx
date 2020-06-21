import React from 'react'
import { ShallowWrapper } from 'enzyme'
import { createShallow } from '@material-ui/core/test-utils'
import Showcase from '../../../components/Showcase'

let shallow: ReturnType<typeof createShallow>
let wrapper: ShallowWrapper

const mockedProd = {
    title: 'Ultra chill jumpers',
    description: 'If you wanna look chill, you need ultra chill jumpers',
    img: '/photo-of-woman-standing-on-staircase-3120339.jpg',
}

beforeEach(() => {
    shallow = createShallow()
    wrapper = shallow(<Showcase {...mockedProd} />)
})

describe('<Showcase /> rendering', () => {
    it('should render without problems', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
